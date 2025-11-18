from django.shortcuts import render, redirect
import mysql.connector

mydb = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    passwd = 'raka',
    database = 'resturant'
)


def admin_menu(request):
    mycursor = mydb.cursor()
    
    if request.GET.get("new_menu_id"):
        IDmenu_str = request.GET.get("new_menu_id")
        IDmenu = int(IDmenu_str)
        menu_name = request.GET.get("new_menu_name")
        categoryID = request.GET.get("new_catagory")
        ingredients = request.GET.get("new_ingredients")
        prep_time_str = request.GET.get("new_preparation_time")
        prep_time_int = int(prep_time_str)
        price_str = request.GET.get("new_price")
        price = float(price_str)
        description = request.GET.get("new_description")
        
        
        sql = "INSERT INTO menu (menu_id, name, description, price, category_id, ingredients, preparation_time) values (%s, %s, %s, %s, %s, %s, %s)"
        data = (IDmenu, menu_name, description, price, categoryID, ingredients, prep_time_int)
        mycursor.execute(sql, data)
        mydb.commit()
        
        
        selectALL_menu_items
        
    mycursor.close()
    
    return render (request, 'adminmenu.html')
# Create your views here.
