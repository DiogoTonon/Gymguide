from flask import Blueprint, request, session, jsonify
from database import get_connection
import json

training_bp = Blueprint("training", __name__)

@training_bp.route("/save_training_plan", methods=["POST"])
def save_training_plan():
    if "user_id" not in session:
        return jsonify({"success": False, "message": "Faça login para salvar a ficha."}), 401

    data = request.get_json()
    user_id = session["user_id"]

    title = data.get("title", "").strip()
    description = data.get("description", "").strip()

    if not title:
        return jsonify({"success": False, "message": "Digite um nome para a ficha."}), 400

    if not description:
        return jsonify({"success": False, "message": "Nenhuma ficha foi montada."}), 400

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO training_plans (user_id, title, description) VALUES (?, ?, ?)",
            (user_id, title, description)
        )
        conn.commit()

    return jsonify({"success": True, "message": "Ficha salva com sucesso!"})

@training_bp.route("/remove_training_plan", methods=["POST"])
def remove_training_plan():
    if "user_id" not in session:
        return jsonify({"success": False, "message": "Você precisa estar logado."}), 401

    user_id = session["user_id"]
    training_id = request.form.get("training_id", "").strip()

    if not training_id:
        return jsonify({"success": False, "message": "Ficha inválida."}), 400

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM training_plans WHERE id = ? AND user_id = ?",
            (training_id, user_id)
        )
        conn.commit()

    return jsonify({"success": True, "message": "Ficha removida com sucesso."})