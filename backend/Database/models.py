from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, JSON, Table, ForeignKey
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

user_match = Table(
    "user_match",
    Base.metadata,
    Column("user_steamid", Integer, ForeignKey('users.steam_id')),
    Column("match_sharecode", String(35), ForeignKey('matches.sharecode'))
)

class User(Base):
    __tablename__ = "users"

    steam_id = Column(Integer, primary_key=True)
    match_tracking_code = Column(String(20), default=None, nullable=True)
    last_match_code = Column(String(35), default=None, nullable=True)
    created_on = Column(DateTime, default=datetime.now)
    updated_on = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    role = Column(Integer, default=0)

    matches = relationship('Match', secondary=user_match, back_populates='users')

class Match(Base):
    __tablename__ = "matches"

    sharecode = Column(String(35), primary_key=True)
    match_info = Column(JSON, nullable=True)
    created_on = Column(DateTime, default=datetime.now)
    updated_on = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    demo_url = Column(String, nullable=True, unique=True)

    users = relationship('User', secondary=user_match, back_populates='matches')




# db_user = User(steam_id=785)
# db_match = Match(sharecode="CSGO-145-047")
# db_user.matches.append(db_match)
# print(db_user.matches)
# print(db_match.users[0].steam_id)
# print(db_user.steam_id)