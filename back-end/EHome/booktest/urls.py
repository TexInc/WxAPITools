# -*- coding: utf-8 -*-

from django.conf.urls import url
from . import views

urlpatters=[
    url(r'^$', views.index)
]