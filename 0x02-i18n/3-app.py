#!/usr/bin/env python3
""" Basic Flask App """
from flask import Flask, render_template, request
from flask_babel import Babel
from typing import Any


class Config:
    """ Flask configuration class """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """ determines the best match with supported languages """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/', strict_slashes=False)
def root() -> Any:
    """ root route """
    return render_template('3-index.html')
