from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from sklearn.datasets import make_moons
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)
CORS(app)

def generate_plot(x, y, title):
    plt.figure(figsize=(8, 6))
    plt.scatter(x[:, 0], x[:, 1], c=y, cmap='viridis')
    plt.title(title)
    plt.colorbar()
    
    # 将图表转换为base64字符串
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return base64.b64encode(buf.getvalue()).decode()

@app.route('/api/generate-data', methods=['GET'])
def generate_data():
    # 生成月亮形状的数据集
    X, y = make_moons(n_samples=1000, noise=0.1)
    
    # 生成可视化图表
    plot_data = generate_plot(X, y, "月亮形状数据集")
    
    return jsonify({
        'data': X.tolist(),
        'labels': y.tolist(),
        'plot': plot_data
    })

@app.route('/api/train-model', methods=['POST'])
def train_model():
    data = request.json
    X = np.array(data['data'])
    y = np.array(data['labels'])
    
    # 创建简单的神经网络模型
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(16, activation='relu', input_shape=(2,)),
        tf.keras.layers.Dense(8, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(optimizer='adam',
                 loss='binary_crossentropy',
                 metrics=['accuracy'])
    
    # 训练模型
    history = model.fit(X, y, epochs=50, batch_size=32, verbose=0)
    
    # 生成预测结果的可视化
    x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, 0.1),
                         np.arange(y_min, y_max, 0.1))
    
    Z = model.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)
    
    plt.figure(figsize=(8, 6))
    plt.contourf(xx, yy, Z, alpha=0.4)
    plt.scatter(X[:, 0], X[:, 1], c=y, cmap='viridis')
    plt.title("模型预测结果")
    plt.colorbar()
    
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    plot_data = base64.b64encode(buf.getvalue()).decode()
    
    return jsonify({
        'history': {
            'loss': history.history['loss'],
            'accuracy': history.history['accuracy']
        },
        'plot': plot_data
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000) 