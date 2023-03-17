from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
load_dotenv()
import os

app = Flask(__name__)

db  = SQLAlchemy(app)


app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST");
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER");
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASS");
app.config['MYSQL_DB'] = os.getenv("MYSQL_DB");
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['MYSQL_PORT'] = 3306;
db_url = f"mysql://{app.config['MYSQL_USER']}:{app.config['MYSQL_PASSWORD'] }@{app.config['MYSQL_HOST']}/{app.config['MYSQL_DB']}"
print(db_url)
app.config['SQLALCHEMY_DATABASE_URI'] =  db_url 



# for record in db.engine.execute('SELECT * FROM vol_acc;'):
#     print(record)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True);      