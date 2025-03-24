import tensorflow as tf
import numpy as np

def create_rnn_model(input_shape, rnn_units, dense_units, output_shape):
    """
    创建循环神经网络模型
    
    参数:
        input_shape: 输入序列的形状 (time_steps, features)
        rnn_units: RNN层的单元数量列表
        dense_units: 全连接层的神经元数量列表
        output_shape: 输出的维度
    
    返回:
        编译好的RNN模型
    """
    model = tf.keras.Sequential()
    
    # 添加输入层
    model.add(tf.keras.layers.Input(shape=input_shape))
    
    # 添加RNN层
    for i, units in enumerate(rnn_units):
        return_sequences = i < len(rnn_units) - 1  # 除了最后一层，其他层都返回序列
        model.add(tf.keras.layers.SimpleRNN(
            units=units,
            return_sequences=return_sequences,
            activation='tanh'
        ))
    
    # 添加全连接层
    for units in dense_units:
        model.add(tf.keras.layers.Dense(units, activation='relu'))
        model.add(tf.keras.layers.Dropout(0.2))
    
    # 添加输出层
    if output_shape == 1:
        # 回归问题
        model.add(tf.keras.layers.Dense(output_shape))
    else:
        # 分类问题
        model.add(tf.keras.layers.Dense(output_shape, activation='softmax'))
    
    # 编译模型
    if output_shape == 1:
        model.compile(optimizer='adam', loss='mse', metrics=['mae'])
    else:
        model.compile(
            optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
    
    return model

def create_lstm_model(input_shape, lstm_units, dense_units, output_shape):
    """
    创建LSTM网络模型
    
    参数:
        input_shape: 输入序列的形状 (time_steps, features)
        lstm_units: LSTM层的单元数量列表
        dense_units: 全连接层的神经元数量列表
        output_shape: 输出的维度
    
    返回:
        编译好的LSTM模型
    """
    model = tf.keras.Sequential()
    
    # 添加输入层
    model.add(tf.keras.layers.Input(shape=input_shape))
    
    # 添加LSTM层
    for i, units in enumerate(lstm_units):
        return_sequences = i < len(lstm_units) - 1  # 除了最后一层，其他层都返回序列
        model.add(tf.keras.layers.LSTM(
            units=units,
            return_sequences=return_sequences,
            activation='tanh'
        ))
    
    # 添加全连接层
    for units in dense_units:
        model.add(tf.keras.layers.Dense(units, activation='relu'))
        model.add(tf.keras.layers.Dropout(0.2))
    
    # 添加输出层
    if output_shape == 1:
        # 回归问题
        model.add(tf.keras.layers.Dense(output_shape))
    else:
        # 分类问题
        model.add(tf.keras.layers.Dense(output_shape, activation='softmax'))
    
    # 编译模型
    if output_shape == 1:
        model.compile(optimizer='adam', loss='mse', metrics=['mae'])
    else:
        model.compile(
            optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
    
    return model

def train_sequence_model(model, x_train, y_train, epochs=20, batch_size=32, validation_split=0.2):
    """
    训练序列模型
    
    参数:
        model: 要训练的模型
        x_train: 训练序列数据
        y_train: 训练标签或目标值
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

def predict_sequence(model, sequence):
    """
    使用序列模型进行预测
    
    参数:
        model: 训练好的模型
        sequence: 输入序列
    
    返回:
        预测结果
    """
    # 确保序列形状正确，并添加批次维度
    if len(sequence.shape) == 2:
        sequence = np.expand_dims(sequence, axis=0)
    
    return model.predict(sequence) 