
def check_query(query_body,query_param):
    response_object = {
        "success": False,
        "result": ""
    }
    try:
        event_query = query_body["queryStringParameters"]
        if event_query is None:
            raise Exception("No Event Query Found")
        elif query_param in event_query:
            response_object['success'] = True
            response_object['result'] = event_query[query_param]
            pass
        else:
            raise Exception("Could not find param %s", query_param)
    except Exception as exc:
        response_object['result'] = str(exc)
        pass

    return response_object