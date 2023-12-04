from flask import Blueprint, request, jsonify
from models import User, Portfolio
from config import bcrypt, db
from flask_jwt_extended import create_access_token, jwt_required
from datetime import timedelta


auth_blueprint = Blueprint('auth', __name__)


@auth_blueprint.route('/login', methods=['POST'])
def login():
    password = request.json["password"]
    email = request.json["email"]

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Invalid Credentials"})

    if not bcrypt.check_password_hash(user.password, password):
        print("ovde sam")
        return jsonify({"error": "Invalid Credentials"})

    access_token = create_access_token(identity={"id": user.id}, expires_delta=timedelta(minutes=30))
    return {"token": access_token, "verified": "true"}


@auth_blueprint.route('/register', methods=['POST'])
def register():
        first_name, last_name, address, city, country, phone_number, password, email = (request.json[key] for key in
                                                                             ["first_name", "last_name", "address", "city",
                                                                              "country", "phone_number", "password", "email",
                                                                              ])

        user_exists = User.query.filter_by(email=email).first() is not None
        if user_exists == True:
            return jsonify({"error": "User with that email already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        user = User(first_name=first_name, last_name=last_name, address=address, city=city,
                    country=country, phone_number=phone_number, password=hashed_password, email=email)

        db.session.add(user)
        db.session.commit()

        create_portfolio(user)
        return jsonify({"message": "Registration successful"}), 201


def create_portfolio(user):
    portfolio = Portfolio(user_id=user.id,
                          total_value=0,
                          total_profit_loss=0,
                          crypto_currencies=[],
                          transactions=[])

    db.session.add(portfolio)
    db.session.commit()
    return
