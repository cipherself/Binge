from django.conf.urls import url

from core import views


urlpatterns = [
    url(r'^$', views.homepage, name='homepage'),
    url(r'^add_element$', views.add_element, name='add_element'),
]
