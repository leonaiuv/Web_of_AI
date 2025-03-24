from flask import jsonify, request, send_file
from app.api import bp
import numpy as np
import matplotlib.pyplot as plt
import io
import base64
from matplotlib.figure import Figure
import json

@bp.route('/visualization/activation-functions', methods=['GET'])
def get_activation_functions():
    """获取激活函数可视化数据"""
    activations = {
        'sigmoid': {
            'name': 'Sigmoid函数',
            'formula': 'σ(x) = 1 / (1 + e^(-x))',
            'description': 'Sigmoid函数将输入映射到0到1之间，常用于二分类问题的输出层。',
            'data': generate_activation_data('sigmoid')
        },
        'tanh': {
            'name': '双曲正切函数',
            'formula': 'tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))',
            'description': '双曲正切函数将输入映射到-1到1之间，在特征中心化方面表现良好。',
            'data': generate_activation_data('tanh')
        },
        'relu': {
            'name': '修正线性单元(ReLU)',
            'formula': 'ReLU(x) = max(0, x)',
            'description': 'ReLU是最常用的激活函数，计算效率高，能缓解梯度消失问题。',
            'data': generate_activation_data('relu')
        },
        'leaky_relu': {
            'name': '带泄漏的修正线性单元(Leaky ReLU)',
            'formula': 'Leaky_ReLU(x) = max(0.01x, x)',
            'description': 'Leaky ReLU解决了ReLU的"死亡"问题，允许负值有小梯度。',
            'data': generate_activation_data('leaky_relu')
        }
    }
    
    return jsonify(activations)

@bp.route('/visualization/loss-functions', methods=['GET'])
def get_loss_functions():
    """获取损失函数可视化数据"""
    losses = {
        'mse': {
            'name': '均方误差(MSE)',
            'formula': 'MSE = (1/n) * Σ(y - ŷ)²',
            'description': '均方误差用于回归问题，对异常值敏感。',
            'data': generate_loss_data('mse')
        },
        'cross_entropy': {
            'name': '交叉熵损失',
            'formula': 'CE = -Σ(y * log(ŷ))',
            'description': '交叉熵常用于分类问题，惩罚错误预测。',
            'data': generate_loss_data('cross_entropy')
        },
        'binary_cross_entropy': {
            'name': '二元交叉熵',
            'formula': 'BCE = -(y*log(ŷ) + (1-y)*log(1-ŷ))',
            'description': '用于二分类问题的特殊交叉熵形式。',
            'data': generate_loss_data('binary_cross_entropy')
        }
    }
    
    return jsonify(losses)

@bp.route('/visualization/network-architecture/<model_type>', methods=['GET'])
def get_network_architecture(model_type):
    """获取神经网络架构可视化数据"""
    architectures = {
        'feedforward': {
            'name': '前馈神经网络',
            'layers': ['输入层', '隐藏层1', '隐藏层2', '输出层'],
            'connections': 'fully_connected',
            'description': '最基本的神经网络类型，数据只向前传播，没有循环。'
        },
        'cnn': {
            'name': '卷积神经网络',
            'layers': ['输入层', '卷积层', '池化层', '卷积层', '池化层', '全连接层', '输出层'],
            'connections': 'convolutional',
            'description': '专为处理网格结构数据(如图像)设计，使用卷积操作提取特征。'
        },
        'rnn': {
            'name': '循环神经网络',
            'layers': ['输入层', '循环层', '循环层', '输出层'],
            'connections': 'recurrent',
            'description': '设计用于处理序列数据，包含循环连接以保持内部状态。'
        },
        'lstm': {
            'name': '长短期记忆网络',
            'layers': ['输入层', 'LSTM层', 'LSTM层', '输出层'],
            'connections': 'lstm',
            'description': 'RNN的特殊变体，能更好地处理长序列中的长期依赖关系。'
        }
    }
    
    if model_type in architectures:
        return jsonify(architectures[model_type])
    else:
        return jsonify({'error': '未找到指定的模型类型'}), 404

def generate_activation_data(func_type):
    """生成激活函数的数据点"""
    x = np.linspace(-5, 5, 100).tolist()
    
    if func_type == 'sigmoid':
        y = [1 / (1 + np.exp(-val)) for val in x]
    elif func_type == 'tanh':
        y = [np.tanh(val) for val in x]
    elif func_type == 'relu':
        y = [max(0, val) for val in x]
    elif func_type == 'leaky_relu':
        y = [val if val > 0 else 0.01 * val for val in x]
    else:
        y = x
        
    return {'x': x, 'y': y}

def generate_loss_data(func_type):
    """生成损失函数的数据点"""
    # 以预测值和真实值的差异作为X轴
    prediction_diff = np.linspace(-2, 2, 100).tolist()
    
    if func_type == 'mse':
        # MSE = (y - ŷ)²
        y = [val ** 2 for val in prediction_diff]
    elif func_type == 'cross_entropy':
        # 简化的交叉熵可视化
        # 避免log(0)错误
        y = [-np.log(max(0.01, 1 - abs(val))) for val in prediction_diff]
    elif func_type == 'binary_cross_entropy':
        # 简化的二元交叉熵可视化
        # 避免log(0)错误
        y = [-0.5 * np.log(max(0.01, 1 - abs(val))) - 0.5 * np.log(max(0.01, abs(val))) for val in prediction_diff]
    else:
        y = prediction_diff
        
    return {'x': prediction_diff, 'y': y} 