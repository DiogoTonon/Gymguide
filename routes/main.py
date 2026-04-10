from flask import Blueprint, render_template, session

main_bp = Blueprint("main", __name__)


@main_bp.route("/")
def home():
    usuario_email = session.get("user_email")
    return render_template("index.html", usuario_email=usuario_email)