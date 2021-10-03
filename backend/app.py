from flask import Flask, request
from dotenv import load_dotenv
from mysql.connector import connect, Error
import json
import os

load_dotenv()
app = Flask(__name__)
app.config["DEBUG"] = True

def sqlToJson(res, head):
    json_data=[]
    for result in res:
          json_data.append(dict(zip(head,result)))
    return json.dumps(json_data)

def classNameToID(name, period):
    return json.loads(execute_query(f'SELECT id FROM Classes WHERE name="{name}" AND period={period} LIMIT 0, 1;'))['id']

@app.route("/")
def hello():
    return "<p>Hello</p>"

@app.route("/login/<string:username>")
def login():
    return execute_query(f'SELECT id FROM Teachers WHERE name="{username}" LIMIT 1;')

@app.route("/events")
def events():
    return execute_query('SELECT * FROM Deadlines;')

@app.route("/events/create", methods=['POST'])
def createEvent():
    date = f'{request.form["year"]}-{request.form["month"]}-{request.form["day"]}'
    name = request.form["name"]
    description = request.form["description"]
    class_id = classNameToID(request.form["name"], request.form["period"])
    execute_query(f'INSERT INTO Deadlines (date, class_id, name, description) VALUES ("{date}", "{class_id}", "{name}", "{description}");')

@app.route("/density/<int:teachid>")
def density():
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
    except Error as err:
        raise err