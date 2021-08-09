from flask import render_template,Flask,request,redirect,url_for,jsonify
import mysql.connector as link
import datetime as time
from flask_cors import CORS
app=Flask(__name__)
CORS(app)

#getting details from the database
@app.route("/")
def details():
    db=link.connect(user='san',password='12345',host='127.0.0.1',database='testingflask',auth_plugin='mysql_native_password')
    cursor=db.cursor(buffered=True)
    cursor.execute("select * from customer")
    result=cursor
    data={}
    for i in result:
        data[i[0]]=(i[1],i[2])
    db.close
    return jsonify(data)
#getting the details of one customer
@app.route("/each",methods=["POST"])
def each_details():

    a=request.get_json()
    print(a['sno'],"hello")
    
    
    db=link.connect(user='san',password='12345',host='127.0.0.1',database='testingflask',auth_plugin='mysql_native_password')
    cursor=db.cursor(buffered=True)
    cursor.execute("select * from customer where sno="+a['sno'])
    result=cursor
    data={}
    for i in result:
        data[i[0]]=(i[1],i[2],i[3])
    db.close


    return jsonify(data)


#updating the database
@app.route("/update",methods=["POST"])
def updation():
    file=request.get_json()
    print(file)
    print(file['amount'])
    amount=file['amount']
    print(file['from'])
    fromname=file['from']
    print(file['to'])
    toname=file['to']

    db=link.connect(user='san',password='12345',host='127.0.0.1',database='testingflask',auth_plugin='mysql_native_password')
    cursor=db.cursor(buffered=True)
    cursor.execute('UPDATE customer SET balance=balance-%sWHERE customer_name=%s',(amount,fromname))
    cursor.execute('UPDATE customer SET balance=balance+%sWHERE customer_name=%s',(amount,toname))
    db.commit()
    
    db.close()
    print()
    return jsonify({1:'one'})

if __name__=='__main__':
    app.run(debug=True)


