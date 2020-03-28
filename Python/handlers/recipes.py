import json
from datacontrollers.datacontroller import db_follower_recipes


def users_followed_recipes(event, context):
    response = {
        "statusCode": 200,
        "body": ""
    }
    try:
        event_query = event["queryStringParameters"]
        if event_query is None:
            raise Exception("No Event Query Found")
        elif "user_id" in event_query:

            user_id = event_query['user_id']
            results = db_follower_recipes(user_id)

            response["body"] = json.dumps(
                {"results": results, "message": "Retrieved recipes"})
        else:
            response["statusCode"] = 400
            response["body"] = json.dumps(
                {"results": "Could not get user_id", "message": "error has occured"})
        pass
    except Exception as exc:
        response["statusCode"] = 400
        response["body"] = json.dumps(
            {"results": str(exc), "message": "error has occured"})

        pass
    return response
