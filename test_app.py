import unittest
import json
from app import app

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_get_polls(self):
        res = self.client.get("/api/polls")
        self.assertEqual(res.status_code, 200)
        self.assertIsInstance(res.get_json(), list)

    def test_create_poll(self):
        poll = {
            "title": "Test Poll",
            "questions": [
                {"text": "Q1?", "options": ["A", "B"], "votes": [0, 0]}
            ]
        }
        res = self.client.post("/api/polls", data=json.dumps(poll), content_type='application/json')
        self.assertEqual(res.status_code, 201)

    def test_vote(self):
        res = self.client.post("/api/vote/0", data=json.dumps([1]), content_type='application/json')
        self.assertEqual(res.status_code, 200)

    def test_get_results(self):
        res = self.client.get("/api/results/0")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIn("title", data)

if __name__ == '__main__':
    unittest.main(verbosity=2)