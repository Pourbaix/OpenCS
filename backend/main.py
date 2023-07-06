from gevent import monkey
monkey.patch_all()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import match, user, auth

from Database.models import Base
from Database.database import engine, Session

# List of accepted origins for requests 
origins = [
    "*"
]

# Sync database and ORM
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

# middleware for CORS (les trucs chiants en gros :) )
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Importing all routes
app.include_router(match.router, prefix="/match")
app.include_router(user.router, prefix="/user")
app.include_router(auth.router, prefix="/auth")
