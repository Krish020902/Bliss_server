from flask import Flask,redirect, url_for, render_template
from flask_sqlalchemy  import SQLAlchemy
from dotenv import load_dotenv
from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL



from flask_jwt_extended import JWTManager, jwt_required, create_access_token
load_dotenv()
import os
app = Flask(__name__)

app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST");
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER");
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASS");
app.config['MYSQL_DB'] = os.getenv("MYSQL_DB");
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['MYSQL_PORT'] = 3306;
db_url = f"mysql://{app.config['MYSQL_USER']}:{app.config['MYSQL_PASSWORD'] }@{app.config['MYSQL_HOST']}/{app.config['MYSQL_DB']}"
print(db_url)
app.config['SQLALCHEMY_DATABASE_URI'] =  db_url 
#'mysql://username:password@localhost/db_
db = SQLAlchemy(app)
CORS(app, resources={r'/*': {'origins': '*'}})

app.config['JWT_SECRET_KEY'] = 'bliss-secret'







# class Dummy_data(db.Model):
#     entry_number = db.Column(db.String(20), primary_key=True);
#     date = db.Column(db.String(20), nullable=False);
#     time = db.Column(db.String(20), nullable=False);
#     expiry_date = db.Column(db.String(20), nullable=False);
#     equity = db.Column(db.String(20), nullable=False);
#     spot = db.Column(db.String(20), nullable=False);
#     ATM = db.Column(db.String(20), nullable=False);
#     ATM_price = db.Column(db.String(20), nullable=False);
#     ATM_vol = db.Column(db.String(20), nullable=False);
#     days_of_expire = db.Column(db.String(20), nullable=False);
#     volume = db.Column(db.String(20), nullable=False);
#     delta = db.Column(db.String(20), nullable=False);
#     vega = db.Column(db.String(20), nullable=False);
#     theta = db.Column(db.String(20), nullable=False);

#     def __init__(self, entry_number, date, time, expiry_date, equity, spot, ATM, ATM_price, ATM_vol, days_of_expire, volume, delta, vega, theta):
#         self.entry_number = entry_number;
#         self.date = date;
#         self.time = time;
#         self.expiry_date = expiry_date;
#         self.equity = equity;
#         self.spot = spot;
#         self.ATM = ATM;
#         self.ATM_price = ATM_price;
#         self.ATM_vol = ATM_vol;
#         self.days_of_expire = days_of_expire;
#         self.volume = volume;
#         self.delta = delta;
#         self.vega = vega;
#         self.theta = theta;


class Company(db.Model):
    __tablename__ = 'companies'
    c_name = db.Column(db.String(50), primary_key=True, nullable=False)
    d_name = db.Column(db.String(50), nullable=False)
    lot_size = db.Column(db.Integer, nullable=False)
    sector = db.Column(db.String(25), nullable=False)
    market_cap = db.Column(db.String(15), nullable=False)
    nifty50 = db.Column(db.String(5), nullable=False)

    def __init__(self, c_name, d_name, lot_size, sector, market_cap, nifty50):
        self.c_name = c_name;
        self.d_name = d_name;
        self.lot_size = lot_size;
        self.sector = sector;
        self.market_cap = market_cap;
        self.nifty50 = nifty50;






@app.route("/getCompanies", methods=["GET"])
def get_all_companies():
    users = Company.query.all();
    output = []
    
    try:
        for user in users: 
            data = {}
            data['c_name'] = user.c_name;
            data['d_name'] = user.d_name;
            data['lot_size'] = user.lot_size;
            data['sector'] = user.sector;
            data['market_cap'] = user.market_cap;
            data['nifty50'] = user.nifty50;
            output.append(data);
        return jsonify({"data" : output});
    except Exception as e :
        return jsonify({'message': str(e)}) 






    

    





if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.getenv("PORT"), debug=True);        


