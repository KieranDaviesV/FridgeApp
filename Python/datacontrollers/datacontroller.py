from sqlalchemy import create_engine, text
import json
from .dcutils import result_to_array
import os

db_string = "postgres://postgres:Xl9xKmIYpUJnYewXmRoD@fooddb.cd9uhxmvgzkm.eu-west-2.rds.amazonaws.com/postgres"
# os.environ['DB_URL']

# gets recipes that the user id is following


def db_follower_recipes(user_id):
    db = create_engine(db_string)
    if user_id is None:
        raise Exception("user_id undefined")
    try:
        sql = text(
            "SELECT users.*, recipes.recipe_name FROM users "
            "JOIN userfollowing uf ON uf.follower_id=users.id "
            "JOIN recipefollowing rf ON rf.follower_id=users.id "
            "JOIN recipes ON recipes.id=rf.recipe_id "
            "WHERE uf.followee_id=:user_id "
        )
        result_set = db.execute(
            sql, user_id=user_id
        )
        result = result_to_array(result_set)
        return result

    except Exception as identifier:
        raise Exception("Error getting recipes")


def db_follow_user(followee_id, follower_id, follow_table):
    db = create_engine(db_string)
    if followee_id is None:
        raise Exception("followee_id is undefined")
    if follower_id is None:
        raise Exception("follower_id is undefined")
    db.execute(
        text("INSERT INTO " + follow_table +
             " (follower_id, followee_id) VALUES (:follower_id ,:followee_id)"),
        follower_id=follower_id, followee_id=followee_id)
    return "Added"


def db_create_user(first_name, last_name):
    db = create_engine(db_string)
    if first_name is None:
        raise Exception("first_name is undefined")
    if last_name is None:
        raise Exception("last_name is undefined")
    db.execute(
        text("INSERT INTO users (first_name, last_name) VALUES(:first_name, :last_name)"),
        first_name=first_name, last_name=last_name)
    return "Added"
