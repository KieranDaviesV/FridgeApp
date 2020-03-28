#turns result object into an array of results
def result_to_array(sql_result):
    result = []
    for row in sql_result:
        result_row = {}
        for col in row.keys():
            result_row[str(col)] = str(row[col])
        result.append(result_row)
    return result