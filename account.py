import os, uuid, datetime, sqlite3
from flask import Flask, request,url_for
from flask_cors import CORS
from waitress import serve #不顯示route
from flask_mail import Mail,Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
import csv

app=Flask(__name__)
CORS(app)

app.config.from_pyfile('config.cfg')
mail = Mail(app)
s = URLSafeTimedSerializer('Thisissecretkey!')

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
                    return "password wrong",401 #非受權
        return "account not found",401
    else:
        token = s.dumps(acc, salt='email-confirm')
        msg = Message('Confirm Email',sender='ncnu10813@gmail.com', recipients=[acc])
        link = url_for('email', token=token, _external=True)
        msg.body = 'Your link is {}'.format(link)
        mail.send(msg)
        try:
            s.loads(token, salt='email-confirm', max_age=20)
            with open('./account.csv', 'a+', newline='') as f:
                writer = csv.writer(f)
                writer.writerow([acc,pwd,fname])
            f.close()
        except SignatureExpired: #超時異常
            return 'Time error',401
        return "hello,"+fname

# @app.route('/<token>')
# def email(token):
#     try:
#         s.loads(token, salt='email-confirm', max_age=20)
#     except SignatureExpired:
#         return '<h1>The token is expired!</h1>'
#     return '<h1>The token works!</h1>'

if __name__=='__main__':
    serve(app, host='0.0.0.0', port=6866, threads=9999) # nginx 6867


