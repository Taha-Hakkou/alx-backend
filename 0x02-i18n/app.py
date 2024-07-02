#!/usr/bin/env python3
""" Basic Flask App """
from flask import Flask, render_template, request, g
from flask_babel import Babel, format_datetime
import pytz
from datetime import datetime


class Config:
    """ Flask configuration class """
    LANGUAGES = ['en', 'fr']


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}

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
    if g.user and g.user.get('locale') in app.config['LANGUAGES']:
        return g.user.get('locale')
    locale = request.headers.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])

@app.route('/', strict_slashes=False)
def root():
    """ root route """
    timezone = pytz.timezone(get_timezone())
    return render_template('index.html', user=g.user,
                           current_time=format_datetime(datetime.now(timezone)))

def get_user():
    """ returns user dictionary """
    user_id = request.args.get('login_as')
    if user_id and user_id.isdigit():
        return users.get(int(user_id))
    return None

@app.before_request
def before_request():
    """ sets user if any as global """
    g.user = get_user()

@babel.timezoneselector
def get_timezone():
    """ returns timezone """
    timezone = request.args.get('timezone', '').strip()
    if not timezone and g.user:
        timezone = g.user['timezone']
    try:
        return pytz.timezone(timezone).zone
    except pytz.exceptions.UnknownTimeZoneError:
        return app.config['BABEL_DEFAULT_TIMEZONE']
