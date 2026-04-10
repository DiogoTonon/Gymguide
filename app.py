from flask import Flask
from database import init_db
from routes.main import main_bp
from routes.auth import auth_bp
from routes.exercicios import exercises_bp
from routes.diets import diets_bp
from routes.training import training_bp

app = Flask(__name__)
app.secret_key = "gymguide_chave_secreta"

# Registra os blueprints
app.register_blueprint(main_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(exercises_bp)
app.register_blueprint(diets_bp)
app.register_blueprint(training_bp)

# Inicializa o banco de dados
init_db()

if __name__ == "__main__":
    app.run(debug=True)