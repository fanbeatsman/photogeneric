from django.conf.urls import patterns, url
from photoapp import views

urlpatterns = patterns('',
      url(r'^$', views.index, name='index'),
      url(r'^register/$', views.register, name='register'),
      url(r'^login/$', views.user_login, name='login'),
      url(r'^logout/$', views.user_logout, name='logout'),
      url(r'^upload_picture/$', views.upload_picture, name='upload_picture'),
      url(r'^test/$', views.test, name='test page'),
)
