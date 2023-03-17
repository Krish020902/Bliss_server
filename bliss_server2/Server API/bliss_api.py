from flask import Flask, jsonify
from sqlalchemy.orm import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, Date, Time, Float, text
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST")
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASS")
app.config['MYSQL_DB'] = os.getenv("MYSQL_DB")
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['MYSQL_PORT'] = 3306
db_url = f"mysql://{app.config['MYSQL_USER']}:{app.config['MYSQL_PASSWORD'] }@{app.config['MYSQL_HOST']}/{app.config['MYSQL_DB']}"

# create an SQLAlchemy engine and connect to the database

engine = create_engine(db_url)

# create a base class for our dynamic model classes
Base = declarative_base()

# # define a dynamic model class based on the 'users' table
# class Vol(Base):
#     __tablename__ = 'vol'

#     entry_number = Column(Integer, primary_key=True, autoincrement=True)
#     date = Column(Date, nullable=False)
#     Time = Column(Time, nullable=False)
#     expiry_date = Column(String(30), nullable=False)
#     equity = Column(String(10), nullable=False)
#     spot = Column(String(10), nullable=False)
#     s_high = Column(String(10), nullable=False)
#     s_low = Column(String(10), nullable=False)
#     s_open = Column(String(10), nullable=False)
#     s_close = Column(String(10), nullable=False)
#     week52_high = Column(String(10), nullable=False,name='52week_high')
#     week52_low = Column(String(10), nullable=False,name='52week_low')
#     ATM = Column(Float, nullable=False)
#     ATM_price = Column(Float, nullable=False)
#     ATM_vol = Column(Float, nullable=False)
#     days_of_expire = Column(String(10), nullable=False)
#     volume = Column(Float, nullable=False)
#     delta = Column(Float, nullable=False)
#     vega = Column(Float, nullable=False)
#     theta = Column(Float, nullable=False)
#     gamma = Column(Float, nullable=False)


@app.route('/get_intraday_iv/<table_name>', methods=["GET"])
def get_intraday_data(table_name):
    with engine.connect() as conn:
        qry = text('SELECT * FROM vol_' + table_name + " limit 10")
        print(qry)
        result = conn.execute(qry)

    # print(result.first())
    iv_data = []
    print(result.keys())
    for row in result.fetchall():
        print(row.spot)
        single_data = {}
        single_data['date'] = row.date.strftime("%Y-%m-%d")
        single_data['time'] = str(row.Time)
        single_data['ATM_vol'] = row.ATM_vol
        # KeyView(['entry_number', 'date', 'Time', 'expiry_date', 'equity', 'spot', 's_high', 's_low', 's_open', 's_close', '52week_high', '52week_low', 'ATM', 'ATM_price', 'ATM_vol', 'days_of_expire', 'volume', 'delta', 'vega', 'theta', 'gamma'])
        iv_data.append(single_data)

    print(iv_data)

    return {'iv_data': iv_data}


@app.route('/get_daily_iv/<table_name>', methods=["GET"])
def get_daily_data(table_name):
    with engine.connect() as conn:
        qry = text('SELECT * FROM nse_vol_' + table_name + " limit 10")
        print(qry)
        result = conn.execute(qry)

    # print(result.first())
    iv_data = []
    print(result.keys())
    for row in result.fetchall():
        print(row.spot)
        single_data = {}
        single_data['date'] = row.date.strftime("%Y-%m-%d")
        single_data['time'] = str(row.Time)
        single_data['ATM_vol'] = row.ATM_vol
        # KeyView(['entry_number', 'date', 'Time', 'expiry_date', 'equity', 'spot', 's_high', 's_low', 's_open', 's_close', '52week_high', '52week_low', 'ATM', 'ATM_price', 'ATM_vol', 'days_of_expire', 'volume', 'delta', 'vega', 'theta', 'gamma'])
        iv_data.append(single_data)

    print(iv_data)

    return {'iv_data': iv_data}


@app.route('/getCompanies', methods=["GET"])
def get_all_companies():
    with engine.connect() as conn:
        qry = text('SELECT * FROM companies')
        print(qry)
        result = conn.execute(qry)

    # print(result.first())
    companies = []
    print(result.keys())
    for row in result.fetchall():

        single_data = {}
        single_data['c_name'] = str(row.c_name)
        single_data['d_name'] = str(row.d_name)
        single_data['lot_size'] = row.lot_size
        single_data['sector'] = row.Sector
        single_data['market_cap'] = row.Market_Cap
        single_data['nifty50'] = row.Nifty50

        # KeyView(['entry_number', 'date', 'Time', 'expiry_date', 'equity', 'spot', 's_high', 's_low', 's_open', 's_close', '52week_high', '52week_low', 'ATM', 'ATM_price', 'ATM_vol', 'days_of_expire', 'volume', 'delta', 'vega', 'theta', 'gamma'])
        companies.append(single_data)

    print(companies)

    return {'data': companies}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
