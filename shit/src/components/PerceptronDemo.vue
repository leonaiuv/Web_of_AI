<template>
  <div class="perceptron-demo">
    <div class="card">
      <h2>感知器模型</h2>
      <p>感知器是最简单的神经网络单元，可以用于二分类问题。这个演示展示了一个单个神经元如何学习分类线性可分的数据。</p>
      
      <div class="model-diagram">
        <img src="../assets/perceptron.png" alt="感知器模型图" class="diagram-img" />
      </div>
      
      <div class="control-panel">
        <h3>训练参数</h3>
        <div class="param-row">
          <label>学习率:</label>
          <el-slider v-model="learningRate" :min="0.01" :max="1" :step="0.01" show-input></el-slider>
        </div>
        <div class="param-row">
          <label>训练轮数:</label>
          <el-slider v-model="epochs" :min="1" :max="100" :step="1" show-input></el-slider>
        </div>
        <div class="actions">
          <el-button type="primary" @click="generateData">生成数据</el-button>
          <el-button type="success" @click="trainModel">训练模型</el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>可视化</h2>
      <div class="visualization">
        <canvas ref="plotCanvas" width="500" height="400"></canvas>
      </div>
      <div class="results" v-if="trained">
        <h3>训练结果</h3>
        <p>权重: w1 = {{ weights[0].toFixed(4) }}, w2 = {{ weights[1].toFixed(4) }}, b = {{ bias.toFixed(4) }}</p>
        <p>准确率: {{ (accuracy * 100).toFixed(2) }}%</p>
      </div>
    </div>

    <div class="card">
      <h2>实时预测</h2>
      <p>点击下方区域添加新的点，模型将实时分类:</p>
      <div class="prediction-area">
        <canvas ref="predCanvas" width="500" height="400" @click="addPoint"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import * as tf from '@tensorflow/tfjs'

export default defineComponent({
  name: 'PerceptronDemo',
  setup() {
    const plotCanvas = ref(null)
    const predCanvas = ref(null)
    const learningRate = ref(0.1)
    const epochs = ref(20)
    const trained = ref(false)
    const weights = ref([0, 0])
    const bias = ref(0)
    const accuracy = ref(0)
    
    // 数据集
    let xData = []
    let yData = []
    let model = null
    
    // 画布上下文
    let plotCtx = null
    let predCtx = null
    
    // 坐标转换函数
    const scaleX = (x) => x * 400 + 50
    const scaleY = (y) => 400 - y * 400 - 50
    const unscaleX = (x) => (x - 50) / 400
    const unscaleY = (y) => (400 - y - 50) / 400
    
    // 绘制散点图
    const drawData = () => {
      if (!plotCtx) return
      
      // 清空画布
      plotCtx.clearRect(0, 0, 500, 400)
      
      // 绘制坐标轴
      plotCtx.strokeStyle = '#ccc'
      plotCtx.beginPath()
      plotCtx.moveTo(50, 50)
      plotCtx.lineTo(50, 350)
      plotCtx.lineTo(450, 350)
      plotCtx.stroke()
      
      // 绘制坐标标签
      plotCtx.fillStyle = '#666'
      plotCtx.font = '12px Arial'
      plotCtx.fillText('0', 40, 360)
      plotCtx.fillText('1', 450, 360)
      plotCtx.fillText('0', 40, 350)
      plotCtx.fillText('1', 40, 50)
      
      // 绘制数据点
      for (let i = 0; i < xData.length; i++) {
        const x = xData[i][0]
        const y = xData[i][1]
        const label = yData[i][0]
        
        plotCtx.fillStyle = label ? 'blue' : 'red'
        plotCtx.beginPath()
        plotCtx.arc(scaleX(x), scaleY(y), 6, 0, Math.PI * 2)
        plotCtx.fill()
      }
      
      // 如果已训练，绘制决策边界
      if (trained.value) {
        plotCtx.strokeStyle = 'green'
        plotCtx.lineWidth = 2
        
        // 绘制决策边界线
        const w1 = weights.value[0]
        const w2 = weights.value[1]
        const b = bias.value
        
        // 求解 w1*x1 + w2*x2 + b = 0 中的 x2
        const x1 = 0
        const x2 = -b / w2 - (w1 * x1) / w2
        const x1b = 1
        const x2b = -b / w2 - (w1 * x1b) / w2
        
        plotCtx.beginPath()
        plotCtx.moveTo(scaleX(x1), scaleY(x2))
        plotCtx.lineTo(scaleX(x1b), scaleY(x2b))
        plotCtx.stroke()
      }
    }
    
    // 生成随机数据
    const generateData = () => {
      trained.value = false
      xData = []
      yData = []
      
      // 生成两类随机点，使其线性可分
      const numPoints = 100
      
      // 生成第一类点 (0)
      for (let i = 0; i < numPoints / 2; i++) {
        const x1 = Math.random() * 0.5
        const x2 = Math.random() * 0.5
        xData.push([x1, x2])
        yData.push([0])
      }
      
      // 生成第二类点 (1)
      for (let i = 0; i < numPoints / 2; i++) {
        const x1 = 0.5 + Math.random() * 0.5
        const x2 = 0.5 + Math.random() * 0.5
        xData.push([x1, x2])
        yData.push([1])
      }
      
      drawData()
      initPredictionCanvas()
    }
    
    // 创建和训练模型
    const trainModel = async () => {
      if (xData.length === 0) {
        alert('请先生成数据')
        return
      }
      
      // 创建感知器模型
      model = tf.sequential()
      model.add(tf.layers.dense({
        units: 1,
        inputShape: [2],
        activation: 'sigmoid'
      }))
      
      // 编译模型
      model.compile({
        optimizer: tf.train.sgd(learningRate.value),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
      })
      
      // 转换数据为张量
      const xs = tf.tensor2d(xData)
      const ys = tf.tensor2d(yData)
      
      // 训练模型
      await model.fit(xs, ys, {
        epochs: epochs.value,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.acc}`)
          }
        }
      })
      
      // 获取模型权重
      const layer = model.layers[0]
      const layerWeights = layer.getWeights()
      weights.value = layerWeights[0].dataSync()
      bias.value = layerWeights[1].dataSync()[0]
      
      // 计算训练准确率
      const predictions = model.predict(xs).dataSync()
      let correct = 0
      for (let i = 0; i < predictions.length; i++) {
        const predicted = predictions[i] > 0.5 ? 1 : 0
        if (predicted === yData[i][0]) {
          correct++
        }
      }
      accuracy.value = correct / yData.length
      
      trained.value = true
      drawData()
      
      // 释放张量
      xs.dispose()
      ys.dispose()
    }
    
    // 在预测画布上添加点
    const addPoint = (event) => {
      if (!trained.value || !predCtx || !model) return
      
      const rect = event.target.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      // 转换为数据坐标
      const dataX = unscaleX(x)
      const dataY = unscaleY(y)
      
      // 预测类别
      const prediction = model.predict(tf.tensor2d([[dataX, dataY]])).dataSync()[0]
      const predictedClass = prediction > 0.5 ? 1 : 0
      
      // 绘制点
      predCtx.fillStyle = predictedClass ? 'blue' : 'red'
      predCtx.beginPath()
      predCtx.arc(x, y, 6, 0, Math.PI * 2)
      predCtx.fill()
      
      // 显示预测概率
      predCtx.fillStyle = 'black'
      predCtx.font = '12px Arial'
      predCtx.fillText(`预测: ${predictedClass} (${(prediction * 100).toFixed(2)}%)`, x + 10, y)
    }
    
    // 初始化预测画布
    const initPredictionCanvas = () => {
      if (!predCtx) return
      
      predCtx.clearRect(0, 0, 500, 400)
      
      // 绘制坐标轴
      predCtx.strokeStyle = '#ccc'
      predCtx.beginPath()
      predCtx.moveTo(50, 50)
      predCtx.lineTo(50, 350)
      predCtx.lineTo(450, 350)
      predCtx.stroke()
      
      // 绘制坐标标签
      predCtx.fillStyle = '#666'
      predCtx.font = '12px Arial'
      predCtx.fillText('0', 40, 360)
      predCtx.fillText('1', 450, 360)
      predCtx.fillText('0', 40, 350)
      predCtx.fillText('1', 40, 50)
      
      // 如果已训练，绘制决策边界
      if (trained.value) {
        predCtx.strokeStyle = 'green'
        predCtx.lineWidth = 2
        
        // 绘制决策边界线
        const w1 = weights.value[0]
        const w2 = weights.value[1]
        const b = bias.value
        
        // 求解 w1*x1 + w2*x2 + b = 0 中的 x2
        const x1 = 0
        const x2 = -b / w2 - (w1 * x1) / w2
        const x1b = 1
        const x2b = -b / w2 - (w1 * x1b) / w2
        
        predCtx.beginPath()
        predCtx.moveTo(scaleX(x1), scaleY(x2))
        predCtx.lineTo(scaleX(x1b), scaleY(x2b))
        predCtx.stroke()
      }
    }
    
    // 重置
    const reset = () => {
      trained.value = false
      weights.value = [0, 0]
      bias.value = 0
      accuracy.value = 0
      xData = []
      yData = []
      model = null
      drawData()
      initPredictionCanvas()
    }
    
    onMounted(() => {
      if (plotCanvas.value) {
        plotCtx = plotCanvas.value.getContext('2d')
        drawData()
      }
      
      if (predCanvas.value) {
        predCtx = predCanvas.value.getContext('2d')
        initPredictionCanvas()
      }
    })
    
    return {
      plotCanvas,
      predCanvas,
      learningRate,
      epochs,
      trained,
      weights,
      bias,
      accuracy,
      generateData,
      trainModel,
      reset,
      addPoint
    }
  }
})
</script>

<style scoped>
.perceptron-demo {
  padding: 20px 0;
}

h2 {
  margin-bottom: 16px;
  color: var(--primary-color);
}

h3 {
  margin-bottom: 12px;
  color: #555;
}

.model-diagram {
  margin: 20px 0;
  text-align: center;
}

.diagram-img {
  max-width: 100%;
  height: auto;
  max-height: 200px;
}

.control-panel {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
}

.param-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.param-row label {
  width: 100px;
  flex-shrink: 0;
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.visualization, .prediction-area {
  margin: 20px 0;
  text-align: center;
}

.results {
  background: #f0f9ff;
  border-left: 4px solid var(--primary-color);
  padding: 16px;
  margin: 20px 0;
}

canvas {
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style> 