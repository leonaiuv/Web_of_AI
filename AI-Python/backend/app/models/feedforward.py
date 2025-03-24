import tensorflow as tf
import numpy as np

def create_feedforward_model(input_shape, hidden_layers, activation, output_shape):
    """
    创建前馈神经网络模型
    
    参数:
        input_shape: 输入特征的维度
        hidden_layers: 隐藏层的神经元数量列表
        activation: 激活函数类型
        output_shape: 输出的维度
    
    返回:
        编译好的TensorFlow模型
    """
    model = tf.keras.Sequential()
    
    # 添加输入层
    model.add(tf.keras.layers.Input(shape=(input_shape,)))
    
    # 添加隐藏层
    for units in hidden_layers:
        model.add(tf.keras.layers.Dense(units, activation=activation))
    
    # 添加输出层
    model.add(tf.keras.layers.Dense(output_shape, activation='softmax'))
    
    # 编译模型
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

def train_model(model, x_train, y_train, epochs=10, batch_size=32, validation_split=0.2):
    """
    训练前馈神经网络模型
    
    参数:
        model: 要训练的模型
        x_train: 训练数据
        y_train: 训练标签
        epochs: 训练轮数
        batch_size: 批次大小
        validation_split: 验证集比例
    
    返回:
        训练历史
    """
    history = model.fit(
        x_train, y_train,
        epochs=epochs,
        batch_size=batch_size,
        validation_split=validation_split,
        verbose=0
    )
    
    return history.history

def predict(model, x):
    """
    使用模型进行预测
    
    参数:
        model: 训练好的模型
        x: 输入数据
    
    返回:
        预测结果
    """
    return model.predict(x) 