from decouple import config
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

load_dotenv()
db = SQLAlchemy()
ma = Marshmallow()
bcrypt = Bcrypt()

BASE_DIR = basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = config("SECRET_KEY")
    JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(
        BASE_DIR, "Portfolio.db"
    )