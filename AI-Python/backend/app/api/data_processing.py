from flask import jsonify, request
from app.api import bp
import numpy as np
import json

@bp.route('/data/examples', methods=['GET'])
def get_data_examples():
    """获取各种数据集示例"""
    datasets = {
        'mnist': {
            'name': 'MNIST手写数字',
            'type': '图像分类',
            'description': '包含70,000张手写数字(0-9)的28x28像素灰度图像。',
            'features': '784个像素值(28x28)',
            'targets': '10个类别(0-9)',
            'sample': generate_mnist_sample()
        },
        'iris': {
            'name': '鸢尾花数据集',
            'type': '多分类',
            'description': '包含3种不同品种鸢尾花的150个样本。',
            'features': '4个特征(花萼长度、花萼宽度、花瓣长度、花瓣宽度)',
            'targets': '3个类别(Setosa, Versicolor, Virginica)',
            'sample': generate_iris_sample()
        },
        'boston': {
            'name': '波士顿房价',
            'type': '回归',
            'description': '包含506个波士顿住宅区的房价数据。',
            'features': '13个特征(如犯罪率、工业比例、房间数等)',
            'targets': '房价中位数',
            'sample': generate_boston_sample()
        },
        'time_series': {
            'name': '时间序列数据',
            'type': '序列预测',
            'description': '模拟的时间序列数据，适合RNN/LSTM模型。',
            'features': '时间步长的序列',
            'targets': '下一个时间步的值',
            'sample': generate_time_series_sample()
        }
    }
    
    return jsonify(datasets)

@bp.route('/data/preprocessing', methods=['GET'])
def get_preprocessing_methods():
    """获取数据预处理方法"""
    methods = {
        'normalization': {
            'name': '归一化',
            'formula': '(x - min) / (max - min)',
            'description': '将数据缩放到[0,1]范围内，适用于有明确界限的数据。',
            'example': {
                'input': [1, 2, 3, 4, 5],
                'output': [0.0, 0.25, 0.5, 0.75, 1.0]
            }
        },
        'standardization': {
            'name': '标准化',
            'formula': '(x - mean) / std',
            'description': '将数据转换为均值为0、标准差为1的分布，适用于正态分布数据。',
            'example': {
                'input': [1, 2, 3, 4, 5],
                'output': [-1.41, -0.71, 0, 0.71, 1.41]
            }
        },
        'one_hot_encoding': {
            'name': '独热编码',
            'description': '将分类变量转换为二进制向量，每个类别对应一个位置。',
            'example': {
                'input': ['红', '绿', '蓝'],
                'output': [
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]
                ]
            }
        }
    }
    
    return jsonify(methods)

def generate_mnist_sample():
    """生成MNIST样本数据"""
    # 简化的示例数据
    sample_digit = np.zeros((28, 28)).tolist()
    # 在中间画一个简单的数字5
    for i in range(10, 20):
        for j in range(10, 20):
            if (i == 10 or i == 15 or i == 19 or 
                (j == 10 and i < 15) or
                (j == 19 and i > 15)):
                sample_digit[i][j] = 0.8
    
    # 将2D数组展平为1D
    flattened = [item for sublist in sample_digit for item in sublist]
    
    return {
        'image': sample_digit,
        'features': flattened[:10] + ['...'] + flattened[-10:],  # 简化显示
        'label': 5
    }

def generate_iris_sample():
    """生成鸢尾花样本数据"""
    return {
        'samples': [
            {'sepal_length': 5.1, 'sepal_width': 3.5, 'petal_length': 1.4, 'petal_width': 0.2, 'species': 'Setosa'},
            {'sepal_length': 7.0, 'sepal_width': 3.2, 'petal_length': 4.7, 'petal_width': 1.4, 'species': 'Versicolor'},
            {'sepal_length': 6.3, 'sepal_width': 3.3, 'petal_length': 6.0, 'petal_width': 2.5, 'species': 'Virginica'}
        ]
    }

def generate_boston_sample():
    """生成波士顿房价样本数据"""
    return {
        'samples': [
            {'CRIM': 0.00632, 'ZN': 18.0, 'INDUS': 2.31, 'NOX': 0.538, 'RM': 6.575, 'AGE': 65.2, 'price': 24.0},
            {'CRIM': 0.02731, 'ZN': 0.0, 'INDUS': 7.07, 'NOX': 0.469, 'RM': 6.421, 'AGE': 78.9, 'price': 21.6},
            {'CRIM': 0.02729, 'ZN': 0.0, 'INDUS': 7.07, 'NOX': 0.469, 'RM': 7.185, 'AGE': 61.1, 'price': 34.7}
        ]
    }

def generate_time_series_sample():
    """生成时间序列样本数据"""
    # 简单的正弦波时间序列
    x = np.linspace(0, 4 * np.pi, 100)
    y = np.sin(x).tolist()
    
    return {
        'time_series': y[:30],  # 只显示前30个点
        'sequence_length': 10,
        'prediction': 'next_value'
    } 