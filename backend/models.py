from config import db, ma
from marshmallow import fields


class CryptoCurrency(db.Model):
    __tablename__ = "crypto_currency"
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Float)
    name = db.Column(db.String(32))
    symbol = db.Column(db.String(32))
    total_value = db.Column(db.Float)
    total_profit_loss = db.Column(db.Float)
    portfolio_id = db.Column(db.Integer, db.ForeignKey("portfolio.id"))


class CryptoCurrencySchema(ma.Schema):
    id = fields.Number()
    quantity = fields.Number()
    name = fields.Str()
    symbol = fields.Str()
    total_value = fields.Number()
    total_profit_loss = fields.Number()
    portfolio_id = fields.Number()


class Transaction(db.Model):
    __tablename__ = "transaction"
    id = db.Column(db.Integer, primary_key=True)
    transaction_type = db.Column(db.String(10))
    date_time = db.Column(db.DateTime)
    quantity = db.Column(db.Float)
    cryptocurrency_symbol = db.Column(db.String(10))
    value_in_usd = db.Column(db.Float)
    portfolio_id = db.Column(db.Integer, db.ForeignKey("portfolio.id"))


class TransactionSchema(ma.Schema):
    id = fields.Number()
    transaction_type = fields.Str()
    date_time = fields.Date()
    quantity = fields.Number()
    cryptocurrency_symbol = fields.Str()
    value_in_usd = fields.Number()
    portfolio_id = fields.Number()


class Portfolio(db.Model):
    __tablename__ = "portfolio"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    total_value = db.Column(db.Float)
    total_profit_loss = db.Column(db.Float)
    crypto_currencies = db.relationship(
        "CryptoCurrency", backref="portfolio"
    )  # one to many
    transactions = db.relationship(
        "Transaction", backref="portfolio"
    )  # one to many


class PortfolioSchema(ma.Schema):
    id = fields.Number()
    user_id = fields.Number()
    total_value = fields.Number()
    total_profit_loss = fields.Number()
    crypto_currencies = fields.List(fields.Nested(CryptoCurrencySchema))
    transactions = fields.List(fields.Nested(TransactionSchema))


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    address = db.Column(db.String(50))
    city = db.Column(db.String(50))
    country = db.Column(db.String(50))
    phone_number = db.Column(db.String(50))
    password = db.Column(db.String(50))
    email = db.Column(db.String(50))
    portfolio = db.relationship(
        "Portfolio", backref="user", uselist=False
    )  # one to one


class UserSchema(ma.Schema):
    id = fields.Number()
    first_name = fields.Str()
    last_name = fields.Str()
    address = fields.Str()
    city = fields.Str()
    country = fields.Str()
    password = fields.Str()
    email = fields.Str()
    phone_number = fields.Str()
    portfolio = fields.Nested(PortfolioSchema)


