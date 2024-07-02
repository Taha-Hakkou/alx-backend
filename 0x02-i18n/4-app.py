#!/usr/bin/env python3
""" Basic Flask App """
from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """ Flask configuration class """
    LANGUAGES = ['en', 'fr']


app = Flask(__name__)
app.config.from_object(Config)
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
babel = Babel(app)


@babel.localeselector
def get_locale():
    """ determines the best match with supported languages """
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])

@app.route('/', strict_slashes=False)
def root():
    """ root route """
    return render_template('4-index.html')
