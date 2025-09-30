from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- Route halaman utama ---
@app.route("/")
def index():
    return "Invitro Dashboard Backend Aktif "


# --- API data sensor (sementara pake dummy)
@app.route("/api/sensors")
def get_all_sensors():
    data = {
        "ph": 7.2,
        "suhu": 27.5,
        "ch4": 15.3,
        "co2": 22.1,
        "h2": 6.8,
        "panas_air": 65.0,
        "tekanan_udara": 45.2
    }
    return jsonify(data)


# --- API per parameter
@app.route("/api/sensors/<parameter>")
def get_sensor(parameter):
    dummy_data = {
        "ph": 7.2,
        "suhu": 27.5,
        "ch4": 15.3,
        "co2": 22.1,
        "h2": 6.8,
        "panas_air": 65.0,
        "tekanan_udara": 45.2
    }

    if parameter in dummy_data:
        return jsonify({parameter: dummy_data[parameter]})
    else:
        return jsonify({"error": "Parameter tidak ditemukan"}), 404


if __name__ == "__main__":
    app.run(debug=True)
