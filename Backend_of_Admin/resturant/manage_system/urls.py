from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = 'home'),
    path('authin', views.signup_signin, name = 'authentication'),
    path('admin', views.admin_menu, name = 'admin_menu'),
    path('menu_home', views.menu, name = 'menu_home'),
    path('reservation', views.customer_reserver, name = 'customer_reserve'),
    path('staff', views.staff_view, name = 'staff'),
    path('admin_reservation', views.admin_reserve, name = 'admin_reserve' ),
    path('inventory', views.inventory, name = 'admin_inventory'),
    path('order', views.order, name = 'order'),
    path('sales', views.sales, name = 'sales')
]