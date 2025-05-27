from flask import Flask, jsonify, request, render_template
import json
import os

app = Flask(__name__)

DATA_FILE = 'polls.json'

# ------------------- Utils -------------------
def load_polls():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_polls(polls):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(polls, f, indent=2, ensure_ascii=False)

# ------------------- Routes -------------------

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/polls', methods=['GET'])
def get_polls():
    return jsonify(load_polls())

@app.route('/api/polls', methods=['POST'])
def create_poll():
    polls = load_polls()
    data = request.json
    polls.append(data)
    save_polls(polls)
    return jsonify({'status': 'ok'}), 201

@app.route('/api/vote/<int:poll_id>', methods=['POST'])
def submit_vote(poll_id):
    polls = load_polls()
    if poll_id < 0 or poll_id >= len(polls):
        return jsonify({'error': 'Invalid poll ID'}), 400

    vote_data = request.json  # expects list of selected indices
    poll = polls[poll_id]

    for i, answer_index in enumerate(vote_data):
        if 0 <= answer_index < len(poll['questions'][i]['options']):
            poll['questions'][i]['votes'][answer_index] += 1

    save_polls(polls)
    return jsonify({'status': 'vote recorded'})

@app.route('/api/results/<int:poll_id>', methods=['GET'])
def get_results(poll_id):
    polls = load_polls()
    if poll_id < 0 or poll_id >= len(polls):
        return jsonify({'error': 'Invalid poll ID'}), 400
    return jsonify(polls[poll_id])

@app.route('/api/polls/<int:poll_id>', methods=['DELETE'])
def delete_poll(poll_id):
    polls = load_polls()
    if 0 <= poll_id < len(polls):
        deleted = polls.pop(poll_id)
        save_polls(polls)
        return jsonify({'status': 'deleted', 'title': deleted['title']})
    return jsonify({'error': 'Invalid poll ID'}), 400
# ------------------- Main -------------------
if __name__ == '__main__':
    app.run(debug=True)