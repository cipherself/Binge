from django.conf.urls import url, include
from django.views.defaults import page_not_found

from accounts import views


urlpatterns = [
    url('^', include('django.contrib.auth.urls')),
    url(r'^profile/.+', page_not_found),    
    url(r'^profile/', views.profile, name='profile'),
    url(r'^signup', views.signup, name='signup'),
]
