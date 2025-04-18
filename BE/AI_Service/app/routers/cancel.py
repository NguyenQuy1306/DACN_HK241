# router/predict_router.py

from flask import Blueprint, request, jsonify
from app.services.cancel_service import CancelPredictionService
import logging
predict_router = Blueprint("predict_router", __name__)
service = CancelPredictionService()


@predict_router.route("/cancel-predict", methods=["POST"])
def predict():
    data = request.json
    logging.info("checkking1234xcxc data ", data)
    prob = service.predict(data)
    return jsonify({"cancel_probability": float(prob[0])})

