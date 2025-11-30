from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest
import mysql.connector
from datetime import datetime

def get_db_connection():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        passwd='raka',
        database='resturant'
    )
mydb = get_db_connection()

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

            employement_date = datetime.now().date()
            insert_into_employee = "INSERT INTO employees (email, name, phone_no, address, job_position, tenure, employement_date, availability) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
            job_position = 'Employee'
            tenure = 0
            availability = 1
            dttt = (email, name, phone_no, addres, job_position, tenure, employement_date, availability)
            mycursor.execute(insert_into_employee, dttt)
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
        if mail == 'raka' and passw == '123':
            access = True
        #[(email1, pass1),
        #(email2, pass2)]
        for x in e_and_p:
            if x[0] == mail and x[1] == passw:
                access = True
        if access:
            return redirect('dashboard')
        else:
            wrong_mail_or_pass = 'Password or email is wrong Buddy'
            context = {'error' : wrong_mail_or_pass }
            return render(request, 'auth.html', context)
        
        
        
    return render(request, 'auth.html', context)

def home(request):
    mycursor = mydb.cursor()
    mycursor.execute("SELECT menu_id, name, description, price, image_url FROM menu ORDER BY menu_id ASC LIMIT 3")
    home_menu = mycursor.fetchall()
    mycursor.close()
    return render(request, 'home.html', {'home_menu' : home_menu})
def menu(request):
    mycursor = mydb.cursor()
    selecting_all_menu_items = "SELECT menu_id, name, description, price, image_url, category_id FROM menu;"
    mycursor.execute(selecting_all_menu_items)
    allFOOD = mycursor.fetchall()
    mycursor.close()

    return render(request, 'menu.html', {'ALLFOOD' : allFOOD})


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

def order(request):
    mycursor = mydb.cursor()

    # Fetch all orders
    query = "SELECT order_id, phone_no, order_time, status, employee_id, name FROM food_order ORDER BY order_id ASC"
    mycursor.execute(query)
    orders_from_db = mycursor.fetchall()

    # For each order, fetch details
    orders = []
    for x in orders_from_db:
        order_id, phone_no, order_time, status, employee_id, name = x
        # Fetch order details
        detail_query = "SELECT menu_id, quantity, item_price FROM order_details WHERE order_id = %s"
        mycursor.execute(detail_query, (order_id,))
        details = mycursor.fetchall()
        items = [{'menu_id': d[0], 'quantity': d[1], 'item_price': d[2]} for d in details]
        orders.append({
            'order_id': order_id,
            'phone_no': phone_no,
            'order_time': order_time,
            'status': status,
            'items': items,
            'employee_id': employee_id,
            'name': name
        })

    # Count orders by status
    status_counts = {'pending': 0, 'processing': 0, 'ready': 0, 'completed': 0, 'cancelled': 0}
    for x in orders_from_db:
        status = x[3]
        if status in status_counts:
            status_counts[status] += 1

    # Fetch employees for dropdowns
    mycursor.execute("SELECT employee_id, name FROM employees ORDER BY employee_id ASC")
    employees = mycursor.fetchall()

    # Fetch menu items for dropdowns
    mycursor.execute("SELECT menu_id, name FROM menu WHERE is_available = 1 ORDER BY menu_id ASC")
    menu_items = mycursor.fetchall()

    context = {
        'orders': orders,
        'employees': employees,
        'menu_items': menu_items,
        'pending_count': status_counts['pending'],
        'preparing_count': status_counts['processing'],  # Note: processing for preparing
        'ready_count': status_counts['ready'],
        'completed_count': status_counts['completed'],
        'cancelled_count': status_counts['cancelled']
    }

    #adding order
    if request.GET.getlist('add_order_menu_id'):
        menu_ids = request.GET.getlist('add_order_menu_id')
        quantities = request.GET.getlist('add_order_quantity')
        phone_no = int(request.GET.get('phone'))
        customer_name = request.GET.get('customer_name')
        order_time_str = request.GET.get('add_order_time')
        order_time = datetime.strptime(order_time_str, '%Y-%m-%dT%H:%M')
        status = request.GET.get('add_order_status')
        employee_id = int(request.GET.get('add_order_employee_id')) if request.GET.get('add_order_employee_id') else None

        # Insert into food_order
        sql = "INSERT INTO food_order (status, order_time, phone_no, employee_id, name) VALUES (%s, %s, %s, %s, %s)"
        mycursor.execute(sql, (status, order_time, phone_no, employee_id, customer_name))
        order_id = mycursor.lastrowid

        # Then for each menu_id, quantity
        for menu_id, qty in zip(menu_ids, quantities):
            menu_id = int(menu_id)
            qty = int(qty)
            # Get price
            mycursor.execute("SELECT price FROM menu WHERE menu_id = %s", (menu_id,))
            price = mycursor.fetchone()[0]
            item_price = price * qty
            # Insert into order_details
            sql_detail = "INSERT INTO order_details (order_id, menu_id, quantity, item_price) VALUES (%s, %s, %s, %s)"
            mycursor.execute(sql_detail, (order_id, menu_id, qty, item_price))

        mydb.commit()

        finding_all_customer_phones = "select phone_no from customer"
        mycursor.execute(finding_all_customer_phones)
        all_customer_phones = mycursor.fetchall()

        phone_list = [p[0] for p in all_customer_phones]

        if phone_no not in phone_list:
            ss = "insert into customer (phone_no, name) values(%s, %s)"
            mycursor.execute(ss, (phone_no, customer_name))
            mydb.commit()
        else:
            update_customer = "UPDATE customer SET name = %s WHERE phone_no = %s"
            mycursor.execute(update_customer, (customer_name, phone_no))
            mydb.commit()

        increasing_visits = "select visit_no from customer where phone_no = %s"
        mycursor.execute(increasing_visits, (phone_no, ))
        visitsss = mycursor.fetchone()
        visit = visitsss[0] if visitsss else None
        if visit is not None:
            visit = visit + 1
        else:
            visit = 1  #means first visit
        back_to_table = "UPDATE customer SET visit_no = %s WHERE phone_no = %s;"
        mycursor.execute(back_to_table, (visit, phone_no))
        mydb.commit()


        return redirect('order')

    #editing order
    if request.GET.get('edit_order_status'):
        order_id = int(request.GET.get('order_id'))
        phone_no = int(request.GET.get('order_customer_id'))
        customer_name = request.GET.get('edit_customer_name')
        order_time_str = request.GET.get('order_time')
        order_time = datetime.strptime(order_time_str, '%Y-%m-%dT%H:%M')
        status = request.GET.get('edit_order_status')
        employee_id = int(request.GET.get('edit_order_employee_id')) if request.GET.get('edit_order_employee_id') else None

        update_sql = "UPDATE food_order SET phone_no = %s, order_time = %s, status = %s, employee_id = %s, name = %s WHERE order_id = %s"
        data = (phone_no, order_time, status, employee_id, customer_name, order_id)
        mycursor.execute(update_sql, data)
        mydb.commit()

        existing_query = "SELECT phone_no FROM customer WHERE phone_no = %s"
        mycursor.execute(existing_query, (phone_no,))
        existing = mycursor.fetchone()
        if existing:
            mycursor.execute("UPDATE customer SET name = %s WHERE phone_no = %s", (customer_name, phone_no))
            mydb.commit()
        else:
            mycursor.execute("INSERT INTO customer (phone_no, name) VALUES (%s, %s)", (phone_no, customer_name))
            mydb.commit()

        return redirect('order')

    #deleting order
    if request.GET.get('delete_order_id'):
        delete_id = int(request.GET.get('delete_order_id'))

        # First, delete corresponding sale_transaction
        mycursor.execute("DELETE FROM sale_transaction WHERE order_id = %s", (delete_id,))

        # Then delete order_details and food_order
        mycursor.execute("DELETE FROM order_details WHERE order_id = %s", (delete_id,))
        mycursor.execute("DELETE FROM food_order WHERE order_id = %s", (delete_id,))
        mydb.commit()

        return redirect('order')

    # Checkout from menu page
    if request.GET.get('checkout_submit'):
        customer_name = request.GET.get('customer_name')
        customer_address = request.GET.get('customer_address')
        phone_no = int(request.GET.get('phone'))
        menu_ids = request.GET.getlist('add_order_menu_id[]')
        quantities = request.GET.getlist('add_order_quantity[]')
        payment_method = request.GET.get('payment_method')
        order_time = datetime.now()
        status = 'pending'
        employee_id = None

        # Insert into food_order
        sql = "INSERT INTO food_order (status, order_time, phone_no, employee_id, name) VALUES (%s, %s, %s, %s, %s)"
        mycursor.execute(sql, (status, order_time, phone_no, employee_id, customer_name))
        order_id = mycursor.lastrowid

        # Insert order details
        for menu_id, qty in zip(menu_ids, quantities):
            menu_id = int(menu_id)
            qty = int(qty)
            mycursor.execute("SELECT price FROM menu WHERE menu_id = %s", (menu_id,))
            price = mycursor.fetchone()[0]
            item_price = price * qty
            sql_detail = "INSERT INTO order_details (order_id, menu_id, quantity, item_price) VALUES (%s, %s, %s, %s)"
            mycursor.execute(sql_detail, (order_id, menu_id, qty, item_price))

        mydb.commit()

        # Handle customer data
        finding_all_customer_phones = "select phone_no from customer"
        mycursor.execute(finding_all_customer_phones)
        all_customer_phones = mycursor.fetchall()
        phone_list = [p[0] for p in all_customer_phones]

        if phone_no not in phone_list:
            ss = "insert into customer (phone_no, name, address) values(%s, %s, %s)"
            mycursor.execute(ss, (phone_no, customer_name, customer_address))
        else:
            update_customer = "UPDATE customer SET name = %s, address = %s WHERE phone_no = %s"
            mycursor.execute(update_customer, (customer_name, customer_address, phone_no))

        mydb.commit()

        # Update visit count
        increasing_visits = "select visit_no from customer where phone_no = %s"
        mycursor.execute(increasing_visits, (phone_no,))
        visitsss = mycursor.fetchone()
        visit = visitsss[0] if visitsss and visitsss[0] else 0
        visit = visit + 1
        back_to_table = "UPDATE customer SET visit_no = %s WHERE phone_no = %s;"
        mycursor.execute(back_to_table, (visit, phone_no))
        mydb.commit()

        return redirect('menu_home')

    mycursor.close()

    return render(request, 'order.html', context)


def sales(request):
    mycursor = mydb.cursor()

    # First, check and populate sale_transaction table from food_order
    # Fetch orders that don't have sales transactions yet
    mycursor.execute("""
        SELECT fo.order_id, fo.phone_no, fo.employee_id
        FROM food_order fo
        LEFT JOIN sale_transaction st ON fo.order_id = st.order_id
        WHERE st.order_id IS NULL
    """)
    pending_orders = mycursor.fetchall()

    for order in pending_orders:
        order_id, phone_no, employee_id = order

        # Get total amount from order_details
        mycursor.execute("SELECT SUM(item_price) FROM order_details WHERE order_id = %s", (order_id,))
        result = mycursor.fetchone()
        total_amount = result[0] if result and result[0] is not None else 0

        # Get customer_id from customer
        mycursor.execute("SELECT customer_id FROM customer WHERE phone_no = %s", (phone_no,))
        customer_result = mycursor.fetchone()
        customer_id = customer_result[0] if customer_result else None

        # Insert sale transaction
        insert_query = """
        INSERT INTO sale_transaction (customer_id, employee_id, Amount, order_id, status)
        VALUES (%s, %s, %s, %s, 'Completed')
        """
        mycursor.execute(insert_query, (customer_id, employee_id, total_amount, order_id))
        mydb.commit()

    # Now fetch all sales transactions
    query = """
    SELECT st.sale_id, st.customer_id, st.employee_id, st.table_no, st.sale_time, st.Payment_Method, st.Amount, st.order_id, st.status
    FROM sale_transaction st
    ORDER BY st.sale_id ASC
    """
    mycursor.execute(query)
    sales_data = mycursor.fetchall()

    sales_list = []
    total_sales_amount = 0
    total_transactions = 0
    pending_amount = 0

    for sale in sales_data:
        sale_id, customer_id, employee_id, table_no, sale_time, payment_method, amount, order_id, status = sale

        # Fetch items for this order
        calculated_amount = 0
        if order_id:
            items_query = """
            SELECT od.menu_id, od.quantity, m.name
            FROM order_details od
            JOIN menu m ON od.menu_id = m.menu_id
            WHERE od.order_id = %s
            """
            mycursor.execute(items_query, (order_id,))
            order_items = mycursor.fetchall()
            items = [{'menu_id': item[0], 'quantity': item[1], 'name': item[2]} for item in order_items]
            mycursor.execute("SELECT SUM(item_price) FROM order_details WHERE order_id = %s", (order_id,))
            sum_result = mycursor.fetchone()
            calculated_amount = sum_result[0] if sum_result and sum_result[0] else 0
            if calculated_amount != amount:
                mycursor.execute("UPDATE sale_transaction SET Amount = %s WHERE sale_id = %s", (calculated_amount, sale_id))
                mydb.commit()
        else:
            items = []
            calculated_amount = amount

        # Format items for display
        items_display = ", ".join([f"{item['name']} ({item['quantity']})" for item in items])

        if status == 'Completed':
            total_sales_amount += calculated_amount or 0
        if status == 'Pending':
            pending_amount += calculated_amount or 0
        if status != 'Pending':
            total_transactions += 1

        sales_list.append({
            'sale_id': sale_id,
            'customer_id': customer_id,
            'employee_id': employee_id,
            'table_no': table_no,
            'items': items_display,
            'sale_time': sale_time,
            'payment_method': payment_method,
            'amount': calculated_amount,
            'status': status,
            'order_id': order_id
        })

    # Handle edit sales
    if request.GET.get('edit_sale_status'):
        sale_id = int(request.GET.get('edit_sale_id'))
        new_status = request.GET.get('edit_sale_status')
        payment_method = request.GET.get('edit_pay_method')

        # Get current sale_time
        mycursor.execute("SELECT sale_time FROM sale_transaction WHERE sale_id = %s", (sale_id,))
        current = mycursor.fetchone()
        current_sale_time = current[0] if current else None

        # Handle sal_time input
        sal_time_val = request.GET.get('sal_time')
        sale_time = None
        if new_status == 'Pending':
            sale_time = None
        else:
            if sal_time_val:
                sale_time = datetime.strptime(sal_time_val, '%Y-%m-%dT%H:%M')
            else:
                if new_status in ['Completed', 'Refunded'] and not current_sale_time:
                    sale_time = datetime.now()
                else:
                    sale_time = current_sale_time

        update_query = """
        UPDATE sale_transaction
        SET Payment_Method = %s, sale_time = %s, status = %s
        WHERE sale_id = %s
        """
        mycursor.execute(update_query, (payment_method, sale_time, new_status, sale_id))
        mydb.commit()

        return redirect('sales')

    # Handle delete sales
    if request.GET.get('delete_sale_id'):
        delete_id = int(request.GET.get('delete_sale_id'))
        # First, get the order_id to delete related order
        mycursor.execute("SELECT order_id FROM sale_transaction WHERE sale_id = %s", (delete_id,))
        order = mycursor.fetchone()
        order_id = order[0] if order and order[0] else None
        # Delete from sale_transaction
        delete_sql = "DELETE FROM sale_transaction WHERE sale_id = %s"
        mycursor.execute(delete_sql, (delete_id,))
        mydb.commit()
        # If order_id exists, delete from order_details and food_order
        if order_id:
            mycursor.execute("DELETE FROM order_details WHERE order_id = %s", (order_id,))
            mycursor.execute("DELETE FROM food_order WHERE order_id = %s", (order_id,))
            mydb.commit()
        return redirect('sales')

    mycursor.close()

    context = {
        'sales': sales_list,
        'total_sales': total_sales_amount,
        'total_transactions': total_transactions,
        'pending_amount': pending_amount
    }

    return render(request, 'sales.html', context)

def dashbaord(request):
    mycursor = mydb.cursor()

    # Editing upcoming dishes
    for dish_num in range(1, 4):
        if request.POST.get(f'food_name{dish_num}'):
            menu_id = int(request.POST.get(f'menu_id{dish_num}'))
            name = request.POST.get(f'food_name{dish_num}')
            description = request.POST.get(f'food_description{dish_num}')
            price = float(request.POST.get(f'h-f-price{dish_num}'))
            image_file = request.FILES.get(f'home_image{dish_num}')
            if image_file:
                image_url = image_file.name
            else:
                mycursor.execute("SELECT image_url FROM menu WHERE menu_id = %s", (menu_id,))
                existing = mycursor.fetchone()
                image_url = existing[0] if existing and existing[0] else ''
            update_sql = "UPDATE menu SET name = %s, description = %s, price = %s, image_url = %s WHERE menu_id = %s"
            mycursor.execute(update_sql, (name, description, price, image_url, menu_id))
            mydb.commit()

            return redirect('dashboard')

    # First, check and populate sale_transaction table from food_order
    # Fetch orders that don't have sales transactions yet
    mycursor.execute("""
        SELECT fo.order_id, fo.phone_no, fo.employee_id
        FROM food_order fo
        LEFT JOIN sale_transaction st ON fo.order_id = st.order_id
        WHERE st.order_id IS NULL
    """)
    pending_orders = mycursor.fetchall()

    for order in pending_orders:
        order_id, phone_no, employee_id = order

        # Get total amount from order_details
        mycursor.execute("SELECT SUM(item_price) FROM order_details WHERE order_id = %s", (order_id,))
        result = mycursor.fetchone()
        total_amount = result[0] if result and result[0] is not None else 0

        # Get customer_id from customer
        mycursor.execute("SELECT customer_id FROM customer WHERE phone_no = %s", (phone_no,))
        customer_result = mycursor.fetchone()
        customer_id = customer_result[0] if customer_result else None

        # Insert sale transaction
        insert_query = """
        INSERT INTO sale_transaction (customer_id, employee_id, Amount, order_id, status)
        VALUES (%s, %s, %s, %s, 'Completed')
        """
        mycursor.execute(insert_query, (customer_id, employee_id, total_amount, order_id))
        mydb.commit()

    # Now fetch all sales transactions
    query = """
    SELECT st.sale_id, st.customer_id, st.employee_id, st.table_no, st.sale_time, st.Payment_Method, st.Amount, st.order_id, st.status
    FROM sale_transaction st
    ORDER BY st.sale_id ASC
    """
    mycursor.execute(query)
    sales_data = mycursor.fetchall()

    total_sales_amount = 0

    for sale in sales_data:
        sale_id, customer_id, employee_id, table_no, sale_time, payment_method, amount, order_id, status = sale

        # Fetch items for this order
        calculated_amount = 0
        if order_id:
            mycursor.execute("SELECT SUM(item_price) FROM order_details WHERE order_id = %s", (order_id,))
            sum_result = mycursor.fetchone()
            calculated_amount = sum_result[0] if sum_result and sum_result[0] else 0
            if calculated_amount != amount:
                mycursor.execute("UPDATE sale_transaction SET Amount = %s WHERE sale_id = %s", (calculated_amount, sale_id))
                mydb.commit()
        else:
            calculated_amount = amount

        if status == 'Completed':
            total_sales_amount += calculated_amount or 0

    # Fetch upcoming dishes
    mycursor.execute("SELECT menu_id, name, description, price, image_url FROM menu ORDER BY menu_id ASC LIMIT 3")
    upcomming_dishes = mycursor.fetchall()

    mycursor.execute("SELECT COUNT(*) FROM food_order")
    total_orders_result = mycursor.fetchone()
    total_orders = total_orders_result[0] if total_orders_result else 0

    # Get total customers
    mycursor.execute("SELECT COUNT(*) FROM customer")
    total_customers_result = mycursor.fetchone()
    total_customers = total_customers_result[0] if total_customers_result else 0

    # Get total staff
    mycursor.execute("SELECT COUNT(*) FROM employees")
    total_staff_result = mycursor.fetchone()
    total_staff = total_staff_result[0] if total_staff_result else 0

    # Fetch recent orders
    order_query = "SELECT order_id, phone_no, order_time, status FROM food_order ORDER BY order_id DESC LIMIT 5"
    mycursor.execute(order_query)
    recent_orders_db = mycursor.fetchall()

    recent_orders = []
    for order_id, phone_no, order_time, status in recent_orders_db:
        # Get items string
        items_query = """
        SELECT m.name, od.quantity
        FROM order_details od
        JOIN menu m ON od.menu_id = m.menu_id
        WHERE od.order_id = %s
        """
        mycursor.execute(items_query, (order_id,))
        item_details = mycursor.fetchall()
        item_strings = []
        for name, qty in item_details:
            item_strings.append(f"{name} ({qty})")
        items_str = ", ".join(item_strings)

        # Get total price
        price_query = "SELECT SUM(item_price) FROM order_details WHERE order_id = %s"
        mycursor.execute(price_query, (order_id,))
        price_result = mycursor.fetchone()
        total_price = price_result[0] if price_result and price_result[0] else 0

        recent_orders.append({
            'order_id': order_id,
            'phone_no': phone_no,
            'items': items_str,
            'order_time': order_time,
            'total_price': total_price,
            'status': status
        })

    mycursor.close()

    return render(request, 'dashboard.html', {'total_sales': total_sales_amount, 'total_orders': total_orders, 'total_customers': total_customers, 'total_staff': total_staff, 'recent_orders': recent_orders, 'upcomming_dishes': upcomming_dishes})

def customer_checkout(request):
    if request.GET.get('checkout_submit'):
        customer_name = request.GET.get('customer_name')
        customer_address = request.GET.get('customer_address')
        phone_str = request.GET.get('phone')
        menu_ids = request.GET.getlist('add_order_menu_id[]')
        quantities = request.GET.getlist('add_order_quantity[]')
        payment_method = request.GET.get('payment_method')
        if not payment_method:
            payment_method = 'cash'

        if not all([customer_name, customer_address, phone_str, payment_method]):
            return HttpResponseBadRequest("Missing required fields")

        phone_no = int(phone_str)

        mycursor = mydb.cursor()
        order_time = datetime.now()
        status = 'pending'
        employee_id = None

        # Insert into food_order
        sql = "INSERT INTO food_order (status, order_time, phone_no, employee_id, name) VALUES (%s, %s, %s, %s, %s)"
        mycursor.execute(sql, (status, order_time, phone_no, employee_id, customer_name))
        order_id = mycursor.lastrowid

        # Insert order details
        for menu_id_str, qty_str in zip(menu_ids, quantities):
            menu_id = int(menu_id_str)
            qty = int(qty_str)
            if qty <= 0:
                continue
            mycursor.execute("SELECT price FROM menu WHERE menu_id = %s", (menu_id,))
            price_result = mycursor.fetchone()
            if not price_result:
                continue
            price = price_result[0]
            item_price = price * qty
            sql_detail = "INSERT INTO order_details (order_id, menu_id, quantity, item_price) VALUES (%s, %s, %s, %s)"
            mycursor.execute(sql_detail, (order_id, menu_id, qty, item_price))

        mydb.commit()

        # Handle customer data
        finding_all_customer_phones = "select phone_no from customer"
        mycursor.execute(finding_all_customer_phones)
        all_customer_phones = mycursor.fetchall()
        phone_list = [p[0] for p in all_customer_phones]

        if phone_no not in phone_list:
            ss = "insert into customer (phone_no, name, address) values(%s, %s, %s)"
            mycursor.execute(ss, (phone_no, customer_name, customer_address))
        else:
            update_customer = "UPDATE customer SET name = %s, address = %s WHERE phone_no = %s"
            mycursor.execute(update_customer, (customer_name, customer_address, phone_no))

        mydb.commit()

        # Update visit count
        increasing_visits = "select visit_no from customer where phone_no = %s"
        mycursor.execute(increasing_visits, (phone_no,))
        visitsss = mycursor.fetchone()
        visit = visitsss[0] if visitsss and visitsss[0] else 0
        visit = visit + 1
        back_to_table = "UPDATE customer SET visit_no = %s WHERE phone_no = %s;"
        mycursor.execute(back_to_table, (visit, phone_no))
        mydb.commit()

        # Get customer_id
        mycursor.execute("SELECT customer_id FROM customer WHERE phone_no = %s", (phone_no,))
        customer_result = mycursor.fetchone()
        customer_id = customer_result[0] if customer_result else None

        # Calculate total amount
        mycursor.execute("SELECT SUM(item_price) FROM order_details WHERE order_id = %s", (order_id,))
        amount_result = mycursor.fetchone()
        total_amount = amount_result[0] if amount_result and amount_result[0] else 0

        # Insert into sale_transaction
        if customer_id and total_amount > 0:
            insert_sale = """
                INSERT INTO sale_transaction (Amount, Payment_Method, employee_id, table_no, customer_id, sale_time, order_id, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, 'Completed')
                """
            mycursor.execute(insert_sale, (total_amount, payment_method, employee_id, None, customer_id, order_time, order_id))
            mydb.commit()

        mycursor.close()
        return redirect('menu_home')
    return redirect('menu_home')

def service(request):
    return render(request, 'service.html')

def customer(request):
    mycursor = mydb.cursor()

    # Edit customer
    if request.GET.get('edit_customer_id'):
        edit_id = int(request.GET.get('edit_customer_id'))
        status = request.GET.get('edit_cus_status')
        has_account = 1 if status == 'Active' else 0

        update_sql = "UPDATE customer SET has_account = %s WHERE customer_id = %s"
        mycursor.execute(update_sql, (has_account, edit_id))
        mydb.commit()

        return redirect('admin_customer')

    # Delete customer
    if request.GET.get('delete_customer_id'):
        delete_id = int(request.GET.get('delete_customer_id'))
        delete_sql = "DELETE FROM customer WHERE customer_id = %s"
        mycursor.execute(delete_sql, (delete_id,))
        mydb.commit()

        return redirect('admin_customer')

    search_term = request.GET.get('search_query', '').strip()

    query = "SELECT customer_id, name, phone_no, visit_no, preferred_dish_id, address, email, has_account FROM customer"
    params = []

    if search_term:
        try:
            # Try to search by exact ID
            id_search = int(search_term)
            query += " WHERE customer_id = %s"
            params.append(id_search)
        except ValueError:
            # If not an integer, search in name
            query += " WHERE name LIKE %s"
            params.append('%' + search_term + '%')

    mycursor.execute(query, params)
    all_customer_info = mycursor.fetchall()

    mycursor.close()

    return render(request, 'admin-customer.html', {'all_customer_info': all_customer_info, 'search_query': search_term})

def about(request):
    return render(request, 'about.html')
