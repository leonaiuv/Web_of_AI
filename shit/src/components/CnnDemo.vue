<template>
  <div class="cnn-demo">
    <div class="card">
      <h2>卷积神经网络 (CNN)</h2>
      <p>卷积神经网络是一种专门用于处理图像等网格结构数据的深度学习模型。本演示使用MNIST数据集，展示CNN如何识别手写数字。</p>
      
      <div class="model-diagram">
        <img src="../assets/cnn.png" alt="CNN架构图" class="diagram-img" />
      </div>
      
      <div class="model-structure">
        <h3>网络结构</h3>
        <el-steps :active="6" finish-status="success" simple>
          <el-step title="输入" description="28×28×1"></el-step>
          <el-step title="卷积层" description="3×3, 16通道"></el-step>
          <el-step title="池化层" description="最大池化 2×2"></el-step>
          <el-step title="卷积层" description="3×3, 32通道"></el-step>
          <el-step title="池化层" description="最大池化 2×2"></el-step>
          <el-step title="全连接层" description="128"></el-step>
          <el-step title="输出层" description="10类"></el-step>
        </el-steps>
      </div>
      
      <div class="controls">
        <div class="params">
          <h3>训练参数</h3>
          <div class="param-row">
            <label>学习率:</label>
            <el-slider v-model="learningRate" :min="0.0001" :max="0.01" :step="0.0001" show-input></el-slider>
          </div>
          <div class="param-row">
            <label>批量大小:</label>
            <el-select v-model="batchSize" style="width: 100%">
              <el-option :value="32" label="32"></el-option>
              <el-option :value="64" label="64"></el-option>
              <el-option :value="128" label="128"></el-option>
            </el-select>
          </div>
          <div class="param-row">
            <label>训练样本:</label>
            <el-select v-model="trainSamples" style="width: 100%">
              <el-option :value="1000" label="1000"></el-option>
              <el-option :value="2000" label="2000"></el-option>
              <el-option :value="5000" label="5000"></el-option>
              <el-option :value="10000" label="10000"></el-option>
            </el-select>
          </div>
          <div class="param-row">
            <label>测试样本:</label>
            <el-select v-model="testSamples" style="width: 100%">
              <el-option :value="100" label="100"></el-option>
              <el-option :value="200" label="200"></el-option>
              <el-option :value="500" label="500"></el-option>
              <el-option :value="1000" label="1000"></el-option>
            </el-select>
          </div>
        </div>
        
        <div class="actions">
          <el-button type="primary" @click="loadData" :loading="dataLoading" :disabled="training">
            {{ dataLoaded ? '重新加载数据' : '加载MNIST数据' }}
          </el-button>
          <el-button 
            type="success" 
            @click="trainModel" 
            :disabled="!dataLoaded || training">
            <span v-if="!training">训练模型</span>
            <span v-else>训练中 ({{ currentBatch }}/{{ totalBatches }})</span>
          </el-button>
          <el-button type="info" @click="testModel" :disabled="!trained || training">测试模型</el-button>
        </div>
        
        <el-progress 
          v-if="training" 
          :percentage="(currentBatch / totalBatches) * 100"
          :format="progressFormat"
          status="success">
        </el-progress>
      </div>
    </div>

    <div class="card" v-if="dataLoaded">
      <h3>数据样本</h3>
      <div class="data-samples">
        <div v-for="(sample, index) in displaySamples" :key="index" class="sample">
          <canvas :ref="`sampleCanvas${index}`" width="28" height="28" class="sample-canvas"></canvas>
          <div class="sample-label">标签: {{ sample.label }}</div>
        </div>
      </div>
    </div>

    <div class="card" v-if="trained">
      <h3>模型性能</h3>
      <div class="metrics">
        <div class="metric">
          <div class="metric-label">训练准确率</div>
          <div class="metric-value">{{ (trainAccuracy * 100).toFixed(2) }}%</div>
        </div>
        <div class="metric">
          <div class="metric-label">训练损失</div>
          <div class="metric-value">{{ trainLoss.toFixed(4) }}</div>
        </div>
        <div class="metric" v-if="testAccuracy">
          <div class="metric-label">测试准确率</div>
          <div class="metric-value">{{ (testAccuracy * 100).toFixed(2) }}%</div>
        </div>
      </div>
      
      <div class="visualization">
        <h3>训练过程</h3>
        <canvas ref="lossChart" width="600" height="300"></canvas>
      </div>
    </div>

    <div class="card" v-if="trained">
      <h3>手写数字测试</h3>
      <p>在下方画布上绘制一个0-9的数字，然后点击"预测"按钮:</p>
      <div class="drawing-area">
        <canvas ref="drawCanvas" width="280" height="280" class="draw-canvas"
          @mousedown="startDrawing"
          @mousemove="draw"
          @mouseup="stopDrawing"
          @mouseleave="stopDrawing"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="stopDrawing">
        </canvas>
        <div class="drawing-controls">
          <el-button type="primary" @click="predict" :disabled="!isDrawn">预测</el-button>
          <el-button @click="clearCanvas">清除</el-button>
        </div>
      </div>
      
      <div class="prediction-result" v-if="prediction !== null">
        <h3>预测结果</h3>
        <div class="result">
          <div class="predicted-digit">{{ prediction }}</div>
          <div class="confidence">
            <div v-for="(conf, digit) in confidences" :key="digit" class="confidence-bar">
              <div class="bar-label">{{ digit }}:</div>
              <div class="bar-container">
                <div class="bar" :style="{ width: `${conf * 100}%` }"></div>
                <div class="bar-value">{{ (conf * 100).toFixed(1) }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import * as tf from '@tensorflow/tfjs'
import Chart from 'chart.js/auto'

export default defineComponent({
  name: 'CnnDemo',
  setup() {
    // 状态变量
    const dataLoaded = ref(false)
    const dataLoading = ref(false)
    const training = ref(false)
    const trained = ref(false)
    const isDrawn = ref(false)
    
    // 训练参数
    const learningRate = ref(0.001)
    const batchSize = ref(64)
    const trainSamples = ref(2000)
    const testSamples = ref(200)
    const epochs = ref(5)
    
    // 训练状态
    const currentBatch = ref(0)
    const totalBatches = ref(0)
    const trainAccuracy = ref(0)
    const trainLoss = ref(0)
    const testAccuracy = ref(0)
    
    // 画布引用
    const lossChart = ref(null)
    const drawCanvas = ref(null)
    
    // 预测结果
    const prediction = ref(null)
    const confidences = ref([])
    
    // 数据集
    let mnist = null
    let trainData = null
    let testData = null
    const displaySamples = ref([])
    
    // 模型
    let model = null
    
    // 训练历史
    const history = {
      loss: [],
      accuracy: []
    }
    
    // 绘图状态
    let isDrawing = false
    let drawCtx = null
    
    // 图表实例
    let lossChartInstance = null
    
    // 加载MNIST数据
    const loadData = async () => {
      dataLoading.value = true
      prediction.value = null
      confidences.value = []
      
      try {
        // 使用TensorFlow.js的数据API加载MNIST数据集
        mnist = await tf.data.mnist()
        
        // 获取训练数据
        trainData = mnist.train
          .take(trainSamples.value)
          .batch(batchSize.value)
        
        // 获取测试数据
        testData = mnist.test
          .take(testSamples.value)
          .batch(batchSize.value)
        
        // 获取一些样本用于展示
        const samples = await mnist.train.take(10).toArray()
        displaySamples.value = samples.map(sample => {
          return {
            image: sample.xs.arraySync(),
            label: sample.ys.argMax(-1).arraySync()[0]
          }
        })
        
        dataLoaded.value = true
        
        // 渲染样本图像
        await nextTick()
        renderSamples()
        
      } catch (error) {
        console.error('加载MNIST数据失败:', error)
        alert('加载数据失败，请查看控制台获取详细信息')
      } finally {
        dataLoading.value = false
      }
    }
    
    // 渲染样本图像
    const renderSamples = () => {
      displaySamples.value.forEach((sample, index) => {
        const canvasRef = document.querySelector(`[ref="sampleCanvas${index}"]`)
        if (!canvasRef) return
        
        const ctx = canvasRef.getContext('2d')
        const imageData = ctx.createImageData(28, 28)
        
        for (let i = 0; i < 28 * 28; i++) {
          const value = sample.image[i] * 255
          imageData.data[i * 4] = value
          imageData.data[i * 4 + 1] = value
          imageData.data[i * 4 + 2] = value
          imageData.data[i * 4 + 3] = 255
        }
        
        ctx.putImageData(imageData, 0, 0)
      })
    }
    
    // 创建CNN模型
    const createModel = () => {
      const model = tf.sequential()
      
      // 第一个卷积层和池化层
      model.add(tf.layers.conv2d({
        inputShape: [28, 28, 1],
        kernelSize: 3,
        filters: 16,
        activation: 'relu',
        padding: 'same'
      }))
      
      model.add(tf.layers.maxPooling2d({
        poolSize: [2, 2],
        strides: [2, 2]
      }))
      
      // 第二个卷积层和池化层
      model.add(tf.layers.conv2d({
        kernelSize: 3,
        filters: 32,
        activation: 'relu',
        padding: 'same'
      }))
      
      model.add(tf.layers.maxPooling2d({
        poolSize: [2, 2],
        strides: [2, 2]
      }))
      
      // 展平层，将3D张量转换为1D张量
      model.add(tf.layers.flatten())
      
      // 全连接层
      model.add(tf.layers.dense({
        units: 128,
        activation: 'relu'
      }))
      
      // 输出层
      model.add(tf.layers.dense({
        units: 10,
        activation: 'softmax'
      }))
      
      // 编译模型
      model.compile({
        optimizer: tf.train.adam(learningRate.value),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      })
      
      return model
    }
    
    // 训练模型
    const trainModel = async () => {
      if (!dataLoaded.value) {
        alert('请先加载数据')
        return
      }
      
      training.value = true
      currentBatch.value = 0
      history.loss = []
      history.accuracy = []
      
      try {
        // 创建模型
        model = createModel()
        
        // 计算总批次数
        totalBatches.value = Math.ceil(trainSamples.value / batchSize.value) * epochs.value
        
        // 训练模型
        await model.fitDataset(trainData, {
          epochs: epochs.value,
          callbacks: {
            onBatchEnd: async (batch, logs) => {
              currentBatch.value++
              // 定期更新UI
              if (batch % 10 === 0) {
                await tf.nextFrame()
              }
            },
            onEpochEnd: async (epoch, logs) => {
              history.loss.push(logs.loss)
              history.accuracy.push(logs.acc)
              
              if (epoch === epochs.value - 1) {
                trainLoss.value = logs.loss
                trainAccuracy.value = logs.acc
              }
              
              updateLossChart()
              await tf.nextFrame()
            }
          }
        })
        
        trained.value = true
        clearCanvas()
        
      } catch (error) {
        console.error('训练模型失败:', error)
        alert('训练失败，请查看控制台获取详细信息')
      } finally {
        training.value = false
      }
    }
    
    // 测试模型
    const testModel = async () => {
      if (!model || !dataLoaded.value) return
      
      try {
        let totalCorrect = 0
        let totalSamples = 0
        
        for await (const batch of testData) {
          const predictions = model.predict(batch.xs)
          const labels = batch.ys.argMax(-1)
          const predictedLabels = predictions.argMax(-1)
          
          const correct = tf.equal(labels, predictedLabels)
          const numCorrect = correct.sum().dataSync()[0]
          const numSamples = correct.size
          
          totalCorrect += numCorrect
          totalSamples += numSamples
          
          tf.dispose([predictions, labels, predictedLabels, correct])
        }
        
        testAccuracy.value = totalCorrect / totalSamples
        alert(`测试完成！准确率: ${(testAccuracy.value * 100).toFixed(2)}%`)
        
      } catch (error) {
        console.error('测试模型失败:', error)
        alert('测试失败，请查看控制台获取详细信息')
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
          labels: Array.from({ length: history.loss.length }, (_, i) => `轮次 ${i + 1}`),
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
    
    // 绘图函数
    const startDrawing = (event) => {
      isDrawing = true
      draw(event)
    }
    
    const draw = (event) => {
      if (!isDrawing || !drawCtx) return
      
      const rect = drawCanvas.value.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      drawCtx.lineWidth = 20
      drawCtx.lineCap = 'round'
      drawCtx.strokeStyle = 'white'
      
      drawCtx.lineTo(x, y)
      drawCtx.stroke()
      drawCtx.beginPath()
      drawCtx.moveTo(x, y)
      
      isDrawn.value = true
    }
    
    const handleTouchStart = (event) => {
      event.preventDefault()
      if (event.touches.length === 1) {
        isDrawing = true
        const touch = event.touches[0]
        const mouseEvent = new MouseEvent('mousedown', {
          clientX: touch.clientX,
          clientY: touch.clientY
        })
        drawCanvas.value.dispatchEvent(mouseEvent)
      }
    }
    
    const handleTouchMove = (event) => {
      event.preventDefault()
      if (event.touches.length === 1) {
        const touch = event.touches[0]
        const mouseEvent = new MouseEvent('mousemove', {
          clientX: touch.clientX,
          clientY: touch.clientY
        })
        drawCanvas.value.dispatchEvent(mouseEvent)
      }
    }
    
    const stopDrawing = () => {
      isDrawing = false
      drawCtx.beginPath()
    }
    
    const clearCanvas = () => {
      if (!drawCtx) return
      
      drawCtx.fillStyle = 'black'
      drawCtx.fillRect(0, 0, drawCanvas.value.width, drawCanvas.value.height)
      isDrawn.value = false
      prediction.value = null
      confidences.value = []
    }
    
    // 预测绘制的数字
    const predict = async () => {
      if (!model || !drawCtx) return
      
      try {
        // 缩小图像到28x28
        const imageData = drawCtx.getImageData(0, 0, drawCanvas.value.width, drawCanvas.value.height)
        
        // 创建一个临时画布进行缩放
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = 28
        tempCanvas.height = 28
        const tempCtx = tempCanvas.getContext('2d')
        
        // 绘制黑色背景
        tempCtx.fillStyle = 'black'
        tempCtx.fillRect(0, 0, 28, 28)
        
        // 将原图缩小并绘制到临时画布
        tempCtx.drawImage(drawCanvas.value, 0, 0, 28, 28)
        
        // 获取缩小后的图像数据
        const smallImageData = tempCtx.getImageData(0, 0, 28, 28)
        
        // 准备神经网络的输入数据
        const input = new Float32Array(28 * 28)
        for (let i = 0; i < 28 * 28; i++) {
          // 只取每个像素的红色通道（灰度图像RGB值相同）
          input[i] = smallImageData.data[i * 4] / 255.0
        }
        
        // 使用模型进行预测
        const tensor = tf.tensor(input).reshape([1, 28, 28, 1])
        const predictions = model.predict(tensor)
        const results = predictions.dataSync()
        
        // 找出最大概率的数字
        let maxProb = 0
        let predictedDigit = -1
        confidences.value = []
        
        for (let i = 0; i < 10; i++) {
          confidences.value[i] = results[i]
          if (results[i] > maxProb) {
            maxProb = results[i]
            predictedDigit = i
          }
        }
        
        prediction.value = predictedDigit
        
        // 释放内存
        tensor.dispose()
        predictions.dispose()
        
      } catch (error) {
        console.error('预测失败:', error)
        alert('预测过程中发生错误，请查看控制台获取详细信息')
      }
    }
    
    // 格式化进度条
    const progressFormat = (percentage) => {
      return `${currentBatch.value}/${totalBatches.value}`
    }
    
    onMounted(() => {
      if (drawCanvas.value) {
        drawCtx = drawCanvas.value.getContext('2d')
        clearCanvas()
      }
    })
    
    return {
      dataLoaded,
      dataLoading,
      training,
      trained,
      isDrawn,
      learningRate,
      batchSize,
      trainSamples,
      testSamples,
      epochs,
      currentBatch,
      totalBatches,
      trainAccuracy,
      trainLoss,
      testAccuracy,
      lossChart,
      drawCanvas,
      prediction,
      confidences,
      displaySamples,
      progressFormat,
      loadData,
      trainModel,
      testModel,
      startDrawing,
      draw,
      stopDrawing,
      handleTouchStart,
      handleTouchMove,
      clearCanvas,
      predict
    }
  }
})
</script>

<style scoped>
.cnn-demo {
  padding: 20px 0;
}

h2, h3 {
  margin-bottom: 16px;
  color: var(--primary-color);
}

.model-diagram {
  margin: 20px 0;
  text-align: center;
}

.diagram-img {
  max-width: 100%;
  height: auto;
  max-height: 150px;
}

.model-structure {
  margin: 20px 0;
}

.controls {
  margin: 20px 0;
}

.params {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
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
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.data-samples {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.sample {
  text-align: center;
}

.sample-canvas {
  width: 56px;
  height: 56px;
  background: #000;
  border: 1px solid #ddd;
  border-radius: 4px;
  image-rendering: pixelated;
}

.sample-label {
  margin-top: 4px;
  font-size: 12px;
}

.metrics {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.metric {
  flex: 1;
  background: #f0f9ff;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.metric-label {
  font-size: 14px;
  margin-bottom: 8px;
  color: #666;
}

.metric-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
}

.visualization {
  margin: 20px 0;
}

.drawing-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  gap: 20px;
}

.draw-canvas {
  width: 280px;
  height: 280px;
  background: #000;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: crosshair;
  touch-action: none;
}

.drawing-controls {
  display: flex;
  gap: 10px;
}

.prediction-result {
  margin: 20px 0;
  text-align: center;
}

.result {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.predicted-digit {
  font-size: 72px;
  font-weight: bold;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  color: white;
  border-radius: 8px;
}

.confidence {
  flex: 1;
  max-width: 400px;
}

.confidence-bar {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.bar-label {
  width: 30px;
  text-align: right;
  margin-right: 10px;
}

.bar-container {
  flex: 1;
  height: 20px;
  background: #f0f0f0;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.bar-value {
  position: absolute;
  right: 8px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #333;
}
</style> 