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
        
    if request.GET.get("delete_menu_id"):
        delete_id = int(request.GET.get("delete_menu_id"))
        
        sql_delete = "DELETE FROM menu WHERE menu_id = %s"
        mycursor.execute(sql_delete, (delete_id,))
        mydb.commit()    
    
    
    selectALL_menu_items = "SELECT menu_id, name, category_id, description, ingredients, preparation_time, price FROM menu"
    mycursor.execute(selectALL_menu_items)
    items_from_menu = mycursor.fetchall()
    
    context = {'menu_items' : items_from_menu}
    
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
    return render(request, 'home.html')
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
    pass