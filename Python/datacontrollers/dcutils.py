#turns result object into an array of results
def result_to_array(sql_result):
    result = []
    for row in sql_result:
        result_row = {}
        for col in row.keys():
            result_row[str(col)] = str(row[col])
        result.append(result_row)
    return result

def join_array_to_parameters(list):
    list_length = len(list)
    string_value = ""
    for i in range(list_length):
        string_value += "'" + list[i] + "'"
        if i != list_length -1:
            string_value += " , "
    return string_value