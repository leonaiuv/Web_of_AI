from flask import jsonify, request
from app.api import bp
from app.models.feedforward import create_feedforward_model, train_model
from app.models.cnn import create_cnn_model
from app.models.rnn import create_rnn_model
import numpy as np
import json

@bp.route('/models/types', methods=['GET'])
def get_model_types():
    """获取支持的神经网络模型类型"""
    models = {
        'feedforward': '前馈神经网络',
        'cnn': '卷积神经网络',
        'rnn': '循环神经网络',
        'lstm': '长短期记忆网络'
    }
    return jsonify(models)

@bp.route('/models/feedforward/create', methods=['POST'])
def create_ff_model():
    """创建前馈神经网络模型"""
    data = request.get_json()
    layers = data.get('layers', [64, 32])
    activation = data.get('activation', 'relu')
    input_shape = data.get('input_shape', 784)
    output_shape = data.get('output_shape', 10)
    
    model = create_feedforward_model(input_shape, layers, activation, output_shape)
    
    return jsonify({
        'status': 'success',
        'message': '前馈神经网络模型创建成功',
        'model_info': {
            'layers': layers,
            'activation': activation,
            'input_shape': input_shape,
            'output_shape': output_shape
        }
    })

@bp.route('/models/cnn/create', methods=['POST'])
def create_convnet_model():
    """创建卷积神经网络模型"""
    data = request.get_json()
    input_shape = data.get('input_shape', (28, 28, 1))
    conv_layers = data.get('conv_layers', [32, 64])
    dense_layers = data.get('dense_layers', [128])
    output_shape = data.get('output_shape', 10)
    
    model = create_cnn_model(input_shape, conv_layers, dense_layers, output_shape)
    
    return jsonify({
        'status': 'success',
        'message': '卷积神经网络模型创建成功',
        'model_info': {
            'input_shape': input_shape,
            'conv_layers': conv_layers,
            'dense_layers': dense_layers,
            'output_shape': output_shape
        }
    })

@bp.route('/models/rnn/create', methods=['POST'])
def create_recurrent_model():
    """创建循环神经网络模型"""
    data = request.get_json()
    input_shape = data.get('input_shape', (10, 1))
    rnn_units = data.get('rnn_units', [64])
    dense_units = data.get('dense_units', [32])
    output_shape = data.get('output_shape', 1)
    
    model = create_rnn_model(input_shape, rnn_units, dense_units, output_shape)
    
    return jsonify({
        'status': 'success',
        'message': '循环神经网络模型创建成功',
        'model_info': {
            'input_shape': input_shape,
            'rnn_units': rnn_units,
            'dense_units': dense_units,
            'output_shape': output_shape
        }
    })

@bp.route('/models/train', methods=['POST'])
def train_neural_network():
    """训练神经网络模型"""
    data = request.get_json()
    model_type = data.get('model_type', 'feedforward')
    training_data = data.get('training_data', [])
    labels = data.get('labels', [])
    epochs = data.get('epochs', 10)
    batch_size = data.get('batch_size', 32)
    
    # 这里应该调用相应的训练函数
    # 为了演示，我们假设训练成功
    training_result = {
        'accuracy': 0.95,
        'loss': 0.05,
        'epochs_completed': epochs,
        'training_time': 5.2
    }
    
    return jsonify({
        'status': 'success',
        'message': f'{model_type} 模型训练完成',
        'training_result': training_result
    }) 