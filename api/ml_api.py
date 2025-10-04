# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import joblib
import pandas as pd
import numpy as np
import logging
from typing import List

# ----------------------------------
# App + CORS setup
# ----------------------------------
app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Only allow these origins
CORS_ORIGINS = [
    "https://agro-care-ai.vercel.app",  # React frontend
    "https://agrocare-ai-btf5.onrender.com",  # Node.js backend
    "http://127.0.0.1:3000",
    "http://127.0.0.1:4000"
]

CORS(app, resources={r"/*": {"origins": CORS_ORIGINS}}, supports_credentials=True)

# ----------------------------------
# Load models safely (Render-compatible)
# ----------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

log_tnfr = None
model = None

try:
    log_tnfr_path = os.path.join(BASE_DIR, 'model_utils', 'log_tnfr.joblib')
    model_path = os.path.join(BASE_DIR, 'model_utils', 'yield_predictor.joblib')
    
    log_tnfr = joblib.load(log_tnfr_path)
    model = joblib.load(model_path)
    logging.info("✅ All model components loaded successfully.")
except FileNotFoundError as e:
    logging.error(f"❌ Model file not found. Details: {e}")
except Exception as e:
    logging.error(f"❌ Error during model loading: {e}")

# ----------------------------------
# Health check endpoint
# ----------------------------------
@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"}), 200

# ----------------------------------
# Helpers
# ----------------------------------
def handle_preflight():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    return None

def validate_json(required_keys: List[str]):
    """Ensure JSON contains required keys."""
    data = request.get_json()
    if not data:
        raise ValueError("No JSON payload provided")
    for key in required_keys:
        if key not in data:
            raise ValueError(f"Missing key in JSON: {key}")
    return data

# ----------------------------------
# Routes
# ----------------------------------
@app.route('/predict/yield', methods=['POST', 'OPTIONS'])
def predict_yield():
    preflight = handle_preflight()
    if preflight:
        return preflight

    if not model:
        return jsonify({"error": "Yield prediction model not loaded"}), 500

    try:
        data = validate_json(required_keys=[])  # Update with required keys if needed
        input_df = pd.DataFrame([data])
        prediction = model.predict(input_df)
        return jsonify({"yield": float(prediction[0])})
    except Exception as e:
        logging.exception("Error in /predict/yield")
        return jsonify({"error": str(e)}), 500

@app.route('/recommend/crop', methods=['POST', 'OPTIONS'])
def recommend_crop():
    preflight = handle_preflight()
    if preflight:
        return preflight

    if not log_tnfr:
        return jsonify({"error": "Crop recommendation model not loaded"}), 500

    try:
        data = validate_json(required_keys=["soil_features"])
        soil_features = np.array(data["soil_features"]).reshape(1, -1)
        prediction = log_tnfr.predict(soil_features)
        return jsonify({"recommended_crop": prediction[0]})
    except Exception as e:
        logging.exception("Error in /recommend/crop")
        return jsonify({"error": str(e)}), 500

@app.route('/identify/pest', methods=['POST', 'OPTIONS'])
def identify_pest():
    preflight = handle_preflight()
    if preflight:
        return preflight

    try:
        data = validate_json(required_keys=[])  # replace with actual pest model keys
        # TODO: replace with actual pest prediction logic
        return jsonify({"identified_pest": "Example Pest"})
    except Exception as e:
        logging.exception("Error in /identify/pest")
        return jsonify({"error": str(e)}), 500

# ----------------------------------
# Run app (Render-compatible)
# ----------------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render sets this dynamically
    app.run(host="0.0.0.0", port=port, debug=False)
