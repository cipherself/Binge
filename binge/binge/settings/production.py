from __future__ import absolute_import

from .base import *  # noqa

import os

from django.core.exceptions import ImproperlyConfigured


TEMPLATE_DEBUG = False


def get_env_setting(setting):
    """ Get the environment setting or return exception """
    try:
        return os.environ[setting]
    except KeyError:
        error_msg = "Set the %s env variable" % setting
    raise ImproperlyConfigured(error_msg)


SECRET_KEY = get_env_setting('DJANGO_SECRET')


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

EMAIL_HOST = get_env_setting('EMAIL_HOST')
EMAIL_PORT = get_env_setting('EMAIL_PORT')
EMAIL_HOST_USER = get_env_setting('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = get_env_setting('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = True

#################### LOGGING ####################
# See: https://docs.djangoproject.com/en/dev/topics/logging/

# Send an email to the site admins on every HTTP 500 error when DEBUG=False.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}
#################### END LOGGING ####################
