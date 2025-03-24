<template>
  <div class="mlp-demo">
    <div class="card">
      <h2>多层神经网络</h2>
      <p>多层神经网络（MLP）可以学习更复杂的非线性关系，使用隐藏层增强网络的表示能力。此演示展示了MLP如何分类非线性可分的数据。</p>
      
      <div class="model-controls">
        <div class="model-structure">
          <h3>网络结构</h3>
          <div class="layer-config">
            <div>
              <span>输入维度：2</span>
            </div>
            <div>
              <span>隐藏层：</span>
              <el-button size="small" icon="el-icon-minus" @click="removeLayer" :disabled="hiddenLayers.length <= 1"></el-button>
              <el-button size="small" icon="el-icon-plus" @click="addLayer" :disabled="hiddenLayers.length >= 3"></el-button>
            </div>
            <div v-for="(layer, index) in hiddenLayers" :key="index" class="layer-row">
              <span>层 {{ index + 1 }}:</span>
              <el-select v-model="layer.units" size="small">
                <el-option :value="4" label="4 神经元"></el-option>
                <el-option :value="8" label="8 神经元"></el-option>
                <el-option :value="16" label="16 神经元"></el-option>
                <el-option :value="32" label="32 神经元"></el-option>
              </el-select>
              <el-select v-model="layer.activation" size="small">
                <el-option value="relu" label="ReLU"></el-option>
                <el-option value="sigmoid" label="Sigmoid"></el-option>
                <el-option value="tanh" label="Tanh"></el-option>
              </el-select>
            </div>
            <div>
              <span>输出层：1 神经元 (Sigmoid激活)</span>
            </div>
          </div>
        </div>
        
        <div class="training-params">
          <h3>训练参数</h3>
          <div class="param-row">
            <label>学习率:</label>
            <el-slider v-model="learningRate" :min="0.001" :max="0.5" :step="0.001" show-input></el-slider>
          </div>
          <div class="param-row">
            <label>训练轮数:</label>
            <el-slider v-model="epochs" :min="10" :max="200" :step="10" show-input></el-slider>
          </div>
          <div class="param-row">
            <label>批量大小:</label>
            <el-slider v-model="batchSize" :min="8" :max="64" :step="8" show-input></el-slider>
          </div>
          <div class="param-row">
            <label>优化器:</label>
            <el-select v-model="optimizer" style="width: 100%">
              <el-option value="sgd" label="随机梯度下降 (SGD)"></el-option>
              <el-option value="adam" label="Adam"></el-option>
              <el-option value="rmsprop" label="RMSprop"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      
      <div class="actions">
        <el-button type="primary" @click="generateData">生成螺旋数据</el-button>
        <el-button type="success" @click="trainModel" :disabled="training">
          <span v-if="!training">训练模型</span>
          <span v-else>训练中... {{ currentEpoch }}/{{ epochs }}</span>
        </el-button>
        <el-button @click="reset">重置</el-button>
      </div>
      
      <el-progress 
        v-if="training" 
        :percentage="(currentEpoch / epochs) * 100" 
        :format="progressFormat"
        status="success">
      </el-progress>
    </div>

    <div class="card">
      <div class="viz-container">
        <div class="viz-section">
          <h3>训练数据</h3>
          <canvas ref="dataCanvas" width="400" height="400"></canvas>
        </div>
        <div class="viz-section">
          <h3>决策边界</h3>
          <canvas ref="decisionCanvas" width="400" height="400"></canvas>
        </div>
      </div>
      
      <div class="training-metrics" v-if="trained">
        <h3>训练结果</h3>
        <p>损失: {{ trainLoss.toFixed(4) }}</p>
        <p>准确率: {{ (trainAccuracy * 100).toFixed(2) }}%</p>
        
        <div class="loss-chart-container">
          <canvas ref="lossChart" width="600" height="300"></canvas>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>神经网络可视化</h3>
      <div class="network-viz" ref="networkViz">
        <!-- 神经网络可视化将在这里绘制 -->
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive } from 'vue'
import * as tf from '@tensorflow/tfjs'
import Chart from 'chart.js/auto'

export default defineComponent({
  name: 'MlpDemo',
  setup() {
    // 画布引用
    const dataCanvas = ref(null)
    const decisionCanvas = ref(null)
    const lossChart = ref(null)
    const networkViz = ref(null)
    
    // 模型配置
    const hiddenLayers = ref([
      { units: 8, activation: 'relu' }
    ])
    const learningRate = ref(0.01)
    const epochs = ref(50)
    const batchSize = ref(32)
    const optimizer = ref('adam')
    
    // 训练状态
    const training = ref(false)
    const trained = ref(false)
    const currentEpoch = ref(0)
    const trainLoss = ref(0)
    const trainAccuracy = ref(0)
    
    // 图表实例
    let lossChartInstance = null
    
    // 训练历史
    const history = {
      loss: [],
      accuracy: []
    }
    
    // 数据和模型
    let xData = []
    let yData = []
    let model = null
    
    // 画布上下文
    let dataCtx = null
    let decisionCtx = null
    
    // 坐标转换函数
    const scaleX = (x) => (x + 1) * 200
    const scaleY = (y) => 400 - (y + 1) * 200
    
    // 用于格式化进度条显示
    const progressFormat = (percentage) => {
      return `${currentEpoch.value}/${epochs.value}`
    }
    
    // 添加隐藏层
    const addLayer = () => {
      if (hiddenLayers.value.length < 3) {
        hiddenLayers.value.push({ units: 8, activation: 'relu' })
      }
    }
    
    // 删除隐藏层
    const removeLayer = () => {
      if (hiddenLayers.value.length > 1) {
        hiddenLayers.value.pop()
      }
    }
    
    // 生成螺旋数据
    const generateData = () => {
      trained.value = false
      xData = []
      yData = []
      
      const n = 500 // 每类点的数量
      const turns = 2 // 螺旋的转数
      
      // 生成螺旋数据
      for (let i = 0; i < n; i++) {
        const r = i / n * 0.9 // 半径从0到0.9
        const t = 1.75 * turns * 2 * Math.PI * (i / n) // 角度
        
        // 类别0的点
        const x1 = r * Math.sin(t)
        const y1 = r * Math.cos(t)
        xData.push([x1, y1])
        yData.push([0])
        
        // 类别1的点
        const x2 = r * Math.sin(t + Math.PI)
        const y2 = r * Math.cos(t + Math.PI)
        xData.push([x2, y2])
        yData.push([1])
      }
      
      // 绘制数据点
      drawData()
    }
    
    // 绘制数据点
    const drawData = () => {
      if (!dataCtx) return
      
      // 清空画布
      dataCtx.clearRect(0, 0, 400, 400)
      
      // 绘制坐标轴
      dataCtx.strokeStyle = '#ddd'
      dataCtx.beginPath()
      dataCtx.moveTo(0, 200)
      dataCtx.lineTo(400, 200)
      dataCtx.moveTo(200, 0)
      dataCtx.lineTo(200, 400)
      dataCtx.stroke()
      
      // 绘制数据点
      for (let i = 0; i < xData.length; i++) {
        const x = scaleX(xData[i][0])
        const y = scaleY(xData[i][1])
        const label = yData[i][0]
        
        dataCtx.fillStyle = label ? 'rgba(52, 152, 219, 0.7)' : 'rgba(231, 76, 60, 0.7)'
        dataCtx.beginPath()
        dataCtx.arc(x, y, 4, 0, Math.PI * 2)
        dataCtx.fill()
      }
    }
    
    // 绘制决策边界
    const drawDecisionBoundary = async () => {
      if (!decisionCtx || !model) return
      
      // 清空画布
      decisionCtx.clearRect(0, 0, 400, 400)
      
      // 绘制网格
      const resolution = 100
      const gridStep = 400 / resolution
      
      // 为每个网格点预测类别
      const gridData = []
      for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
          const x = (i * gridStep) / 200 - 1
          const y = 1 - (j * gridStep) / 200
          gridData.push([x, y])
        }
      }
      
      // 批量预测
      const predictions = await model.predict(tf.tensor2d(gridData)).dataSync()
      
      // 绘制决策边界
      const imgData = decisionCtx.createImageData(resolution, resolution)
      
      for (let i = 0; i < predictions.length; i++) {
        const prediction = predictions[i]
        const idx = i * 4
        
        if (prediction < 0.5) {
          // 类别0 - 红色色调
          imgData.data[idx] = 231
          imgData.data[idx + 1] = 76
          imgData.data[idx + 2] = 60
          imgData.data[idx + 3] = prediction * 100 + 50 // 透明度基于预测的置信度
        } else {
          // 类别1 - 蓝色色调
          imgData.data[idx] = 52
          imgData.data[idx + 1] = 152
          imgData.data[idx + 2] = 219
          imgData.data[idx + 3] = (1 - prediction) * 100 + 50
        }
      }
      
      // 创建临时画布来缩放决策边界
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = resolution
      tempCanvas.height = resolution
      const tempCtx = tempCanvas.getContext('2d')
      tempCtx.putImageData(imgData, 0, 0)
      
      // 将临时画布内容绘制到决策边界画布
      decisionCtx.drawImage(tempCanvas, 0, 0, resolution, resolution, 0, 0, 400, 400)
      
      // 叠加绘制原始数据点，以便更清楚地看到分类结果
      for (let i = 0; i < xData.length; i++) {
        const x = scaleX(xData[i][0])
        const y = scaleY(xData[i][1])
        const label = yData[i][0]
        
        decisionCtx.fillStyle = label ? 'rgba(52, 152, 219, 1)' : 'rgba(231, 76, 60, 1)'
        decisionCtx.strokeStyle = '#fff'
        decisionCtx.lineWidth = 1
        decisionCtx.beginPath()
        decisionCtx.arc(x, y, 3, 0, Math.PI * 2)
        decisionCtx.fill()
        decisionCtx.stroke()
      }
    }
    
    // 创建并训练模型
    const trainModel = async () => {
      if (xData.length === 0) {
        alert('请先生成数据')
        return
      }
      
      training.value = true
      currentEpoch.value = 0
      history.loss = []
      history.accuracy = []
      
      // 创建模型
      model = tf.sequential()
      
      // 添加输入层和隐藏层
      model.add(tf.layers.dense({
        inputShape: [2],
        units: hiddenLayers.value[0].units,
        activation: hiddenLayers.value[0].activation
      }))
      
      // 添加额外的隐藏层
      for (let i = 1; i < hiddenLayers.value.length; i++) {
        model.add(tf.layers.dense({
          units: hiddenLayers.value[i].units,
          activation: hiddenLayers.value[i].activation
        }))
      }
      
      // 添加输出层
      model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
      }))
      
      // 选择优化器
      let opt
      switch (optimizer.value) {
        case 'adam':
          opt = tf.train.adam(learningRate.value)
          break
        case 'rmsprop':
          opt = tf.train.rmsprop(learningRate.value)
          break
        default:
          opt = tf.train.sgd(learningRate.value)
      }
      
      // 编译模型
      model.compile({
        optimizer: opt,
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
      })
      
      // 转换数据为张量
      const xs = tf.tensor2d(xData)
      const ys = tf.tensor2d(yData)
      
      try {
        // 训练模型
        await model.fit(xs, ys, {
          epochs: epochs.value,
          batchSize: batchSize.value,
          callbacks: {
            onEpochEnd: (epoch, logs) => {
              currentEpoch.value = epoch + 1
              history.loss.push(logs.loss)
              history.accuracy.push(logs.acc)
              
              if (currentEpoch.value === epochs.value) {
                trainLoss.value = logs.loss
                trainAccuracy.value = logs.acc
              }
              
              // 每10个epoch更新决策边界
              if (epoch % 10 === 0 || epoch === epochs.value - 1) {
                drawDecisionBoundary()
              }
            }
          }
        })
        
        // 训练完成
        trained.value = true
        drawDecisionBoundary()
        updateLossChart()
        visualizeNetwork()
      } catch (error) {
        console.error('训练失败:', error)
        alert('训练过程中发生错误，请查看控制台获取详情')
      } finally {
        training.value = false
        xs.dispose()
        ys.dispose()
      }
    }
    
    // 更新损失图表
    const updateLossChart = () => {
      if (lossChartInstance) {
        lossChartInstance.destroy()
      }
      
      if (!lossChart.value) return
      
      const ctx = lossChart.value.getContext('2d')
      lossChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: history.loss.length }, (_, i) => i + 1),
          datasets: [
            {
              label: '损失',
              data: history.loss,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              tension: 0.1
            },
            {
              label: '准确率',
              data: history.accuracy,
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.1,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: '损失'
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              min: 0,
              max: 1,
              title: {
                display: true,
                text: '准确率'
              },
              grid: {
                drawOnChartArea: false
              }
            }
          }
        }
      })
    }
    
    // 可视化神经网络
    const visualizeNetwork = () => {
      if (!networkViz.value || !model) return
      
      const container = networkViz.value
      container.innerHTML = ''
      
      // 创建网络结构图
      const networkContainer = document.createElement('div')
      networkContainer.className = 'network-container'
      container.appendChild(networkContainer)
      
      // 添加输入层
      const inputLayer = document.createElement('div')
      inputLayer.className = 'layer input-layer'
      
      for (let i = 0; i < 2; i++) {
        const node = document.createElement('div')
        node.className = 'node'
        node.textContent = `x${i+1}`
        inputLayer.appendChild(node)
      }
      
      networkContainer.appendChild(inputLayer)
      
      // 添加隐藏层
      for (let i = 0; i < hiddenLayers.value.length; i++) {
        const layer = document.createElement('div')
        layer.className = 'layer hidden-layer'
        
        for (let j = 0; j < hiddenLayers.value[i].units; j++) {
          const node = document.createElement('div')
          node.className = 'node'
          node.textContent = ''
          layer.appendChild(node)
        }
        
        networkContainer.appendChild(layer)
        
        // 添加层间连接
        const connections = document.createElement('div')
        connections.className = 'connections'
        networkContainer.appendChild(connections)
      }
      
      // 添加输出层
      const outputLayer = document.createElement('div')
      outputLayer.className = 'layer output-layer'
      
      const outputNode = document.createElement('div')
      outputNode.className = 'node'
      outputNode.textContent = 'y'
      outputLayer.appendChild(outputNode)
      
      networkContainer.appendChild(outputLayer)
      
      // 添加层说明
      const layerInfo = document.createElement('div')
      layerInfo.className = 'layer-info'
      
      // 输入层信息
      const inputInfo = document.createElement('div')
      inputInfo.textContent = '输入层: 2 个特征'
      layerInfo.appendChild(inputInfo)
      
      // 隐藏层信息
      for (let i = 0; i < hiddenLayers.value.length; i++) {
        const hiddenInfo = document.createElement('div')
        hiddenInfo.textContent = `隐藏层 ${i+1}: ${hiddenLayers.value[i].units} 神经元, ${getActivationName(hiddenLayers.value[i].activation)}`
        layerInfo.appendChild(hiddenInfo)
      }
      
      // 输出层信息
      const outputInfo = document.createElement('div')
      outputInfo.textContent = '输出层: 1 神经元, Sigmoid'
      layerInfo.appendChild(outputInfo)
      
      container.appendChild(layerInfo)
    }
    
    // 获取激活函数的中文名称
    const getActivationName = (activation) => {
      switch (activation) {
        case 'relu': return 'ReLU'
        case 'sigmoid': return 'Sigmoid'
        case 'tanh': return 'Tanh'
        default: return activation
      }
    }
    
    // 重置
    const reset = () => {
      trained.value = false
      training.value = false
      currentEpoch.value = 0
      trainLoss.value = 0
      trainAccuracy.value = 0
      history.loss = []
      history.accuracy = []
      xData = []
      yData = []
      
      if (model) {
        model.dispose()
        model = null
      }
      
      if (lossChartInstance) {
        lossChartInstance.destroy()
        lossChartInstance = null
      }
      
      if (dataCtx) {
        dataCtx.clearRect(0, 0, 400, 400)
      }
      
      if (decisionCtx) {
        decisionCtx.clearRect(0, 0, 400, 400)
      }
      
      if (networkViz.value) {
        networkViz.value.innerHTML = '<div class="network-placeholder">请先训练模型来查看网络结构</div>'
      }
    }
    
    onMounted(() => {
      if (dataCanvas.value) {
        dataCtx = dataCanvas.value.getContext('2d')
      }
      
      if (decisionCanvas.value) {
        decisionCtx = decisionCanvas.value.getContext('2d')
      }
      
      if (networkViz.value) {
        networkViz.value.innerHTML = '<div class="network-placeholder">请先训练模型来查看网络结构</div>'
      }
    })
    
    return {
      dataCanvas,
      decisionCanvas,
      lossChart,
      networkViz,
      hiddenLayers,
      learningRate,
      epochs,
      batchSize,
      optimizer,
      training,
      trained,
      currentEpoch,
      trainLoss,
      trainAccuracy,
      progressFormat,
      addLayer,
      removeLayer,
      generateData,
      trainModel,
      reset
    }
  }
})
</script>

<style scoped>
.mlp-demo {
  padding: 20px 0;
}

h2, h3 {
  margin-bottom: 16px;
  color: var(--primary-color);
}

.model-controls {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.model-structure, .training-params {
  flex: 1;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
}

.layer-config {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.layer-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.layer-row span {
  width: 80px;
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

.viz-container {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.viz-section {
  flex: 1;
}

canvas {
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
}

.training-metrics {
  margin-top: 20px;
  background: #f0f9ff;
  border-left: 4px solid var(--primary-color);
  padding: 16px;
}

.loss-chart-container {
  margin-top: 20px;
  height: 300px;
}

.network-viz {
  margin: 20px 0;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.network-placeholder {
  color: #999;
  font-style: italic;
  padding: 50px 0;
}

.network-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 40px;
  overflow-x: auto;
  max-width: 100%;
}

.layer {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.layer.hidden-layer {
  max-height: 400px;
  overflow-y: auto;
  padding: 10px 0;
}

.node {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.input-layer .node {
  background-color: #67C23A;
}

.output-layer .node {
  background-color: #E6A23C;
}

.connections {
  width: 40px;
  border-top: 2px dashed #ddd;
}

.layer-info {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  font-size: 14px;
  color: #666;
}
</style> 