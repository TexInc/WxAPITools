# -*- coding: utf-8 -*-
"""
Created on 2018/5/11 

@author: susmote
"""
from django.conf.urls import  url
from snippets import views

urlpatterns = [
    url(r'^snippets/$', views.snippet_list),
    url(r'^snippets/(?P<pk>[0-9]+)/$', views.snippet_detail)
]