import json
from datacontrollers.datacontroller import db_follower_recipes, db_get_recipes_by_ingredients
from utils.querycheck import check_query


def users_followed_recipes(event, context):
    response = {
        "statusCode": 200,
        "body": ""
    }
    query_check = check_query(event, "user_id")
    if query_check['success'] == True:
        user_id = query_check['result']
        results = db_follower_recipes(user_id)
        response["body"] = json.dumps(
            {"results": results, "message": "Retrieved recipes"})
        pass
    else:
        response['statusCode'] = 400
        response['body'] = json.dumps(
            {"results": query_check['result'], "message": "error has occured"})
        pass
    return response


def get_recipe_by_ingredients(event, context):
    response = {
        "statusCode": 200,
        "body": ""
    }
    query_check = check_query(event, "ingredients_list")
    if query_check['success'] == True:
        ingredients = query_check['result']
        results = db_get_recipes_by_ingredients(ingredients.split(","))
        response['body'] = json.dumps({"results": results, "message": "Retrieved Recipes"})
    else:
        response['statusCode'] = 400
        response['body'] = json.dumps({"results": query_check['result'],"message": "error has occured"})

    return response
