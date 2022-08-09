import os, uuid, datetime, sqlite3
from flask import Flask, request
from flask_cors import CORS
from flask_mail import Mail,Message
from waitress import serve
import csv
app=Flask(__name__)
CORS(app)

from pandas import *

@app.route('/', methods=['POST'])
def get_acc():
    # read account.csv
    data = read_csv("./account.csv")
    account = data['account'].tolist()
    name = data['name'].tolist()
    password = data['password'].tolist()

    # get data from html
    page_state=request.form['page_state']
    acc=request.form['account']
    pwd=request.form['password']
    fname=request.form['fname']
    print(acc)
    print(pwd)
    if page_state == "true":
        for i in range(len(account)):
            if acc==account[i]:
                if pwd==password[i]:
                    return "hello,"+name[i]
                else:
                    return "password wrong"
        return "account not found"
    else:
        
        with open('./account.csv', 'a+', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([acc,pwd,fname])
        f.close()
        return "hello,"+fname


if __name__=='__main__':
    serve(app, host='0.0.0.0', port=6866, threads=9999) # nginx 6867


