from flask import Flask
from config import Config, db
from view_functions.auth import auth_blueprint
from view_functions.crypto import crypto_blueprint
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import User, CryptoCurrency, Transaction, Portfolio

app = Flask(__name__)
app.config.from_object(Config)


app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(crypto_blueprint, url_prefix='/crypto')

CORS(app, supports_credentials=True)
jwt = JWTManager(app)

db.init_app(app)

@app.route("/create", methods=["POST"])
def create():
    db.create_all()
    return "All tables created"


if __name__ == "__main__":
    app.run(debug=True)


















