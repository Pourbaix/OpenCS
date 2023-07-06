from sqlalchemy.orm import Session
from pydantic import Json
from typing import List

from . import models, schemas

############################################################
## User methods 
############################################################

def get_user(db: Session, target_steam_id: int):
    return db.query(models.User).filter(models.User.steam_id == target_steam_id).first()

def get_users_for_match(db: Session, target_share_code: str):
    return db.query(models.Match).filter(models.Match.sharecode == target_share_code).first().users

def create_user(db: Session, new_user_steam_id: int):
    if db.query(models.User).filter(models.User.steam_id == new_user_steam_id).first():
        return None
    else:
        new_user = models.User(steam_id = new_user_steam_id)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

def configure_user_match_tracking(db: Session, match_tracking_code: str, match_sharecode: str, target_user_steam_id: int):
    target_user = db.query(models.User).filter(models.User.steam_id == target_user_steam_id).first()
    if target_user:
        target_user.match_tracking_code = match_tracking_code
        target_user.last_match_code = match_sharecode
        db.commit()
        db.refresh(target_user)
        return target_user
    else:
        return None

def update_user_last_match(db: Session, target_steam_id: int, match_code: str):
    target_user = db.query(models.User).filter(models.User.steam_id == target_steam_id).first()
    if target_user:
        target_user.match_tracking_code = match_code
        db.commit()
        db.refresh(target_user)
        return target_user
    else:
        return None

############################################################
## Match methods 
############################################################

def get_match(db: Session, target_match_sharecode: str):
    return db.query(models.Match).filter(models.Match.sharecode == target_match_sharecode).first()

def create_match(db: Session, new_match_sharecode: str, new_match_info: Json, new_match_demo_url: str, new_match_steam_ids: List[int]):
    if db.query(models.Match).filter(models.Match.sharecode == new_match_sharecode).first():
        return None
    else:
        new_match = models.Match(sharecode=new_match_sharecode, match_info=new_match_info, demo_url=new_match_demo_url)
        new_match.users.extend(new_match_steam_ids)
        db.add(new_match)
        db.commit()
        db.refresh(new_match)
        return new_match

