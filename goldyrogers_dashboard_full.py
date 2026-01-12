
from flask import Flask, request, jsonify, render_template_string
import json
from datetime import datetime

app = Flask(__name__)
ALERTES_FILE = 'alertes.json'

HTML_TEMPLATE = '''
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>GoldyRogers Alerte Live</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #0f0f0f;
            color: #eee;
            padding: 2em;
        }
        h1 {
            color: #00ffd0;
        }
        .alert {
            background-color: #222;
            border-left: 4px solid #00ffd0;
            padding: 1em;
            margin: 1em 0;
            border-radius: 6px;
            box-shadow: 0 0 10px #00ffd044;
        }
        .time {
            color: #999;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <h1>📡 Alertes GoldyRogers (Wyckoff + RSI + Ichimoku)</h1>
    {% for a in alertes %}
    <div class="alert">
        <strong>{{ a.type }} détecté</strong> sur {{ a.pair }}<br>
        <span class="time">{{ a.time }}</span>
    </div>
    {% endfor %}
</body>
</html>
'''

def read_alertes():
    try:
        with open(ALERTES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def save_alerte(alert):
    alertes = read_alertes()
    alertes.insert(0, alert)
    # Limiter à 100 dernières alertes pour éviter un fichier trop volumineux
    alertes = alertes[:100]
    with open(ALERTES_FILE, 'w', encoding='utf-8') as f:
        json.dump(alertes, f, indent=2, ensure_ascii=False)

@app.route("/", methods=["GET"])
def dashboard():
    alertes = read_alertes()
    return render_template_string(HTML_TEMPLATE, alertes=alertes)

@app.route("/post", methods=["POST"])
def post_alerte():
    if not request.is_json:
        return jsonify({"status": "error", "message": "Content-Type must be application/json"}), 400
    
    data = request.json or {}
    new_alert = {
        "type": data.get("type", "INCONNU"),
        "pair": data.get("pair", "XBRUSD"),
        "time": datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")
    }
    save_alerte(new_alert)
    return jsonify({"status": "ok", "received": new_alert}), 201

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)
