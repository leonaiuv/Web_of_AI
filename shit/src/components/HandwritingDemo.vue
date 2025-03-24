<template>
  <div class="handwriting-demo">
    <div class="card">
      <h2>实时手写识别</h2>
      <p>这个演示使用预训练的卷积神经网络模型，可以实时识别您绘制的手写数字。</p>
      
      <div class="instruction">
        <el-alert
          title="使用说明"
          type="info"
          description="在下方画板上绘制一个数字 (0-9)，系统会实时识别您的输入。需要预先加载模型才能开始使用。"
          show-icon
          :closable="false">
        </el-alert>
      </div>
      
      <div class="model-status">
        <div class="status">
          <span>模型状态：</span>
          <el-tag :type="modelLoaded ? 'success' : 'danger'">
            {{ modelLoaded ? '已加载' : '未加载' }}
          </el-tag>
        </div>
        
        <el-button 
          type="primary"
          @click="loadModel"
          :loading="isLoading"
          :disabled="modelLoaded">
          {{ modelLoaded ? '模型已加载' : '加载预训练模型' }}
        </el-button>
      </div>
    </div>

    <div class="card" v-if="modelLoaded">
      <div class="drawing-container">
        <div class="drawing-area">
          <h3>绘制区域</h3>
          <div class="canvas-wrapper">
            <canvas 
              ref="drawingCanvas" 
              width="280" 
              height="280"
              @mousedown="startDrawing"
              @mousemove="draw"
              @mouseup="stopDrawing"
              @mouseleave="stopDrawing"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="stopDrawing">
            </canvas>
            <div class="canvas-controls">
              <el-button size="small" @click="clearCanvas">清除</el-button>
              <el-button size="small" type="primary" @click="recognizeHandwriting" :disabled="!isDrawn">识别</el-button>
            </div>
          </div>
        </div>
        
        <div class="recognition-result">
          <h3>识别结果</h3>
          <div class="result-display" v-if="predictions.length > 0">
            <div class="top-prediction">
              <div class="prediction-digit">{{ predictions[0].digit }}</div>
              <div class="prediction-confidence">置信度: {{ (predictions[0].confidence * 100).toFixed(2) }}%</div>
            </div>
            
            <div class="other-predictions">
              <h4>其他可能的数字:</h4>
              <div class="prediction-bars">
                <div 
                  v-for="(pred, index) in predictions.slice(1, 4)" 
                  :key="index"
                  class="prediction-bar">
                  <div class="bar-label">{{ pred.digit }}:</div>
                  <div class="bar-container">
                    <div class="bar" :style="{ width: `${pred.confidence * 100}%` }"></div>
                    <div class="bar-value">{{ (pred.confidence * 100).toFixed(1) }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="no-prediction" v-else>
            <el-empty description="尚未进行识别或未检测到有效输入"></el-empty>
          </div>
        </div>
      </div>
      
      <div class="real-time-mode">
        <el-switch
          v-model="realtimeMode"
          active-text="实时识别模式"
          inactive-text="手动识别模式">
        </el-switch>
        <p class="mode-description">{{ realtimeMode ? '绘制时会实时识别数字' : '需要点击"识别"按钮才会进行识别' }}</p>
      </div>
    </div>
    
    <div class="card info-card">
      <h3>如何提高识别准确率</h3>
      <ul class="tips">
        <li>尽量在画布中央绘制数字</li>
        <li>使用较粗的笔画，确保数字清晰可见</li>
        <li>每次只绘制一个完整的数字</li>
        <li>如果识别错误，请清除后重新绘制</li>
        <li>对于数字"1"，尽量画成直线形式而非倾斜</li>
        <li>对于数字"7"，可以在中间添加横线以区别于"1"</li>
      </ul>
    </div>
    
    <div class="card" v-if="modelLoaded">
      <h3>模型信息</h3>
      <div class="model-info">
        <p><strong>模型类型:</strong> 卷积神经网络 (CNN)</p>
        <p><strong>训练数据集:</strong> MNIST 手写数字数据集</p>
        <p><strong>输入尺寸:</strong> 28×28 像素</p>
        <p><strong>模型结构:</strong></p>
        <pre class="model-structure">
卷积层1: 16个3×3滤波器, ReLU激活
最大池化: 2×2
卷积层2: 32个3×3滤波器, ReLU激活
最大池化: 2×2
全连接层: 128个神经元, ReLU激活
输出层: 10个神经元 (对应数字0-9), Softmax激活</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue'
import * as tf from '@tensorflow/tfjs'

export default defineComponent({
  name: 'HandwritingDemo',
  setup() {
    // 状态变量
    const isLoading = ref(false)
    const modelLoaded = ref(false)
    const isDrawn = ref(false)
    const realtimeMode = ref(false)
    const drawingCanvas = ref(null)
    const predictions = ref([])
    
    // 绘图相关变量
    let model = null
    let ctx = null
    let isDrawing = false
    let lastX = 0
    let lastY = 0
    let recognizeTimeout = null
    
    // 加载预训练模型
    const loadModel = async () => {
      if (modelLoaded.value) return
      
      isLoading.value = true
      
      try {
        // 这里我们使用TensorFlow.js加载一个预训练的模型
        // 在实际应用中，您可能需要从服务器加载您自己的模型
        model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mnist_v1/model.json')
        
        // 测试模型是否成功加载
        const dummyInput = tf.zeros([1, 28, 28, 1])
        const result = model.predict(dummyInput)
        result.dispose()
        dummyInput.dispose()
        
        modelLoaded.value = true
        console.log('模型加载成功')
      } catch (error) {
        console.error('加载模型失败:', error)
        alert('加载模型失败，请查看控制台获取详细信息')
      } finally {
        isLoading.value = false
      }
    }
    
    // 初始化画布
    const initCanvas = () => {
      if (!drawingCanvas.value) return
      
      ctx = drawingCanvas.value.getContext('2d')
      
      // 设置黑色背景
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, drawingCanvas.value.width, drawingCanvas.value.height)
      
      // 设置画笔样式
      ctx.lineWidth = 15
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = 'white'
    }
    
    // 开始绘制
    const startDrawing = (event) => {
      isDrawing = true
      const { offsetX, offsetY } = getCoordinates(event)
      lastX = offsetX
      lastY = offsetY
    }
    
    // 绘制过程
    const draw = (event) => {
      if (!isDrawing || !ctx) return
      
      const { offsetX, offsetY } = getCoordinates(event)
      
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(offsetX, offsetY)
      ctx.stroke()
      
      lastX = offsetX
      lastY = offsetY
      
      isDrawn.value = true
      
      // 如果启用了实时识别模式，则在绘制过程中进行识别
      if (realtimeMode.value) {
        // 使用防抖，避免过于频繁的识别
        if (recognizeTimeout) {
          clearTimeout(recognizeTimeout)
        }
        recognizeTimeout = setTimeout(() => {
          recognizeHandwriting()
        }, 300)
      }
    }
    
    // 处理触摸事件
    const handleTouchStart = (event) => {
      event.preventDefault()
      if (event.touches.length === 1) {
        const touch = event.touches[0]
        const rect = drawingCanvas.value.getBoundingClientRect()
        lastX = touch.clientX - rect.left
        lastY = touch.clientY - rect.top
        isDrawing = true
      }
    }
    
    const handleTouchMove = (event) => {
      event.preventDefault()
      if (!isDrawing || !ctx) return
      
      if (event.touches.length === 1) {
        const touch = event.touches[0]
        const rect = drawingCanvas.value.getBoundingClientRect()
        const offsetX = touch.clientX - rect.left
        const offsetY = touch.clientY - rect.top
        
        ctx.beginPath()
        ctx.moveTo(lastX, lastY)
        ctx.lineTo(offsetX, offsetY)
        ctx.stroke()
        
        lastX = offsetX
        lastY = offsetY
        
        isDrawn.value = true
        
        // 实时识别模式
        if (realtimeMode.value) {
          if (recognizeTimeout) {
            clearTimeout(recognizeTimeout)
          }
          recognizeTimeout = setTimeout(() => {
            recognizeHandwriting()
          }, 300)
        }
      }
    }
    
    // 获取坐标
    const getCoordinates = (event) => {
      if (!drawingCanvas.value) return { offsetX: 0, offsetY: 0 }
      
      const rect = drawingCanvas.value.getBoundingClientRect()
      return {
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top
      }
    }
    
    // 停止绘制
    const stopDrawing = () => {
      isDrawing = false
    }
    
    // 清除画布
    const clearCanvas = () => {
      if (!ctx || !drawingCanvas.value) return
      
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, drawingCanvas.value.width, drawingCanvas.value.height)
      
      isDrawn.value = false
      predictions.value = []
    }
    
    // 识别手写数字
    const recognizeHandwriting = async () => {
      if (!model || !ctx || !isDrawn.value) return
      
      try {
        // 获取画布图像数据
        const imageData = ctx.getImageData(0, 0, drawingCanvas.value.width, drawingCanvas.value.height)
        
        // 调整为模型需要的28x28输入尺寸
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = 28
        tempCanvas.height = 28
        const tempCtx = tempCanvas.getContext('2d')
        
        // 绘制黑色背景
        tempCtx.fillStyle = 'black'
        tempCtx.fillRect(0, 0, 28, 28)
        
        // 缩放原始图像
        tempCtx.drawImage(drawingCanvas.value, 0, 0, 28, 28)
        
        // 获取调整后的图像数据
        const smallImageData = tempCtx.getImageData(0, 0, 28, 28)
        
        // 处理图像数据为模型输入格式
        const input = new Float32Array(28 * 28)
        for (let i = 0; i < 28 * 28; i++) {
          // 只使用红色通道作为灰度值(因为RGB值在灰度图中是相同的)
          input[i] = smallImageData.data[i * 4] / 255.0
        }
        
        // 进行预测
        const tensor = tf.tensor(input).reshape([1, 28, 28, 1])
        const output = model.predict(tensor)
        const probabilities = output.dataSync()
        
        // 整理预测结果
        const predictionResults = []
        for (let i = 0; i < 10; i++) {
          predictionResults.push({
            digit: i,
            confidence: probabilities[i]
          })
        }
        
        // 按置信度排序
        predictionResults.sort((a, b) => b.confidence - a.confidence)
        predictions.value = predictionResults
        
        // 释放资源
        tensor.dispose()
        output.dispose()
        
      } catch (error) {
        console.error('识别过程发生错误:', error)
        alert('识别过程中发生错误，请查看控制台获取详细信息')
      }
    }
    
    // 监听实时模式变化
    watch(realtimeMode, (newValue) => {
      if (newValue && isDrawn.value) {
        // 如果开启实时模式且已经有绘制内容，立即进行一次识别
        recognizeHandwriting()
      }
    })
    
    onMounted(() => {
      initCanvas()
    })
    
    return {
      isLoading,
      modelLoaded,
      isDrawn,
      realtimeMode,
      drawingCanvas,
      predictions,
      loadModel,
      startDrawing,
      draw,
      stopDrawing,
      handleTouchStart,
      handleTouchMove,
      clearCanvas,
      recognizeHandwriting
    }
  }
})
</script>

<style scoped>
.handwriting-demo {
  padding: 20px 0;
}

h2, h3, h4 {
  margin-bottom: 16px;
  color: var(--primary-color);
}

h4 {
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.instruction {
  margin: 20px 0;
}

.model-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.status {
  display: flex;
  align-items: center;
  gap: 10px;
}

.drawing-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.drawing-area, .recognition-result {
  flex: 1;
  min-width: 300px;
}

.canvas-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

canvas {
  background: black;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: crosshair;
  touch-action: none;
}

.canvas-controls {
  display: flex;
  gap: 10px;
}

.result-display {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.top-prediction {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.prediction-digit {
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

.prediction-confidence {
  margin-top: 10px;
  font-size: 16px;
  color: #666;
}

.prediction-bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.prediction-bar {
  display: flex;
  align-items: center;
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

.no-prediction {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.real-time-mode {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  text-align: center;
}

.mode-description {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  font-style: italic;
}

.info-card {
  background: #f7f8fa;
}

.tips {
  padding-left: 20px;
  line-height: 1.8;
}

.tips li {
  margin-bottom: 8px;
}

.model-info {
  font-size: 14px;
  line-height: 1.6;
}

.model-structure {
  background: #f7f8fa;
  padding: 15px;
  border-radius: 4px;
  border-left: 3px solid var(--primary-color);
  font-family: monospace;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
}

@media (max-width: 768px) {
  .drawing-container {
    flex-direction: column;
  }
  
  .drawing-area, .recognition-result {
    width: 100%;
  }
}
</style> 