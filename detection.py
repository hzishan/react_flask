import os, uuid, datetime, sqlite3
from flask import Flask, request
from flask_cors import CORS
from waitress import serve
app=Flask(__name__)
CORS(app)

if not os.path.exists('db'):
    os.mkdir('db')

conn = sqlite3.connect('db/photo_lesions.sqlite3', check_same_thread=False)
cursor = conn.cursor()
try:
    cursor.execute('create table annotation(filename, erythroplakia, leukoplakia, verrucous_hyperplasia, lichen_planus, PRIMARY KEY(filename))')
except:
    pass

@app.route('/', methods=['POST'])
def _():
    doc=request.form['doctor']
    lesions=request.form.getlist('lesions[]')
    photos=request.files.getlist('photos[]')
    dt=datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    if not os.path.exists(f'db/{doc}'):
        os.makedirs(f'db/{doc}')
    print('doc:', doc, 'dt:', dt, 'img_counts:', len(photos))
    for photo in photos:
        filename=f'{dt}@{str(uuid.uuid4())}{os.path.splitext(photo.filename)[-1]}'
        photo.save(f'db/{doc}/{filename}')
        cursor.execute(f'replace into annotation(filename, erythroplakia, leukoplakia, verrucous_hyperplasia, lichen_planus) values("{filename}","{lesions[0]}","{lesions[1]}","{lesions[2]}","{lesions[3]}")')
        conn.commit()
    return ''


if __name__=='__main__':
    serve(app, host='0.0.0.0', port=6868, threads=9999) # nginx 6867


