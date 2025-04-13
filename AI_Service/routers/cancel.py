# router/predict_router.py

from flask import Blueprint, request, jsonify
from services.cancel_service import CancelPredictionService

predict_router = Blueprint("predict_router", __name__)
service = CancelPredictionService()

@predict_router.route("/cancel-predict", methods=["POST"])
def predict():
    data = request.json
    prob = service.predict(data)
    return jsonify({"cancel_probability": prob})
