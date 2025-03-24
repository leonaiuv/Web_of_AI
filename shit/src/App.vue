<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <h1>神经网络可视化演示平台</h1>
        <p>直观了解神经网络的工作原理和训练过程</p>
      </div>
    </header>

    <main class="container">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="感知器演示" name="perceptron">
          <perceptron-demo />
        </el-tab-pane>
        <el-tab-pane label="多层神经网络" name="mlp">
          <mlp-demo />
        </el-tab-pane>
        <el-tab-pane label="卷积神经网络" name="cnn">
          <cnn-demo />
        </el-tab-pane>
        <el-tab-pane label="实时手写识别" name="handwriting">
          <handwriting-demo />
        </el-tab-pane>
      </el-tabs>
    </main>

    <footer class="footer">
      <div class="container">
        <p>© 2025 神经网络可视化演示平台 | 基于 Vue.js 和 TensorFlow.js</p>
      </div>
    </footer>
  </div>
</template>

<script>
import PerceptronDemo from './components/PerceptronDemo.vue'
import MlpDemo from './components/MlpDemo.vue'
import CnnDemo from './components/CnnDemo.vue'
import HandwritingDemo from './components/HandwritingDemo.vue'

export default {
  name: 'App',
  components: {
    PerceptronDemo,
    MlpDemo,
    CnnDemo,
    HandwritingDemo
  },
  data() {
    return {
      activeTab: 'perceptron'
    }
  }
}
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: var(--primary-color);
  color: white;
  padding: 40px 0;
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.header p {
  font-size: 1.2rem;
  opacity: 0.8;
}

main {
  flex: 1;
}

.el-tabs {
  margin-bottom: 30px;
}

.footer {
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  text-align: center;
  margin-top: 40px;
}
</style> 