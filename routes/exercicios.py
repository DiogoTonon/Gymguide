from flask import Blueprint, request, session, jsonify, render_template, redirect, url_for
from database import get_connection

exercises_bp = Blueprint("exercises", __name__)

@exercises_bp.route("/favorite_exercise", methods=["POST"])
def favorite_exercise():
    if "user_id" not in session:
        return jsonify({"success": False, "message": "Você precisa estar logado para favoritar."}), 401

    user_id = session["user_id"]
    exercise_name = request.form.get("exercise_name", "").strip()

    if not exercise_name:
        return jsonify({"success": False, "message": "Nome do exercício inválido."}), 400

    with get_connection() as conn:
        cursor = conn.cursor()

        # Verifica se já está favoritado
        cursor.execute(
            "SELECT id FROM favorite_exercises WHERE user_id = ? AND exercise_name = ?",
            (user_id, exercise_name)
        )
        existente = cursor.fetchone()

        if existente:
            # Desfavorita
            cursor.execute(
                "DELETE FROM favorite_exercises WHERE user_id = ? AND exercise_name = ?",
                (user_id, exercise_name)
            )
            conn.commit()
            return jsonify({"success": True, "favoritado": False, "message": "Exercício removido dos favoritos."})
        else:
            # Favorita
            cursor.execute(
                "INSERT INTO favorite_exercises (user_id, exercise_name) VALUES (?, ?)",
                (user_id, exercise_name)
            )
            conn.commit()
            return jsonify({"success": True, "favoritado": True, "message": "Exercício favoritado!"})
        
        
@exercises_bp.route("/remove_favorite_exercise", methods=["POST"])
def remove_favorite_exercise():
    if "user_id" not in session:
        return jsonify({"success": False, "message": "Você precisa estar logado."}), 401

    user_id = session["user_id"]
    exercise_name = request.form.get("exercise_name", "").strip()

    if not exercise_name:
        return jsonify({"success": False, "message": "Nome do exercício inválido."}), 400

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "DELETE FROM favorite_exercises WHERE user_id = ? AND exercise_name = ?",
            (user_id, exercise_name)
        )
        conn.commit()

    return jsonify({"success": True, "message": "Exercício removido dos favoritos."})


@exercises_bp.route("/favoritos")
def favoritos():
    if "user_id" not in session:
        return render_template(
            "favoritos.html",
            usuario_email=None,
            favoritos=[],
            fichas=[],
            dietas=[]
        )

    user_id = session["user_id"]

    with get_connection() as conn:
        cursor = conn.cursor()

        # Exercícios favoritados
        cursor.execute(
            "SELECT exercise_name FROM favorite_exercises WHERE user_id = ?",
            (user_id,)
        )
        favoritos = [row["exercise_name"] for row in cursor.fetchall()]

        # Fichas salvas
        cursor.execute(
            "SELECT id, title, description FROM training_plans WHERE user_id = ? ORDER BY id DESC",
            (user_id,)
        )
        fichas = cursor.fetchall()

        # Dietas salvas com itens e macros
        cursor.execute(
            "SELECT id, title FROM diets WHERE user_id = ? ORDER BY id DESC",
            (user_id,)
        )
        dietas_rows = cursor.fetchall()

        dietas = []
        for dieta in dietas_rows:
            cursor.execute(
                "SELECT food_name, quantity, calories, protein, carbs, fats FROM diet_items WHERE diet_id = ?",
                (dieta["id"],)
            )
            items = cursor.fetchall()

            total_cal  = sum(float(i["calories"] or 0) for i in items)
            total_prot = sum(float(i["protein"]  or 0) for i in items)
            total_carb = sum(float(i["carbs"]    or 0) for i in items)
            total_fat  = sum(float(i["fats"]     or 0) for i in items)

            dietas.append({
                "id":    dieta["id"],
                "title": dieta["title"],
                "items": [dict(i) for i in items],
                "total_calories": round(total_cal),
                "total_protein":  round(total_prot, 1),
                "total_carbs":    round(total_carb, 1),
                "total_fats":     round(total_fat, 1),
            })

    return render_template(
        "favoritos.html",
        usuario_email=session.get("user_email"),
        favoritos=favoritos,
        fichas=fichas,
        dietas=dietas
    )

@exercises_bp.route("/meus_favoritos")
def meus_favoritos():
    """Retorna os favoritos do usuário logado em JSON (usado pelo JS na página inicial)."""
    if "user_id" not in session:
        return jsonify([])

    user_id = session["user_id"]

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT exercise_name FROM favorite_exercises WHERE user_id = ?",
            (user_id,)
        )
        favoritos = [row["exercise_name"] for row in cursor.fetchall()]

    return jsonify(favoritos)
