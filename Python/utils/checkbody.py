import logging
import json

log = logging.getLogger()
log.setLevel(logging.DEBUG)

def check_create_user(body_object):
    first_name = None
    last_name = None
    error_msgs = []
    if body_object != None:
        try:
            first_name = body_object.get('first_name')
            last_name = body_object.get('last_name')
            pass
        except Exception as exc:
            log.error(str(exc))
            pass
    log.debug("f_name: %s l_name: %s", first_name, last_name)
    if first_name is None:
        error_msgs.append("first_name required")
    if last_name is None:
        error_msgs.append("last_name required")
    if len(error_msgs) > 0:
        return {
            "success": False,
            "results": body_object
        }
    else:
        user_object = {
            "first_name": first_name,
            "last_name": last_name
        }
        return {
            "success": True,
            "results": user_object
        }


# p = check_create_user({"first_name": "l"})
# print(p)