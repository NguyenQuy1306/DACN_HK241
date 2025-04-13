from flask import Flask, request, jsonify
from routers.recommend import recommend_bp
from routers.cancel import predict_router
app = Flask(__name__)
app.register_blueprint(recommend_bp, url_prefix="/recommend")
app.register_blueprint(predict_router)

if __name__ == "__main__":
    app.run(debug=True)