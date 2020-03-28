from sqlalchemy import create_engine, text
import json
from .dcutils import result_to_array
import os

db_string = os.environ['DB_URL']

#gets recipes that the user id is following
def get_follower_recipes(user_id):
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

    except expression as identifier:
        raise Exception("Error")
        
