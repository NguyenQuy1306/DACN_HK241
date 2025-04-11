from flask import Flask
from routers.recommend import recommend_bp

app = Flask(__name__)
app.register_blueprint(recommend_bp, url_prefix="/recommend")

if __name__ == "__main__":
    app.run(debug=True)