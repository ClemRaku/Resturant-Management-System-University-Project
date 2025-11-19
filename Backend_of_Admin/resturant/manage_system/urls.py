from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = 'home'),
    path('authin', views.signup_signin, name = 'authentication'),
    path('admin', views.admin_menu, name = 'admin_menu'),
    path('menu_home', views.menu, name = 'menu_home')
]