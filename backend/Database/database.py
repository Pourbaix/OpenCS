## Loading .env variables
import os 
from dotenv import load_dotenv

load_dotenv()

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine import URL

DATABASE_URL = URL.create(
    drivername="postgresql",
    username=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host="localhost",
    port=5432,
    database=os.getenv("DB_NAME"),
)

engine = create_engine(
    DATABASE_URL
)

Session = sessionmaker(bind=engine)