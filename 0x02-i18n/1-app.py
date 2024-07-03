#!/usr/bin/env python3
""" Basic Flask App """
from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """ Flask configuration class """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object('1-app.Config')
babel = Babel(app)


@app.route('/', strict_slashes=False)
def root():
    """ root route """
    return render_template('1-index.html')
