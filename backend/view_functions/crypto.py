from flask import Blueprint, request, jsonify
import requests
from flask_jwt_extended import jwt_required

crypto_blueprint = Blueprint('crypto', __name__)


@crypto_blueprint.route('/list_all_cryptocurrencies', methods=['GET'])
def list_all_cryptocurrencies():
    api_url = 'https://api.coingecko.com/api/v3/coins/markets'
    params = {
        'vs_currency': 'usd',
        'order': 'market_cap_desc',
        'per_page': 100,
        'page': 1
    }

    response = requests.get(api_url, params=params)

    if response.status_code == 200:
        data = response.json()
        crypto_list = [{'symbol': item['symbol'], 'price': item['current_price']} for item in data]
        return jsonify(crypto_list)
    else:
        return jsonify({"error": "Failed to fetch cryptocurrency data"}), 500
