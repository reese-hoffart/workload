from flask import Flask, request, jsonify
from dotenv import load_dotenv
from mysql.connector import connect, Error
import json, time
import os
from markupsafe import escape

load_dotenv()
app = Flask(__name__)
app.config["DEBUG"] = True

@app.after_request
def apply_caching(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

def sqlToJson(res, head):
    json_data=[]
    for result in res:
        json_data.append(dict(zip(head,result)))
    print(json_data)
    for item in json_data:
        item['date'] = str(item['date']).replace('datetime.date', '').replace('(','\"').replace(')','\"').replace(', ','-')
    return json.dumps(json_data)

def classNameToID(name, period):
    res = execute_query(f"SELECT id FROM Classes WHERE name=\"{name}\" AND period={period} LIMIT 1;")
    print(json.dumps(res))
    return json.loads(res)

@app.route("/")
def hello():
    return "<p>Hello</p>"

@app.route("/login/<string:username>")
def login(username):
    return execute_query(f'SELECT id FROM Teachers WHERE name="{username}" LIMIT 1;')

@app.route("/events")
def events():
    return str(execute_query2('SELECT * FROM Deadlines;'))

@app.route("/events/create", methods=['POST'])
def createEvent():
    date = f'{request.form.get("year")}-{request.form.get("month")}-{request.form.get("day")}'
    name = request.form.get("name")
    description = request.form.get("description")
    class_id = classNameToID(request.form.get("name"), request.form.get("period"))
    execute_query(f'INSERT INTO Deadlines (date, class_id, name, description) VALUES ("{date}", "{class_id}", "{name}", "{description}");')

@app.route("/density/<teachid>")
def density(teachid):
    teacherClasses = json.loads(execute_query(f'SELECT id FROM Classes WHERE teacher_id={teachid}'))
    teacherStudents = []
    for classid in teacherClasses:
        classStudents = json.loads(execute_query(f'SELECT student_id FROM StudentClasses WHERE class_id={classid["id"]}'))
        for student in classStudents:
            teacherStudents.append(student['id'])
    teacherStudents = list(set(teacherStudents))
    ####
    for day in range(1,32):
        classesOnDay = json.loads(execute_query(f'SELECT class_id FROM Deadlines WHERE date="2021-10-{day}";'))
        for classOnDay in classesOnDay:
            pass
    

def add_deadline(date, class_id, name, description):
    execute_query(f'INSERT INTO Deadlines (date, class_id, name, description) VALUES ("{date}", "{class_id}", "{name}", "{description}");')

def get_deadline(id):
    return execute_query(f'SELECT * FROM Deadlines WHERE ID={id};')

def get_all_deadlines():
    return execute_query('SELECT * FROM Deadlines;')

def execute_query(query):
    try:
        with connect(
            host=os.environ["DATABASE_HOST"],
            port=os.environ["DATABASE_PORT"],
            user=os.environ["DATABASE_USER"],
            password=os.environ["DATABASE_PASS"],
            database=os.environ["DATABASE_NAME"]
        ) as db:
            cursor = db.cursor()
            cursor.execute(query)
            row_headers=[x[0] for x in cursor.description]
            results = cursor.fetchall()
            db.commit()
            db.close()
            if(results is not None):
                return sqlToJson(results,row_headers)
            else:
                print("none")
    except Error as err:
        raise err

def execute_query2(query):
    try:
        with connect(
            host=os.environ["DATABASE_HOST"],
            port=os.environ["DATABASE_PORT"],
            user=os.environ["DATABASE_USER"],
            password=os.environ["DATABASE_PASS"],
            database=os.environ["DATABASE_NAME"]
        ) as db:
            cursor = db.cursor()
            cursor.execute(query)
            row_headers=[x[0] for x in cursor.description]
            results = cursor.fetchall()
            db.commit()
            db.close()
            if(results is not None):
                return sqlToJson(results, row_headers)
            else:
                print("none")
    except Error as err:
        raise err