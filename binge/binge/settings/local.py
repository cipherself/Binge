from __future__ import absolute_import

from .base import *  # noqa

import os


#################### DEBUG CONFIGURATION ####################
# See: https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = True

# See: https://docs.djangoproject.com/en/dev/ref/settings/#template-debug
TEMPLATE_DEBUG = DEBUG
#################### END DEBUG CONFIGURATION ####################


SECRET_KEY = os.getenv('DJANGO_SECRET')


#################### DATABASE CONFIGURATION ####################
# See: https://docs.djangoproject.com/en/dev/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['DJANGO_DB_NAME'],
        'USER': os.environ['DJANGO_DB_USER'],
        'PASSWORD': os.environ['DJANGO_DB_PASSWORD'],
        'HOST': os.environ['DJANGO_DB_HOST'],
        'PORT': os.environ['DJANGO_DB_PORT']
    }
}
#################### END DATABASE CONFIGURATION ####################


#################### TOOLBAR CONFIGURATION ####################
# See: http://django-debug-toolbar.readthedocs.org/en/latest/installation.html#explicit-setup # noqa
INSTALLED_APPS += (
    'debug_toolbar',
)

# Load as final middleware
# See: http://django-debug-toolbar.readthedocs.org/en/1.2.2/panels.html#profiling-panel # noqa
MIDDLEWARE_CLASSES += (
    'debug_toolbar.middleware.DebugToolbarMiddleware',
)
###############################################################
