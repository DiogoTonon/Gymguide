from flask import Blueprint, request, session, jsonify, render_template, redirect, url_for
from database import get_connection

diets_bp = Blueprint("diets", __name__)

@diets_bp.route("/save_diet", methods=["POST"])
def save_diet():
    if "user_id" not in session:
        return jsonify({"success": False, "message": "Faça login para salvar a dieta."}), 401

    data = request.get_json()
    user_id = session["user_id"]

    title = data.get("title", "").strip()
    items = data.get("items", [])

    if not title:
        return jsonify({"success": False, "message": "Digite um nome para a dieta."}), 400

    if not items:
        return jsonify({"success": False, "message": "Adicione pelo menos um alimento."}), 400

    with get_connection() as conn:
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO diets (user_id, title) VALUES (?, ?)",
            (user_id, title)
        )

        diet_id = cursor.lastrowid

        for item in items:
            cursor.execute("""
                INSERT INTO diet_items (
                    diet_id, food_name, quantity, calories, protein, carbs, fats
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                diet_id,
                item.get("food_name", ""),
                item.get("quantity", ""),
                item.get("calories", ""),
                item.get("protein", ""),
                item.get("carbs", ""),
                item.get("fats", "")
            ))

        conn.commit()

    return jsonify({"success": True, "message": "Dieta salva com sucesso."})

@diets_bp.route("/remove_diet", methods=["POST"])
def remove_diet():
    if "user_id" not in session:
        return jsonify({"success": False, "message": "Você precisa estar logado."}), 401

    user_id = session["user_id"]
    diet_id = request.form.get("diet_id", "").strip()

    if not diet_id:
        return jsonify({"success": False, "message": "Dieta inválida."}), 400

    with get_connection() as conn:
        cursor = conn.cursor()

        # primeiro apaga os itens da dieta
        cursor.execute(
            "DELETE FROM diet_items WHERE diet_id = ?",
            (diet_id,)
        )

        # depois apaga a dieta
        cursor.execute(
            "DELETE FROM diets WHERE id = ? AND user_id = ?",
            (diet_id, user_id)
        )

        conn.commit()

    return jsonify({"success": True, "message": "Dieta removida com sucesso."})