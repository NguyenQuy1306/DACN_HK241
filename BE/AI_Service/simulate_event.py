# simulate_event.py

import redis
import json

r = redis.Redis(host='localhost', port=6379, db=0)

event = {
    "user_id": "u001",
    "restaurant_id": "r001",
    "time_spent": 45,
    "liked": 1,
    "clicked": 1
}

r.publish('user_behavior', json.dumps(event))
print("📤 Sent event to Redis")
