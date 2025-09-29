from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import joblib
import pandas as pd
import numpy as np
import traceback
from colorama import init, Fore
init(autoreset=True)

# ----------------------------------
# App + CORS setup
# ----------------------------------
app = Flask(__name__)

CORS_ORIGINS = [
    "http://localhost:5173",   # React frontend
    "http://localhost:4000",   # Node.js backend
    "http://127.0.0.1:3000",
    "http://127.0.0.1:4000"
]

CORS(app, resources={r"/*": {"origins": CORS_ORIGINS}}, supports_credentials=True)

@app.after_request
def after_request(response):
    """ Ensure CORS headers are always returned """
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE")
    return response

# ----------------------------------
# Load models and utils
# ----------------------------------
# ----- LOADING NECESSARY COMPONENTS -----
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

try:
    log_tnfr = joblib.load(os.path.join(BASE_DIR, 'model_utils', 'log_tnfr.joblib'))
    model = joblib.load(os.path.join(BASE_DIR, 'model_utils', 'yield_predictor.joblib'))
    print(Fore.GREEN + "All model components (transformer, preprocessor, model) loaded successfully!\n")
except FileNotFoundError as e:
    print(Fore.RED + f"CRITICAL: Model file not found. API cannot make predictions. Details: {e}\n")
    log_tnfr = preprocessor = model = None
except Exception as e:
    print(Fore.RED + f"CRITICAL: An error occurred during model loading: {e}\n")
    log_tnfr = preprocessor = model = None


# ----------------------------------
# Helper: handle preflight automatically
# ----------------------------------
def handle_preflight():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    return None

# ----------------------------------
# Routes
# ----------------------------------
@app.route('/predict/yield', methods=['POST', 'OPTIONS'])
def predict_yield():
    preflight = handle_preflight()
    if preflight: 
        return preflight

    try:
        data = request.get_json()
        input_df = pd.DataFrame([data])
        # processed_input = preprocessor.transform(input_df)
        prediction = model.predict(input_df)
        return jsonify({"yield": float(prediction[0])})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route('/recommend/crop', methods=['POST', 'OPTIONS'])
def recommend_crop():
    preflight = handle_preflight()
    if preflight:
        return preflight

    try:
        data = request.get_json()
        soil_features = np.array(data["soil_features"]).reshape(1, -1)
        prediction = log_tnfr.predict(soil_features)
        return jsonify({"recommended_crop": prediction[0]})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route('/identify/pest', methods=['POST', 'OPTIONS'])
def identify_pest():
    preflight = handle_preflight()
    if preflight:
        return preflight

    try:
        data = request.get_json()
        # TODO: replace with your actual pest model logic
        return jsonify({"identified_pest": "Example Pest"})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# ----------------------------------
# Run app
# ----------------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
