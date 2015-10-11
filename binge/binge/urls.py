from django.conf.urls import include, url


urlpatterns = [
    url('', include('accounts.urls')),
    url('', include('core.urls')),
]
