from flask import Blueprint, render_template, request, session, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3

from database import get_connection

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    mensagem = None

    if request.method == "POST":
        email = request.form.get("email", "").strip()
        password = request.form.get("password", "").strip()

        if not email or not password:
            mensagem = "Preencha todos os campos."
            return render_template("login.html", mensagem=mensagem)

        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, email, password FROM users WHERE email = ?",
                (email,)
            )
            usuario = cursor.fetchone()

        if usuario and check_password_hash(usuario["password"], password):
            session["user_id"] = usuario["id"]
            session["user_email"] = usuario["email"]
            return redirect(url_for("main.home"))
        else:
            mensagem = "Email ou senha incorretos."

    return render_template("login.html", mensagem=mensagem)


@auth_bp.route("/cadastro", methods=["GET", "POST"])
def cadastro():
    mensagem = None

    if request.method == "POST":
        email = request.form.get("email", "").strip()
        password = request.form.get("password", "").strip()

        if not email or not password:
            mensagem = "Preencha todos os campos."
            return render_template("cadastro.html", mensagem=mensagem)

        senha_hash = generate_password_hash(password)

        try:
            with get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO users (email, password) VALUES (?, ?)",
                    (email, senha_hash)
                )
                conn.commit()

            return redirect(url_for("auth.login"))

        except sqlite3.IntegrityError:
            mensagem = "Esse email já está cadastrado."

    return render_template("cadastro.html", mensagem=mensagem)


@auth_bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("main.home"))