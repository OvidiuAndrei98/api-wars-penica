from flask import Flask, render_template, url_for, redirect, request, flash, session
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
import os
import data_manager
from functools import wraps
from markupsafe import escape
# from dotenv import load_dotenv
# load_dotenv()

app = Flask(__name__, static_folder="static", static_url_path="/static")
app.secret_key = "12321321321"


@app.route('/')
def home():
    return render_template("index.html")


if __name__ == "__main__":
    app.run()