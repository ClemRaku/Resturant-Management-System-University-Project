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
        
        
        
        #doing the editing bit now
    if request.GET.get("edit_menu_id"):
        edit_id = request.GET.get("edit_menu_id")
        edit_id_int = int(edit_id)
        
        edit_name = request.GET.get("eidit_menu_name")
        
        edit_category = request.GET.get("edit_catagory")
        edit_catagoryID = int(edit_category)
        
        edit_description = request.GET.get("edit_decription")
        
        edit_ingredients = request.GET.get("edit_ingredients")
        
        edit_price = request.GET.get("eidit_price")
        edit_price_float = float(edit_price)
        
        edit_prep = request.GET.get("edit_preparation_time")
        edit_prep_int = int(edit_prep)
        
        
        select_menu_items = "UPDATE menu SET name = %s, description = %s, price = %s, category_id = %s, ingredients = %s, preparation_time = %s WHERE menu_id = %s"
        dt = (
            edit_name, 
            edit_description, 
            edit_price_float, 
            edit_catagoryID, 
            edit_ingredients, 
            edit_prep_int, 
            edit_id_int 
        ) 
        mycursor.execute(select_menu_items, dt)
        mydb.commit()       
        
    selectALL_menu_items = "SELECT menu_id, name, category_id, description, ingredients, preparation_time, price FROM menu"
    mycursor.execute(selectALL_menu_items)
    items_from_menu = mycursor.fetchall()
    
    context = {'menu_items' : items_from_menu}
    
    mycursor.close()

    
    return render (request, 'adminmenu.html', context)


#def signup_signin(request):
    
# Create your views here.


