"""
Django settings for binge project.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.8/ref/settings/
"""

from __future__ import absolute_import

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

from sys import path


###############################----PATHS----###################################
# binge_project/binge
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# binge_project
PROJECT_DIR = os.path.dirname(BASE_DIR)

SITE_NAME = os.path.basename(BASE_DIR)

# See: https://docs.djangoproject.com/en/1.8/ref/settings/#site-id
SITE_ID = 1

# Add our project to our pythonpath, this way we don't need to type our project
# name in our dotted import paths:
path.append(BASE_DIR)
###############################################################################


ADMINS = (
    ('Mohammed Attia', 'skeuomorf@gmail.com'),
)

MANAGERS = ADMINS

INTERNAL_IPS = (
    ('127.0.0.1'),
)


############################----DEBUG----################################
# See: https://docs.djangoproject.com/en/1.8/ref/settings/#debug
DEBUG = False

# See: https://docs.djangoproject.com/en/1.8/ref/settings/#template-debug
TEMPLATE_DEBUG = DEBUG
#########################################################################


# Application definition

DJANGO_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

# Apps specific for this project go here.
LOCAL_APPS = (
    'core',
    'accounts',
    'rest_framework'
)

# See: https://docs.djangoproject.com/en/1.8/ref/settings/#installed-apps
INSTALLED_APPS = LOCAL_APPS + DJANGO_APPS


MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)


# See: https://docs.djangoproject.com/en/dev/ref/settings/#root-urlconf
ROOT_URLCONF = '%s.urls' % SITE_NAME

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

#########################----WSGI----######################################
# See: https://docs.djangoproject.com/en/1.8/ref/settings/#wsgi-application
WSGI_APPLICATION = '%s.wsgi.application' % SITE_NAME
###########################################################################


#########################----INTERNATIOLIZATION----############################
# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Africa/Cairo'

USE_I18N = True

USE_L10N = True

USE_TZ = True
###########################################################################


#################### STATIC FILE CONFIGURATION ####################
# https://docs.djangoproject.com/en/1.8/howto/static-files/

# See: https://docs.djangoproject.com/en/1.8/ref/settings/#static-root
STATIC_ROOT = os.path.normpath(os.path.join(PROJECT_DIR, 'static'))

# See: https://docs.djangoproject.com/en/1.8/ref/settings/#static-url
STATIC_URL = '/static/'

# See: https://docs.djangoproject.com/en/1.8/ref/contrib/staticfiles/#std:setting-STATICFILES_DIRS # noqa
#STATICFILES_DIRS = (
    #os.path.normpath(os.path.join(PROJECT_DIR, 'assets')),
#)

# See: https://docs.djangoproject.com/en/1.8/ref/contrib/staticfiles/#staticfiles-finders # noqa
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
#################### END STATIC FILE CONFIGURATION ####################


#################### LOGGING ####################
# See: https://docs.djangoproject.com/en/1.8/topics/logging/
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'standard': {
            'format': "[%(asctime)s] %(levelname)s [%(name)s.%(funcName)s:%(lineno)d] %(message)s",  # noqa
            'datefmt': "%d/%b/%Y %H:%M:%S"
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'standard'
        },
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
            'include_html': True,
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', ],
            'propagate': True,
            'level': 'ERROR',
        },
        'django.request': {

            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': False,
        },
        '': {
            'handlers': ['console', ],
            'level': os.environ.get('DEBUG_LEVEL', 'ERROR'),
        },
    }
}
##################### END LOGGING ####################
