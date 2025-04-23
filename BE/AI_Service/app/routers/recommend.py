from flask import Blueprint, request, jsonify
from app.services.recommend_service import recommend_for_user
from flask_cors import cross_origin
recommend_bp = Blueprint("recommend", __name__)

@recommend_bp.route("/online", methods=["GET"])
@cross_origin()
def recommend_online():
    user_id = int(request.args.get("user_id", 1))
    top_n = int(request.args.get("top_n", 5))

    recommendations = recommend_for_user(user_id=user_id, top_n=top_n)
    return jsonify({
        "user_id": user_id,
        "recommendations": recommendations
    })
