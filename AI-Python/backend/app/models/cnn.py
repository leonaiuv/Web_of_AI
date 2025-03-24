import tensorflow as tf
import numpy as np

def create_cnn_model(input_shape, conv_layers, dense_layers, output_shape):
    """
    创建卷积神经网络模型
    
    参数:
        input_shape: 输入图像的形状 (height, width, channels)
        conv_layers: 卷积层的过滤器数量列表
        dense_layers: 全连接层的神经元数量列表
        output_shape: 输出的类别数量
    
    返回:
        编译好的CNN模型
    """
    model = tf.keras.Sequential()
    
    # 添加输入层
    model.add(tf.keras.layers.Input(shape=input_shape))
    
    # 添加卷积层和池化层
    for i, filters in enumerate(conv_layers):
        model.add(tf.keras.layers.Conv2D(
            filters=filters,
            kernel_size=(3, 3),
            activation='relu',
            padding='same'
        ))
        model.add(tf.keras.layers.MaxPooling2D(pool_size=(2, 2)))
    
    # 展平卷积层输出
    model.add(tf.keras.layers.Flatten())
    
    # 添加全连接层
    for units in dense_layers:
        model.add(tf.keras.layers.Dense(units, activation='relu'))
        model.add(tf.keras.layers.Dropout(0.3))
    
    # 添加输出层
    model.add(tf.keras.layers.Dense(output_shape, activation='softmax'))
    
    # 编译模型
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

def train_cnn_model(model, x_train, y_train, epochs=10, batch_size=32, validation_split=0.2):
    """
    训练CNN模型
    
    参数:
        model: 要训练的模型
        x_train: 训练图像数据
        y_train: 训练标签
        epochs: 训练轮数
        batch_size: 批次大小
        validation_split: 验证集比例
    
    返回:
        训练历史
    """
    # 数据增强
    datagen = tf.keras.preprocessing.image.ImageDataGenerator(
        rotation_range=10,
        zoom_range=0.1,
        width_shift_range=0.1,
        height_shift_range=0.1,
        validation_split=validation_split
    )
    
    # 拟合数据生成器
    datagen.fit(x_train)
    
    # 使用数据生成器训练模型
    history = model.fit(
        datagen.flow(x_train, y_train, batch_size=batch_size),
        epochs=epochs,
        verbose=0
    )
    
    return history.history

def predict_image(model, image):
    """
    使用CNN模型预测图像
    
    参数:
        model: 训练好的CNN模型
        image: 输入图像
    
    返回:
        预测类别和概率
    """
    # 确保图像形状正确，并添加批次维度
    if len(image.shape) == 3:
        image = np.expand_dims(image, axis=0)
    
    predictions = model.predict(image)
    predicted_class = np.argmax(predictions, axis=1)[0]
    probability = float(predictions[0][predicted_class])
    
    return {
        'class': int(predicted_class),
        'probability': probability,
        'all_probabilities': predictions[0].tolist()
    } 