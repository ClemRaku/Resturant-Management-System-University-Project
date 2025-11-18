from django.urls import path
from . import views

urlspatterns = [
    path('admin_menu/', views.admin_menu, name = 'admin_menu')
]