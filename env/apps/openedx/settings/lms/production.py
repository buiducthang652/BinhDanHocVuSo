# -*- coding: utf-8 -*-
import os
from lms.envs.production import *

####### Settings common to LMS and CMS
import json
import os

from xmodule.modulestore.modulestore_settings import update_module_store_settings

# Mongodb connection parameters: simply modify `mongodb_parameters` to affect all connections to MongoDb.
mongodb_parameters = {
    "db": "openedx",
    "host": "mongodb",
    "port": 27017,
    "user": None,
    "password": None,
    # Connection/Authentication
    "connect": False,
    "ssl": False,
    "authsource": "admin",
    "replicaSet": None,
    
}
DOC_STORE_CONFIG = mongodb_parameters
CONTENTSTORE = {
    "ENGINE": "xmodule.contentstore.mongo.MongoContentStore",
    "ADDITIONAL_OPTIONS": {},
    "DOC_STORE_CONFIG": DOC_STORE_CONFIG
}
# Load module store settings from config files
update_module_store_settings(MODULESTORE, doc_store_settings=DOC_STORE_CONFIG)
DATA_DIR = "/openedx/data/modulestore"

for store in MODULESTORE["default"]["OPTIONS"]["stores"]:
   store["OPTIONS"]["fs_root"] = DATA_DIR

# Behave like memcache when it comes to connection errors
DJANGO_REDIS_IGNORE_EXCEPTIONS = True

# Meilisearch connection parameters
MEILISEARCH_ENABLED = True
MEILISEARCH_URL = "http://meilisearch:7700"
MEILISEARCH_PUBLIC_URL = "https://meilisearch.binhdanhocvuso.hnue.edu.vn"
MEILISEARCH_INDEX_PREFIX = "tutor_"
MEILISEARCH_API_KEY = "3185d39afc169a0ea34a8e85dcb28c6b823875383542d35e0807834aff5ad81b"
MEILISEARCH_MASTER_KEY = "A6csHteBS0i9P3ZyqijOdKsR"
SEARCH_ENGINE = "search.meilisearch.MeilisearchEngine"

# Common cache config
CACHES = {
    "default": {
        "KEY_PREFIX": "default",
        "VERSION": "1",
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    },
    "general": {
        "KEY_PREFIX": "general",
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    },
    "mongo_metadata_inheritance": {
        "KEY_PREFIX": "mongo_metadata_inheritance",
        "TIMEOUT": 300,
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    },
    "configuration": {
        "KEY_PREFIX": "configuration",
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    },
    "celery": {
        "KEY_PREFIX": "celery",
        "TIMEOUT": 7200,
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    },
    "course_structure_cache": {
        "KEY_PREFIX": "course_structure",
        "TIMEOUT": 604800, # 1 week
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    },
    "ora2-storage": {
        "KEY_PREFIX": "ora2-storage",
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    }
}

# The default Django contrib site is the one associated to the LMS domain name. 1 is
# usually "example.com", so it's the next available integer.
SITE_ID = 2

# Contact addresses
CONTACT_MAILING_ADDRESS = "Bình dân học vụ số - HNUE - https://binhdanhocvuso.hnue.edu.vn"
DEFAULT_FROM_EMAIL = ENV_TOKENS.get("DEFAULT_FROM_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
DEFAULT_FEEDBACK_EMAIL = ENV_TOKENS.get("DEFAULT_FEEDBACK_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
SERVER_EMAIL = ENV_TOKENS.get("SERVER_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
TECH_SUPPORT_EMAIL = ENV_TOKENS.get("TECH_SUPPORT_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
CONTACT_EMAIL = ENV_TOKENS.get("CONTACT_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
BUGS_EMAIL = ENV_TOKENS.get("BUGS_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
UNIVERSITY_EMAIL = ENV_TOKENS.get("UNIVERSITY_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
PRESS_EMAIL = ENV_TOKENS.get("PRESS_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
PAYMENT_SUPPORT_EMAIL = ENV_TOKENS.get("PAYMENT_SUPPORT_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
BULK_EMAIL_DEFAULT_FROM_EMAIL = ENV_TOKENS.get("BULK_EMAIL_DEFAULT_FROM_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
API_ACCESS_MANAGER_EMAIL = ENV_TOKENS.get("API_ACCESS_MANAGER_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
API_ACCESS_FROM_EMAIL = ENV_TOKENS.get("API_ACCESS_FROM_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])

# Get rid completely of coursewarehistoryextended, as we do not use the CSMH database
INSTALLED_APPS.remove("lms.djangoapps.coursewarehistoryextended")
DATABASE_ROUTERS.remove(
    "openedx.core.lib.django_courseware_routers.StudentModuleHistoryExtendedRouter"
)

# Set uploaded media file path
MEDIA_ROOT = "/openedx/media/"

# Video settings
VIDEO_IMAGE_SETTINGS["STORAGE_KWARGS"]["location"] = MEDIA_ROOT
VIDEO_TRANSCRIPTS_SETTINGS["STORAGE_KWARGS"]["location"] = MEDIA_ROOT

GRADES_DOWNLOAD = {
    "STORAGE_TYPE": "",
    "STORAGE_KWARGS": {
        "base_url": "/media/grades/",
        "location": "/openedx/media/grades",
    },
}

# ORA2
ORA2_FILEUPLOAD_BACKEND = "filesystem"
ORA2_FILEUPLOAD_ROOT = "/openedx/data/ora2"
FILE_UPLOAD_STORAGE_BUCKET_NAME = "openedxuploads"
ORA2_FILEUPLOAD_CACHE_NAME = "ora2-storage"

# Change syslog-based loggers which don't work inside docker containers
LOGGING["handlers"]["local"] = {
    "class": "logging.handlers.WatchedFileHandler",
    "filename": os.path.join(LOG_DIR, "all.log"),
    "formatter": "standard",
}
LOGGING["handlers"]["tracking"] = {
    "level": "DEBUG",
    "class": "logging.handlers.WatchedFileHandler",
    "filename": os.path.join(LOG_DIR, "tracking.log"),
    "formatter": "standard",
}
LOGGING["loggers"]["tracking"]["handlers"] = ["console", "local", "tracking"]

# Silence some loggers (note: we must attempt to get rid of these when upgrading from one release to the next)
LOGGING["loggers"]["blockstore.apps.bundles.storage"] = {"handlers": ["console"], "level": "WARNING"}

# These warnings are visible in simple commands and init tasks
import warnings

# REMOVE-AFTER-V20: check if we can remove these lines after upgrade.
from django.utils.deprecation import RemovedInDjango50Warning, RemovedInDjango51Warning
# RemovedInDjango5xWarning: 'xxx' is deprecated. Use 'yyy' in 'zzz' instead.
warnings.filterwarnings("ignore", category=RemovedInDjango50Warning)
warnings.filterwarnings("ignore", category=RemovedInDjango51Warning)
# DeprecationWarning: 'imghdr' is deprecated and slated for removal in Python 3.13
warnings.filterwarnings("ignore", category=DeprecationWarning, module="pgpy.constants")

# Email
EMAIL_USE_SSL = False
# Forward all emails from edX's Automated Communication Engine (ACE) to django.
ACE_ENABLED_CHANNELS = ["django_email"]
ACE_CHANNEL_DEFAULT_EMAIL = "django_email"
ACE_CHANNEL_TRANSACTIONAL_EMAIL = "django_email"
EMAIL_FILE_PATH = "/tmp/openedx/emails"

# Language/locales
LANGUAGE_COOKIE_NAME = "openedx-language-preference"

# Allow the platform to include itself in an iframe
X_FRAME_OPTIONS = "SAMEORIGIN"


JWT_AUTH["JWT_ISSUER"] = "https://binhdanhocvuso.hnue.edu.vn/oauth2"
JWT_AUTH["JWT_AUDIENCE"] = "openedx"
JWT_AUTH["JWT_SECRET_KEY"] = "1Pq03tl8MqAS3bOUBAdlgApM"
JWT_AUTH["JWT_PRIVATE_SIGNING_JWK"] = json.dumps(
    {
        "kid": "openedx",
        "kty": "RSA",
        "e": "AQAB",
        "d": "Dv3w3V7EWIw-crIUsuY9GNQS9En__TXR1ksBx2tv5bF_3pqmiHDtR5F-r1lEzevT9PpSLU4rKg9q7vyi8habfqJ0aVygYIM-2cfbnQtEvMPufmiHyGm_GJ4VA0IuoSbUnFppUtc1nrZazQo7lrO_tNr7TOEbbOcATuDNrEfHrbvd0ad6pe-UsBdOLGvCb5CZlEhE2Rg7THE53h3Ir1spCzBhzsDImqFpP33KFwaFIKnQVqfugiRy2XZLVutU5VPI5iJ7UeelETDiIc_980mt2qRyS-pYfAyWEIa83Oa8wYZNJe2bMhvyEvg8r-bLl4LO28pN7rb07FaYnLc3PoAvuQ",
        "n": "1_O5y-eCCUoBNNJ1yyJAkejVfyytbRrMu7KGTgavebahsEVifHXAMXIjL6QuX-LY0DPxZ-bucY0THH0wnPWUzBOyLDMhwPzwmTK7j1jgDnEjmAUv80HYxjzxvdAjhe1HJUrGRTXGWajmUoRnMJAtuQB5FBFnUgwGWfLkiE3CKd9KxeDzQzJtBAwu7WrIspRgQ9IAheqlkwjkQUDkFYF9sTUPzO_Ff83IMRP9CbFkVOvqwOHkP0FFZBL3aANwZSNYaOM2dWA4UK1hjvFdCSTiw03WqzAYIm1U8Frvy3WnOAWRfgF4zGvVFhJfrA_z4FYCGVPEBo_624uBXnjpkf-5_Q",
        "p": "6c5zhHxTET3EgMimk9usSzq6QtU-t0zuzC9xzb5F2lKO2pXNPsrh10mC-FoUL-IBe9WhIAn3mVoz01BK3CFgKCpdW1l5Inb-QB1k-wRWEnLIYrxz6Uy7zxB3OcjQhIS2YgPEHeqIVPjBZrq0ZsRzfFFjEU-sxWg9W8BPQWc33bU",
        "q": "7HNoog4F6ItiEY3rOLCH1GQ9TkobVL1xRq5yf1ANt0vx2EFFlqYty0uw8fWlYhIrEddcjZGjXJ96IAPu_-TqIF4RMG4Re-ZDNO3SHF9ySfzOtzis_xzBJQh0drAxx5qQEMHIXoqqyYiOs8-rObRKCGKGL8CV8lmFGCNwvPzbWCk",
        "dq": "LjEhmL8KknJgVzOVZz69WlW20EuT6UsVDQzZW1vFQjC471lZAeQ3AAcqayplA7Ku7U5YS2PPOTIChqyeDSmoP2iBDSgDjGPgbz-ik15mEmQr8glFapUwek6bifBD2U2tpUhmH2oRkUt3LVN9jMlWySqOMlf6Mx0f7iZGSPVQ2Hk",
        "dp": "CIpsGdjYx_ZzqSirPRd3McBRcYOMqPF8f6T0CUn8Dz-YzE9QkgyjN1QOHrhbqGwfFcD2A8-ZZdavsfZq5aOqeY0in-Wi0Sl7nCf2ulysMDxVKZYsvcb5zVSSpl-5jj2y093DWjxpAoGbvv7u_BoNBeuLLOS2MPff1ewuePsmRUk",
        "qi": "iLmL9rMGwpIuj98l3PVkJiSbeclO2dpAL1rxdv6frem8Ew29tGQHsxET74CDJshuYP986KQebcdpclV6AeZSW3AGoFp_KxvLLaYqkMfHUK3mOm1OAwizuHPPwRDQMOEf9Vt39V2qR3p0HOzzcaSx31_J_f2YBcfWF_xhCuqm6iY",
    }
)
JWT_AUTH["JWT_PUBLIC_SIGNING_JWK_SET"] = json.dumps(
    {
        "keys": [
            {
                "kid": "openedx",
                "kty": "RSA",
                "e": "AQAB",
                "n": "1_O5y-eCCUoBNNJ1yyJAkejVfyytbRrMu7KGTgavebahsEVifHXAMXIjL6QuX-LY0DPxZ-bucY0THH0wnPWUzBOyLDMhwPzwmTK7j1jgDnEjmAUv80HYxjzxvdAjhe1HJUrGRTXGWajmUoRnMJAtuQB5FBFnUgwGWfLkiE3CKd9KxeDzQzJtBAwu7WrIspRgQ9IAheqlkwjkQUDkFYF9sTUPzO_Ff83IMRP9CbFkVOvqwOHkP0FFZBL3aANwZSNYaOM2dWA4UK1hjvFdCSTiw03WqzAYIm1U8Frvy3WnOAWRfgF4zGvVFhJfrA_z4FYCGVPEBo_624uBXnjpkf-5_Q",
            }
        ]
    }
)
JWT_AUTH["JWT_ISSUERS"] = [
    {
        "ISSUER": "https://binhdanhocvuso.hnue.edu.vn/oauth2",
        "AUDIENCE": "openedx",
        "SECRET_KEY": "1Pq03tl8MqAS3bOUBAdlgApM"
    }
]

# Enable/Disable some features globally
FEATURES["ENABLE_DISCUSSION_SERVICE"] = False
FEATURES["PREVENT_CONCURRENT_LOGINS"] = False
FEATURES["ENABLE_CORS_HEADERS"] = True

# CORS
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOW_INSECURE = False
# Note: CORS_ALLOW_HEADERS is intentionally not defined here, because it should
# be consistent across deployments, and is therefore set in edx-platform.

# Add your MFE and third-party app domains here
CORS_ORIGIN_WHITELIST = []

# Disable codejail support
# explicitely configuring python is necessary to prevent unsafe calls
import codejail.jail_code
codejail.jail_code.configure("python", "nonexistingpythonbinary", user=None)
# another configuration entry is required to override prod/dev settings
CODE_JAIL = {
    "python_bin": "nonexistingpythonbinary",
    "user": None,
}

OPENEDX_LEARNING = {
    'MEDIA': {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
        "OPTIONS": {
            "location": "/openedx/media-private/openedx-learning",
        }
    }
}


######## End of settings common to LMS and CMS

######## Common LMS settings
LOGIN_REDIRECT_WHITELIST = ["studio.binhdanhocvuso.hnue.edu.vn"]

# Better layout of honor code/tos links during registration
REGISTRATION_EXTRA_FIELDS["terms_of_service"] = "hidden"
REGISTRATION_EXTRA_FIELDS["honor_code"] = "hidden"

# Fix media files paths
PROFILE_IMAGE_BACKEND["options"]["location"] = os.path.join(
    MEDIA_ROOT, "profile-images/"
)

COURSE_CATALOG_VISIBILITY_PERMISSION = "see_in_catalog"
COURSE_ABOUT_VISIBILITY_PERMISSION = "see_about_page"

# Allow insecure oauth2 for local interaction with local containers
OAUTH_ENFORCE_SECURE = False

# Email settings
DEFAULT_EMAIL_LOGO_URL = LMS_ROOT_URL + "/theming/asset/images/logo.png"
BULK_EMAIL_SEND_USING_EDX_ACE = True
FEATURES["ENABLE_FOOTER_MOBILE_APP_LINKS"] = False

# Branding
MOBILE_STORE_ACE_URLS = {}
SOCIAL_MEDIA_FOOTER_ACE_URLS = {}

# Make it possible to hide courses by default from the studio
SEARCH_SKIP_SHOW_IN_CATALOG_FILTERING = False

# Caching
CACHES["staticfiles"] = {
    "KEY_PREFIX": "staticfiles_lms",
    "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
    "LOCATION": "staticfiles_lms",
}

# Enable search features
FEATURES["ENABLE_COURSE_DISCOVERY"] = True
FEATURES["ENABLE_COURSEWARE_SEARCH"] = True
FEATURES["ENABLE_DASHBOARD_SEARCH"] = True

# Create folders if necessary
for folder in [DATA_DIR, LOG_DIR, MEDIA_ROOT, STATIC_ROOT, ORA2_FILEUPLOAD_ROOT]:
    if not os.path.exists(folder):
        os.makedirs(folder, exist_ok=True)

# MFE: enable API and set a low cache timeout for the settings. otherwise, weird
# configuration bugs occur. Also, the view is not costly at all, and it's also cached on
# the frontend. (5 minutes, hardcoded)
ENABLE_MFE_CONFIG_API = True
MFE_CONFIG_API_CACHE_TIMEOUT = 1

# MFE-specific settings

FEATURES['ENABLE_AUTHN_MICROFRONTEND'] = True


FEATURES['ENABLE_NEW_BULK_EMAIL_EXPERIENCE'] = True


LEARNER_HOME_MFE_REDIRECT_PERCENTAGE = 100


######## End of common LMS settings

ALLOWED_HOSTS = [
    ENV_TOKENS.get("LMS_BASE"),
    FEATURES["PREVIEW_LMS_BASE"],
    "lms",
]
CORS_ORIGIN_WHITELIST.append("https://binhdanhocvuso.hnue.edu.vn")


# Properly set the "secure" attribute on session/csrf cookies. This is required in
# Chrome to support samesite=none cookies.
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SAMESITE = "None"


# CMS authentication
IDA_LOGOUT_URI_LIST.append("https://studio.binhdanhocvuso.hnue.edu.vn/logout/")

# Required to display all courses on start page
SEARCH_SKIP_ENROLLMENT_START_DATE_FILTERING = True

# Dynamic config API settings
# https://openedx.github.io/frontend-platform/module-Config.html
MFE_CONFIG = {
    "BASE_URL": "apps.binhdanhocvuso.hnue.edu.vn",
    "CSRF_TOKEN_API_PATH": "/csrf/api/v1/token",
    "CREDENTIALS_BASE_URL": "",
    "DISCOVERY_API_BASE_URL": "",
    "FAVICON_URL": "https://binhdanhocvuso.hnue.edu.vn/favicon.ico",
    "INFO_EMAIL": "support@hnue.edu.vn",
    "LANGUAGE_PREFERENCE_COOKIE_NAME": "openedx-language-preference",
    "LMS_BASE_URL": "https://binhdanhocvuso.hnue.edu.vn",
    "LOGIN_URL": "https://binhdanhocvuso.hnue.edu.vn/login",
    "LOGO_URL": "https://binhdanhocvuso.hnue.edu.vn/theming/asset/images/logo.png",
    "LOGO_WHITE_URL": "https://binhdanhocvuso.hnue.edu.vn/theming/asset/images/logo.png",
    "LOGO_TRADEMARK_URL": "https://binhdanhocvuso.hnue.edu.vn/theming/asset/images/logo.png",
    "LOGOUT_URL": "https://binhdanhocvuso.hnue.edu.vn/logout",
    "MARKETING_SITE_BASE_URL": "https://binhdanhocvuso.hnue.edu.vn",
    "PASSWORD_RESET_SUPPORT_LINK": "mailto:support@hnue.edu.vn",
    "REFRESH_ACCESS_TOKEN_ENDPOINT": "https://binhdanhocvuso.hnue.edu.vn/login_refresh",
    "SITE_NAME": "Bình dân học vụ số - HNUE",
    "STUDIO_BASE_URL": "https://studio.binhdanhocvuso.hnue.edu.vn",
    "USER_INFO_COOKIE_NAME": "user-info",
    "ACCESS_TOKEN_COOKIE_NAME": "edx-jwt-cookie-header-payload",
}

# MFE-specific settings


AUTHN_MICROFRONTEND_URL = "https://apps.binhdanhocvuso.hnue.edu.vn/authn"
AUTHN_MICROFRONTEND_DOMAIN  = "apps.binhdanhocvuso.hnue.edu.vn/authn"
MFE_CONFIG["DISABLE_ENTERPRISE_LOGIN"] = True



ACCOUNT_MICROFRONTEND_URL = "https://apps.binhdanhocvuso.hnue.edu.vn/account/"
MFE_CONFIG["ACCOUNT_SETTINGS_URL"] = ACCOUNT_MICROFRONTEND_URL



MFE_CONFIG["COURSE_AUTHORING_MICROFRONTEND_URL"] = "https://apps.binhdanhocvuso.hnue.edu.vn/authoring"
MFE_CONFIG["ENABLE_ASSETS_PAGE"] = "true"
MFE_CONFIG["ENABLE_HOME_PAGE_COURSE_API_V2"] = "true"
MFE_CONFIG["ENABLE_PROGRESS_GRAPH_SETTINGS"] = "true"
MFE_CONFIG["ENABLE_TAGGING_TAXONOMY_PAGES"] = "true"
MFE_CONFIG["ENABLE_UNIT_PAGE"] = "true"
MFE_CONFIG["MEILISEARCH_ENABLED"] = "true"



DISCUSSIONS_MICROFRONTEND_URL = "https://apps.binhdanhocvuso.hnue.edu.vn/discussions"
MFE_CONFIG["DISCUSSIONS_MFE_BASE_URL"] = DISCUSSIONS_MICROFRONTEND_URL
DISCUSSIONS_MFE_FEEDBACK_URL = None



WRITABLE_GRADEBOOK_URL = "https://apps.binhdanhocvuso.hnue.edu.vn/gradebook"



LEARNER_HOME_MICROFRONTEND_URL = "https://apps.binhdanhocvuso.hnue.edu.vn/learner-dashboard/"



LEARNING_MICROFRONTEND_URL = "https://apps.binhdanhocvuso.hnue.edu.vn/learning"
MFE_CONFIG["LEARNING_BASE_URL"] = "https://apps.binhdanhocvuso.hnue.edu.vn/learning"



ORA_GRADING_MICROFRONTEND_URL = "https://apps.binhdanhocvuso.hnue.edu.vn/ora-grading"



PROFILE_MICROFRONTEND_URL = "https://apps.binhdanhocvuso.hnue.edu.vn/profile/u/"
MFE_CONFIG["ACCOUNT_PROFILE_URL"] = "https://apps.binhdanhocvuso.hnue.edu.vn/profile"



COMMUNICATIONS_MICROFRONTEND_URL = "https://apps.binhdanhocvuso.hnue.edu.vn/communications"
MFE_CONFIG["SCHEDULE_EMAIL_SECTION"] = True


LOGIN_REDIRECT_WHITELIST.append("apps.binhdanhocvuso.hnue.edu.vn")
CORS_ORIGIN_WHITELIST.append("https://apps.binhdanhocvuso.hnue.edu.vn")
CSRF_TRUSTED_ORIGINS.append("https://apps.binhdanhocvuso.hnue.edu.vn")




MFE_CONFIG['INDIGO_ENABLE_DARK_TOGGLE'] = True