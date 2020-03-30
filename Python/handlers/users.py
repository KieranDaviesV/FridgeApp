import json
from utils.checkbody import check_create_user
from datacontrollers.datacontroller import db_create_user
import logging

log = logging.getLogger()
log.setLevel(logging.DEBUG)


def create_user(event, context):
    response = {
        "statusCode": 200,
        "body": ""
    }
    body = event.get('body')
    log.debug("body: %s", json.dumps(body))
    body_check = check_create_user(json.loads(body))
    
    if body_check['success'] is True:
        results = body_check['results']
        create = db_create_user(results['first_name'], results['last_name'])
        response['body'] = json.dumps(
            {"message": "Successfuly completed",
             "results": create})
    else:
        response_string = ",".join(body_check['results'])
        response['statusCode'] = 400
        response['body'] = json.dumps(
            {"message": "error has occured", "results": body_check})

    return response

# p = create_user({"body": {"first_name": "l"}}, "")
# print(p)
