from flask import Flask, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from dotenv import load_dotenv

load_dotenv()
import os
app = Flask(__name__)
mysql = MySQL(app)
app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST");
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER");
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASS");
app.config['MYSQL_DB'] = os.getenv("MYSQL_DB");
app.config['MYSQL_PORT'] = 3306;

@app.route("/<type>/<c_name>")
def get_all_company(type, c_name):
    cur = mysql.connection.cursor()
    if type == "intra_day":
        table_name = "vol_" + c_name;
        cur.execute("select * from " + table_name);
        res = cur.fetchall();
        return jsonify({"data": res})
    if type == "daily":
        table_name = "nse_vol_" + c_name;
        cur.execute("select * from " + table_name);
        res = cur.fetchall();
        return jsonify({"data": res})
