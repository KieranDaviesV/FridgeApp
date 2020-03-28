import json
from datacontrollers.datacontroller import db_follow_user

def follow_user(event, context):
    response = {
        "statusCode": 200,
        "body": ""
    }
    try:
        event_query = event["queryStringParameters"]
        if event_query is None:
            raise Exception("No Event Query Found")
        elif "follower_id" in event_query and "followee_id" in event_query:
            followee_id = event_query['followee_id']
            follower_id = event_query['follower_id']
            results = db_follow_user(followee_id, follower_id)
            response["body"] = json.dumps(
                {"results": results, "message": "Started following user"})
        else:
            response["statusCode"] = 400
            response["body"] = json.dumps(
                {"results": "follower_id or follower_id are missing", "message": "error has occured"})
        pass
    except Exception as exc:
        response["statusCode"] = 400
        response["body"] = json.dumps(
            {"results": str(exc), "message": "error has occured"})
        pass
    return response

#p = follow_user("","")
#print(p)
