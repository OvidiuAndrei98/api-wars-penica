from psycopg2._psycopg import cursor
from typing import List, Dict

from psycopg2 import sql
from psycopg2.extras import RealDictCursor

import connection


# @connection.connection_handler
# def get_planets(cursor: RealDictCursor, action_type=None):
#     if action_type == "next":
#         value = 10
#     else:
#         value = 0
#     query = """
#             SELECT *
#             FROM PLANETS
#             LIMIT 10
#             OFFSET %(value)s
#             """
#     values = {
#         "value":value
#     }
#
#     cursor.execute(query, values)
#     return cursor.fetchall()

