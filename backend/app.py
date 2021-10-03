from flask import Flask
from dotenv import load_dotenv
from mysql.connector import connect, Error
import os

load_dotenv()
app = Flask(__name__)
app.config["DEBUG"] = True

@app.route("/")
def hello():
    return "<p>Hello</p>"

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
            results = cursor.fetchall()
            db.commit()
            db.close()
            if(results is not None):
                return results
    except Error as err:
        raise err