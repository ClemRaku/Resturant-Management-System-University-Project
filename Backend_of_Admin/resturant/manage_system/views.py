from django.shortcuts import render, redirect
import mysql.connector
from datetime import datetime

mydb = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    passwd = 'raka',
    database = 'resturant'
)


def admin_menu(request):
    mycursor = mydb.cursor()
    #adding to menu
    if request.POST.get("new_menu_name") and request.method == 'POST':

        menu_name = request.POST.get("new_menu_name")
        categoryID = request.POST.get("new_catagory")
        ingredients = request.POST.get("new_ingredients")
        prep_time_str = request.POST.get("new_preparation_time")
        prep_time_int = int(prep_time_str)
        price_str = request.POST.get("new_price")
        price = float(price_str)
        description = request.POST.get("new_description")
        image = request.FILES.get('menu_item_img')
        image_url = ''
        if image:
            image_url = image.name

        sql = "INSERT INTO menu (name, description, price, category_id, ingredients, preparation_time, image_url) values (%s, %s, %s, %s, %s, %s, %s)"
        data = (menu_name, description, price, categoryID, ingredients, prep_time_int, image_url)
        mycursor.execute(sql, data)
        mydb.commit()

        return redirect('admin_menu')
        
        
        
        #doing the editing bit now
    if request.POST.get("edit_menu_id"):
        edit_id = request.POST.get("edit_menu_id")
        edit_id_int = int(edit_id)

        edit_name = request.POST.get("eidit_menu_name")

        edit_category = int(request.POST.get("edit_catagory"))

        edit_description = request.POST.get("edit_decription")

        edit_ingredients = request.POST.get("edit_ingredients")

        edit_price = float(request.POST.get("eidit_price"))
        edit_prep = int(request.POST.get("edit_preparation_time"))
        # Handle image
        image = request.FILES.get('menu_item_img')
        if image:
            image_url = image.name
        else:
            # Keep existing image_url
            select_existing = "SELECT image_url FROM menu WHERE menu_id = %s"
            mycursor.execute(select_existing, (edit_id_int,))
            existing = mycursor.fetchone()
            if existing and existing[0]:
                image_url = existing[0]
            else:
                image_url = ''

        select_menu_items = "UPDATE menu SET name = %s, description = %s, price = %s, category_id = %s, ingredients = %s, preparation_time = %s, image_url = %s WHERE menu_id = %s"
        dt = (
            edit_name,
            edit_description,
            edit_price,
            edit_category,
            edit_ingredients,
            edit_prep,
            image_url,
            edit_id_int
        )
        mycursor.execute(select_menu_items, dt)
        mydb.commit()
        
    if request.GET.get("delete_menu_id"):
        delete_id = int(request.GET.get("delete_menu_id"))
        
        sql_delete = "DELETE FROM menu WHERE menu_id = %s"
        mycursor.execute(sql_delete, (delete_id,))
        mydb.commit()    
    
    
    search_term = request.GET.get('search_query', '').strip()

    query = "SELECT menu_id, name, category_id, description, ingredients, preparation_time, price, image_url FROM menu"
    params = []

    if search_term:
        try:
            # Try to search by exact ID
            id_search = int(search_term)
            query += " WHERE menu_id = %s"
            params.append(id_search)
        except ValueError:
            # If not an integer, search in name
            query += " WHERE name LIKE %s"
            params.append('%' + search_term + '%')

    mycursor.execute(query, params)
    items_from_menu = mycursor.fetchall()

    context = {'menu_items' : items_from_menu, 'search_query' : search_term}
    
    mycursor.close()

    
    return render (request, 'adminmenu.html', context)


def signup_signin(request):
    mycursor = mydb.cursor()
    context = {}
    
    #sign UP part
    if request.GET.get('signup_email'):
        name = request.GET.get('Full_name')
        email = request.GET.get('signup_email') 
        p1 = request.GET.get('signup_password')
        p2 = request.GET.get('confrim_password')
        phone_no = int(request.GET.get('phone_number'))
        addres = request.GET.get('address')
        if p1 and p2 and p1 == p2:
            passwd = p1
            insert_into_acc = "INSERT INTO accounts (email, password, phone_no) VALUES(%s, %s, %s)"
            dtt = (email, passwd, phone_no)
            mycursor.execute(insert_into_acc, dtt)
            mydb.commit()
            
            insert_into_customer = "INSERT INTO customer (email, name, phone_no, address, has_account) VALUES(%s, %s, %s, %s, %s)"
            has_account_ = 1
            dttt = (email, name, phone_no, addres, has_account_)
            mycursor.execute(insert_into_customer, dttt)
            mydb.commit()
        else:
            mismatch_passwd = 'Passwords Miss Match '
            context['missmatchh_passwd'] = mismatch_passwd
        
    
    #sign in part    
    if request.GET.get('signin_email'):
        mail = request.GET.get('signin_email')
        passw = request.GET.get('signin_password')
        
        mycursor.execute("select email, password from accounts")
        e_and_p = mycursor.fetchall()
        access = False
        #[(email1, pass1),
        #(email2, pass2)]
        for x in e_and_p:
            if x[0] == mail and x[1] == passw:
                access = True
        if access:
            return redirect('admin_menu')
        else:
            wrong_mail_or_pass = 'Password or email is wrong Buddy'
            context = {'error' : wrong_mail_or_pass }
            return render(request, 'auth.html', context)
        
        
        
    return render(request, 'auth.html', context)

def home(request):
    mycursor = mydb.cursor()
    ndtk = "SELECT name, description, price, image_url FROM menu;"
    mycursor.execute(ndtk)
    name_description_price_img = mycursor.fetchall()

    return render(request, 'home.html', {'home_menu' : name_description_price_img})
def menu(request):
    
    return render(request, 'menu.html')


def customer_reserver(request):
    mycursor = mydb.cursor()
    if(request.GET.get('full_name')):
        
        name = request.GET.get('full_name')
        email = request.GET.get('email')
        phone_no = int(request.GET.get('phone'))
        date = request.GET.get('date')
        time = request.GET.get('time')
        no_of_guest = int(request.GET.get('no_of_guest'))
        special_request = request.GET.get('special_req')
        statuss = 1
        datetime_string = f"{date} {time}"
        reserve_datetime = datetime.strptime(datetime_string, '%Y-%m-%d %H:%M')
        
    

        old_customer = "select customer_id from customer where email = %s"
        mycursor.execute(old_customer, (email,))
        old_customer_id_ = mycursor.fetchone()
    
        if old_customer_id_:
            customer_id = old_customer_id_[0]
            sql_insert = "INSERT into reservation (name, phone_no, no_of_customer, special_resquests, reserve_date, status, email, customer_id) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
            vv = (name, phone_no, no_of_guest, special_request, reserve_datetime, statuss, email, customer_id)
            mycursor.execute(sql_insert, vv)
            mydb.commit()
            
        else:
            sql_insert = "INSERT into reservation (name, phone_no, no_of_customer, special_resquests, reserve_date, status, email) VALUES(%s, %s, %s, %s, %s, %s, %s)"
            vv = (name, phone_no, no_of_guest, special_request, reserve_datetime, statuss, email)
            mycursor.execute(sql_insert, vv)
            mydb.commit()
            
     
    
    
    
    
    #check with email for customer id.
    return render(request, 'reserve.html')


def staff_view(request):
    mycursor = mydb.cursor()
    fetch_employees = ("select employee_id, name, tenure, address, job_position, employement_date, email, phone_no, availability from employees")
    mycursor.execute(fetch_employees)
    all_employees = mycursor.fetchall()
    
 

    if request.GET.get('delete_staff_id'):
            staff_id_to_delete = request.GET.get('delete_staff_id')
            
            # 1. SQL to delete the employee record from the 'employees' table
            delete = "DELETE FROM employees WHERE employee_id = %s"
            mycursor.execute(delete, (staff_id_to_delete,))
            mydb.commit()
            
            # 2. PRG Pattern: Redirect back to the staff page
            return redirect('staff')    
    
    
    

#now for editing the employees and stuff.
    if request.GET.get('edit_staff_name'):
        staff_id = int(request.GET.get('edit_staff_id'))
        name = request.GET.get('edit_staff_name')
        tenure = int(request.GET.get('edit_staff_tenure'))
        address = request.GET.get('edit_staff_address')
        role = request.GET.get('edit_staff_role')
        
        employement_date_str = request.GET.get('edit_staff_date')
        employement_date_database = datetime.strptime(employement_date_str, '%Y-%m-%d').date()
        
        phone_no = int(request.GET.get('edit_staff_phone'))
        status = request.GET.get('edit_staff_status')
        status_int = 0
        if status == 'active':
            status_int = 1
            
        old_accounts_email_passwd = "SELECT email, phone_no FROM employees WHERE employee_id = %s"
        mycursor.execute(old_accounts_email_passwd, (staff_id,))
        old_account_info = mycursor.fetchone()
        
        if old_account_info:
            old_email = old_account_info[0]
            old_phone_no = old_account_info[1]
            #ONLY PHONE NUMBER EDITABLE
            if phone_no != old_phone_no: 
                edit_acc = "UPDATE accounts SET phone_no = %s WHERE email = %s"
                a = (phone_no, old_email)
                mycursor.execute(edit_acc, a)
                mydb.commit()
                
            edit_all_other_info = ("UPDATE employees SET name = %s, tenure = %s, address = %s, job_position = %s,employement_date = %s, phone_no = %s, availability = %s WHERE employee_id = %s")
            vlll = (name, tenure, address, role, employement_date_database, phone_no, status_int, staff_id)
            mycursor.execute(edit_all_other_info, vlll)
            mydb.commit()
    no_acc = None
    no_email_in_acc = {}
    #adding new memebrs
    if request.GET.get('new_staff_name'):
        
        
        #staff_id = int(request.GET.get('new_staff_id'))#gonna be default
        name= request.GET.get('new_staff_name')
        tenure = int(request.GET.get('new_staff_tenure'))
        address = request.GET.get('new_staff_address')
        role = request.GET.get('new_staff_role')
        
        datem = request.GET.get('new_staff_date')
        date = datetime.strptime(datem, '%Y-%m-%d').date()
        
        email = request.GET.get('new_staff_email')#must have an account
        phone_no = int(request.GET.get('new_staff_phone'))
        
        search_email = "SELECT email FROM accounts WHERE email = %s"
        mycursor.execute(search_email, (email,))
        account_exist = mycursor.fetchone()

        if account_exist:    
            inserting_staff = "insert into employees (name, phone_no, tenure, address, job_position, employement_date, email) values(%s, %s, %s, %s, %s, %s, %s)"
            v = (name, phone_no, tenure, address, role, date, email)
            mycursor.execute(inserting_staff, v)
            mydb.commit()
            return redirect('staff')
        else:
            no_acc = "The email DOES NOT have any account. MUST CREATE ACCOUNT to join STAFF."
            
    mycursor.close()
    return render(request, 'staff.html', {'all_employees': all_employees, 'error_message': no_acc}) 


def admin_reserve(request):
    mydb = mysql.connector.connect(
        host='localhost',
        user='root',
        passwd='raka',
        database='resturant'
    )
    mycursor = mydb.cursor()
    select_reservation_info = "SELECT reservation_id, customer_id, name, phone_no, reserve_date, no_of_customer, email, special_resquests, status FROM reservation"
    mycursor.execute(select_reservation_info)
    all_reservation_info = mycursor.fetchall()
    
    if request.GET.get('delete_res_id'):
        del_id = request.GET.get('delete_res_id')
        delete_sql = "DELETE FROM reservation WHERE reservation_id = %s"
        mycursor.execute(delete_sql, (del_id, ) )
        mydb.commit()
        return redirect('admin_reserve')
    
    if request.GET.get('edit_res_id'):
        res_id = request.GET.get('edit_res_id')
        customer_id = request.GET.get('edit_customer_id')
        name = request.GET.get('edit_res_name')
        phone_no = int(request.GET.get('edit_res_phone'))
        email = request.GET.get('edit_res_email')
        
        date_time = request.GET.get('edit_res_datetime')
        resrve_date_time = datetime.strptime(date_time, '%Y-%m-%dT%H:%M')
        
        no_guest = request.GET.get('edit_res_guests')
        specail_req = request.GET.get('edit_res_request')
        stat = request.GET.get('edit_res_status')
        stat_int = {'Pending': 1, 'Confirmed': 2, 'Completed': 3, 'Cancelled': 0}
        stat_actual_value = stat_int.get(stat)
        
        edit_sql = "UPDATE reservation SET name = %s, phone_no = %s, email = %s, reserve_date = %s, no_of_customer = %s, special_resquests = %s, status = %s WHERE reservation_id = %s"
        d = (name, phone_no, email, resrve_date_time, no_guest, specail_req, stat_actual_value, res_id)
        mycursor.execute(edit_sql, d)
        mydb.commit()
        
        return redirect('admin_reserve')
    
    search_indicator = request.GET.get('search_query')
    
    if search_indicator:
        sspp = []
        filtered_sql = "SELECT reservation_id, customer_id, name, phone_no, reserve_date, no_of_customer, email, special_resquests, status FROM reservation"
        
        search_term = '%' + search_indicator + '%'
        filtered_sql += " WHERE name LIKE %s OR phone_no LIKE %s"
        sspp.append(search_term)
        sspp.append(search_term)
        try:
            search_id = int(search_indicator)
            filtered_sql += " OR reservation_id = %s"
            sspp.append(search_id)
        except ValueError:
            pass     
        mycursor.execute(filtered_sql, tuple(sspp, ))
        all_reservation_info = mycursor.fetchall()
    mycursor.close()
        

    
    
    
    
    return render(request, 'adminreservation.html', {'reserve_info' : all_reservation_info})

def inventory(request):
    mycursor = mydb.cursor()
    #adding into inventory
    if request.GET.get('add_item_name') and request.GET.get('action_type') == 'add_new_item':

        name = request.GET.get('add_item_name')
        quantity = int(request.GET.get('add_int_quantity'))
        price = float(request.GET.get('addPRICE'))
        min_stock = float(request.GET.get('add_int_min_stock'))
        
        last_restockedDATE = request.GET.get('add_int_restock')
        last_restock = None        
        
        if last_restockedDATE:
            last_restock = datetime.strptime(last_restockedDATE, '%Y-%m-%dT%H:%M')
        
        
        supplier_id = int(request.GET.get('add_sup_id'))
        supplier_name = request.GET.get('add_sup_name')
        suplier_contact = int(request.GET.get('add_sup_contact'))
        status = request.GET.get('int_new_status')
        statusINT = {'Stocked' : 1, 'Low Stock' : 0, 'Out_of_stock' : 2}
        real_status = statusINT.get(status)
        
        adding_item = "insert into inventory (ingredient_name, quantity, minimum_stock_level, last_restocked, supplier, availability, supplier_id, price, supplier_contact) values (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        z = (name, quantity, min_stock, last_restock, supplier_name, real_status, supplier_id, price, suplier_contact)
        mycursor.execute(adding_item, z)
        mydb.commit()
        return redirect('admin_inventory')
        
        
        
    #showing all the values in the table. WILL DO THIS LATER, BUT FIRST LETS FIXX THE ADD
    ##fetching_all_invent = "SELECT inventory_id, ingredient_name, quantity, minimum_stock_level, last_restocked, supplier_id, supplier, supplier_contact, price,    availability   FROM inventory"
    ##mycursor.execute(fetching_all_invent)
    ##all_info_inventory = mycursor.fetchall()
    
    #editting
    if request.GET.get('int_item_name'):
        inventory_id = request.GET.get('inventory_id')
        quantity = int(request.GET.get('int_quantity'))
        min_stock = float(request.GET.get("int_mini_stock"))
        
        last_restock_date = request.GET.get('edit_int_restock')
        last_restock = None
        if last_restock_date:
            last_restock = datetime.strptime(last_restock_date, '%Y-%m-%dT%H:%M')
        
        supplier_id = int(request.GET.get('int_sup_id'))
        supplier_name = request.GET.get('int_sup_name')
        supplier_contact = int(request.GET.get('int_sup_contact'))
        price = float(request.GET.get('edit_int_price'))
        
        
        statuess = request.GET.get('int_status')
        
        
        back_to_int = {'Stocked' : 1, 'Low Stock' : 0, 'Out_of_stock' : 2}
        availability = back_to_int.get(statuess)
        
        
        updateINVENTORYsql = "UPDATE inventory SET  quantity = %s, minimum_stock_level = %s, last_restocked = %s, supplier_id = %s, supplier = %s, supplier_contact = %s, price = %s, availability = %s WHERE inventory_id = %s"
        updatedata = (quantity, min_stock, last_restock, supplier_id, supplier_name, supplier_contact, price, availability, inventory_id) # This must be the last item for the WHERE clause)
        
        mycursor.execute(updateINVENTORYsql, updatedata)
        mydb.commit()
        return redirect('admin_inventory')
        
    #DELETING
    if request.GET.get('delete_inventory_id'):
        inventory_id = request.GET.get('delete_inventory_id')
        
        del_inventory_sql = "DELETE FROM inventory WHERE inventory_id = %s"
        mycursor.execute(del_inventory_sql, (inventory_id, ))
        mydb.commit()
        return redirect('admin_inventory')
        
        
    #searching
    search_term = request.GET.get('search_query', '').strip()
    
    fetching_all_invent = "SELECT inventory_id, ingredient_name, quantity, minimum_stock_level, last_restocked, supplier_id, supplier, supplier_contact, price, availability FROM inventory"
    
    query_params = []
    
    if search_term:
        fetching_all_invent += " WHERE ingredient_name LIKE %s"
        query_params.append(f'%{search_term}%')
        
        try:
            inventory_id_for_search = int(search_term)
            fetching_all_invent += " OR inventory_id = %s"
            query_params.append(inventory_id_for_search)
        except ValueError:
            pass        
    
    mycursor.execute(fetching_all_invent, tuple(query_params)) 
    all_info_inventory = mycursor.fetchall() 
    mycursor.close()

    # 5. The final render statement for the page
    return render(request, 'inventory.html', {'all_inventory_info' : all_info_inventory, 'search_query': search_term})
