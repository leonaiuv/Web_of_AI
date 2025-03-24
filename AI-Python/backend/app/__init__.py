from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__, static_folder='static')
    CORS(app)
    
    # 注册API蓝图
    from app.api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')
    
    return app 