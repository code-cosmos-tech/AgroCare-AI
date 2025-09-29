#!/usr/bin/env python3
"""
Farm Management Machine Learning API
=====================================
Flask server for handling ML tasks including crop yield prediction,
crop recommendation, and pest identification.

Author: Jay Dholu
Email: jaydholu074@gmail.com
Version: 1.0.0
Feel free to reach me out ;) at anytime
"""


import os
import json
import logging
from datetime import datetime
from typing import Dict, Any, Optional

# Flask imports
from flask import Flask, request, jsonify
from flask_cors import CORS

# For future ML implementations
import numpy as np
import random

# Configuration
# =============
class Config:
    """Application configuration class"""
    DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true'
    PORT = int(os.environ.get('PORT', 5000))
    HOST = os.environ.get('HOST', '0.0.0.0')
    
    # CORS settings
    CORS_ORIGINS = [
        'http://localhost:5173',  # React frontend
        'http://localhost:4000',  # Node.js backend
        'http://127.0.0.1:3000',
        'http://127.0.0.1:4000'
    ]
    
    # ML Model settings (for future use)
    MAX_IMAGE_SIZE = 10 * 1024 * 1024  # 10MB
    ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

# Initialize Flask App
# ====================
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
CORS(app, 
     origins=Config.CORS_ORIGINS,
     methods=['GET', 'POST', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization'],
     supports_credentials=True)

# Configure Logging
# =================
logging.basicConfig(
    level=logging.INFO if not app.config['DEBUG'] else logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Helper Functions
# ================

def validate_required_fields(data: Dict[str, Any], required_fields: list) -> Optional[str]:
    """
    Validate that all required fields are present in the request data
    
    Args:
        data: Request JSON data
        required_fields: List of required field names
        
    Returns:
        Error message if validation fails, None if successful
    """
    missing_fields = [field for field in required_fields if field not in data or data[field] is None]
    
    if missing_fields:
        return f"Missing required fields: {', '.join(missing_fields)}"
    
    return None

def create_success_response(message: str, data: Optional[Dict] = None) -> Dict[str, Any]:
    """Create a standardized success response"""
    response = {
        'success': True,
        'message': message,
        'timestamp': datetime.utcnow().isoformat() + 'Z'
    }
    
    if data:
        response['data'] = data
    
    return response

def create_error_response(message: str, status_code: int = 400) -> tuple:
    """Create a standardized error response"""
    response = {
        'success': False,
        'error': message,
        'timestamp': datetime.utcnow().isoformat() + 'Z'
    }
    
    return jsonify(response), status_code

# Mock ML Functions (Replace with actual ML models in production)
# ==============================================================

def predict_crop_yield_ml(soil_data: Dict[str, Any], weather_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Mock crop yield prediction using ML
    In production: Replace with actual ML model (scikit-learn, TensorFlow, etc.)
    """
    # Mock prediction logic
    base_yield = 4.5  # tons per hectare
    
    # Factor in soil nutrients (simplified)
    nitrogen_factor = min(soil_data.get('nitrogen', 50) / 50.0, 1.2)
    phosphorus_factor = min(soil_data.get('phosphorus', 30) / 30.0, 1.1)
    potassium_factor = min(soil_data.get('potassium', 40) / 40.0, 1.1)
    ph_factor = 1.0 if 6.0 <= soil_data.get('ph', 7.0) <= 7.5 else 0.9
    
    # Factor in weather (simplified)
    rainfall_factor = min(weather_data.get('rainfall', 800) / 800.0, 1.3)
    temperature_factor = 1.0 if 20 <= weather_data.get('temperature', 25) <= 30 else 0.9
    
    # Calculate predicted yield
    predicted_yield = (base_yield * nitrogen_factor * phosphorus_factor * 
                      potassium_factor * ph_factor * rainfall_factor * temperature_factor)
    
    # Add some randomness for realism
    predicted_yield *= (0.9 + random.random() * 0.2)  # ±10% variation
    
    return {
        'predicted_yield': round(predicted_yield, 2),
        'confidence': random.randint(75, 95),
        'yield_category': 'High' if predicted_yield > 5.0 else 'Medium' if predicted_yield > 3.5 else 'Low',
        'factors': {
            'nitrogen_impact': round((nitrogen_factor - 1) * 100, 1),
            'phosphorus_impact': round((phosphorus_factor - 1) * 100, 1),
            'potassium_impact': round((potassium_factor - 1) * 100, 1),
            'ph_impact': round((ph_factor - 1) * 100, 1)
        }
    }

def recommend_crop_ml(soil_data: Dict[str, Any], location_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Mock crop recommendation using ML
    In production: Replace with actual ML model
    """
    crops_database = [
        {
            'name': 'Rice',
            'suitability_score': 85,
            'optimal_conditions': {
                'nitrogen_range': [40, 80],
                'phosphorus_range': [30, 60],
                'ph_range': [6.0, 7.5],
                'rainfall_min': 700
            },
            'benefits': ['High yield potential', 'Good market demand', 'Suitable for clay soil'],
            'growing_season': '4-6 months'
        },
        {
            'name': 'Wheat',
            'suitability_score': 78,
            'optimal_conditions': {
                'nitrogen_range': [30, 60],
                'phosphorus_range': [20, 40],
                'ph_range': [6.0, 7.8],
                'rainfall_min': 400
            },
            'benefits': ['Lower water requirement', 'Good storage life', 'Multiple varieties'],
            'growing_season': '3-4 months'
        },
        {
            'name': 'Cotton',
            'suitability_score': 72,
            'optimal_conditions': {
                'nitrogen_range': [25, 50],
                'phosphorus_range': [15, 35],
                'ph_range': [5.5, 8.0],
                'rainfall_min': 500
            },
            'benefits': ['High economic value', 'Drought tolerant', 'Industrial demand'],
            'growing_season': '5-6 months'
        }
    ]
    
    # Simple scoring based on soil parameters
    nitrogen = soil_data.get('nitrogen', 50)
    phosphorus = soil_data.get('phosphorus', 30)
    ph = soil_data.get('ph', 7.0)
    
    best_crop = None
    best_score = 0
    
    for crop in crops_database:
        score = 0
        conditions = crop['optimal_conditions']
        
        # Score based on nitrogen
        if conditions['nitrogen_range'][0] <= nitrogen <= conditions['nitrogen_range'][1]:
            score += 25
        
        # Score based on phosphorus
        if conditions['phosphorus_range'][0] <= phosphorus <= conditions['phosphorus_range'][1]:
            score += 25
        
        # Score based on pH
        if conditions['ph_range'][0] <= ph <= conditions['ph_range'][1]:
            score += 25
        
        # Add base suitability score
        score += 25
        
        if score > best_score:
            best_score = score
            best_crop = crop.copy()
            best_crop['calculated_score'] = score
    
    return best_crop

def identify_pest_ml(image_data: str, plant_type: str = 'general') -> Dict[str, Any]:
    """
    Mock pest identification using ML
    In production: Replace with actual computer vision model (TensorFlow, PyTorch)
    """
    pest_database = [
        {
            'name': 'Aphids',
            'confidence': random.randint(85, 95),
            'category': 'Insect',
            'severity': 'Medium',
            'description': 'Small, soft-bodied insects that feed on plant sap',
            'symptoms': ['Curled leaves', 'Sticky honeydew', 'Yellowing'],
            'treatment': [
                'Spray with insecticidal soap',
                'Release ladybugs',
                'Use neem oil spray'
            ],
            'prevention': ['Regular inspection', 'Companion planting', 'Avoid over-fertilization']
        },
        {
            'name': 'Powdery Mildew',
            'confidence': random.randint(80, 93),
            'category': 'Fungal Disease',
            'severity': 'High',
            'description': 'Fungal disease causing white powdery coating on leaves',
            'symptoms': ['White powder on leaves', 'Leaf distortion', 'Premature leaf drop'],
            'treatment': [
                'Apply sulfur-based fungicide',
                'Improve air circulation',
                'Remove affected leaves'
            ],
            'prevention': ['Proper spacing', 'Avoid overhead watering', 'Choose resistant varieties']
        },
        {
            'name': 'Spider Mites',
            'confidence': random.randint(75, 88),
            'category': 'Arachnid',
            'severity': 'Medium',
            'description': 'Tiny mites that cause stippling and webbing on leaves',
            'symptoms': ['Fine webbing', 'Yellow stippling', 'Leaf bronzing'],
            'treatment': [
                'Increase humidity',
                'Use predatory mites',
                'Apply miticide if severe'
            ],
            'prevention': ['Maintain humidity', 'Regular watering', 'Avoid dusty conditions']
        }
    ]
    
    # Randomly select a pest for demo purposes
    identified_pest = random.choice(pest_database)
    
    return identified_pest

# API Routes
# ==========

@app.route('/')
def index():
    """Root endpoint - API information"""
    return jsonify({
        'name': 'Farm Management ML API',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': [
            'POST /predict/yield - Crop yield prediction',
            'POST /recommend/crop - Crop recommendation',
            'POST /identify/pest - Pest identification',
            'GET /health - Health check'
        ],
        'timestamp': datetime.utcnow().isoformat() + 'Z'
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify(create_success_response(
        'Farm Management ML API is healthy and running',
        {
            'server': 'Flask',
            'port': Config.PORT,
            'debug': app.config['DEBUG']
        }
    ))

# Machine Learning Endpoints
# ==========================

@app.route('/predict/yield', methods=['POST'])
def predict_yield():
    """
    Crop Yield Prediction Endpoint
    
    Expected JSON body:
    {
        "soil_data": {
            "nitrogen": 45,
            "phosphorus": 25,
            "potassium": 30,
            "ph": 6.8,
            "organic_matter": 2.5
        },
        "weather_data": {
            "temperature": 25,
            "humidity": 65,
            "rainfall": 800
        },
        "crop_type": "wheat",
        "area": 2.5
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return create_error_response('No JSON data provided')
        
        # Validate required fields
        required_fields = ['soil_data', 'weather_data', 'crop_type']
        validation_error = validate_required_fields(data, required_fields)
        if validation_error:
            return create_error_response(validation_error)
        
        # Validate soil_data structure
        soil_required = ['nitrogen', 'phosphorus', 'potassium', 'ph']
        soil_validation = validate_required_fields(data['soil_data'], soil_required)
        if soil_validation:
            return create_error_response(f"Soil data - {soil_validation}")
        
        # Validate weather_data structure
        weather_required = ['temperature', 'rainfall']
        weather_validation = validate_required_fields(data['weather_data'], weather_required)
        if weather_validation:
            return create_error_response(f"Weather data - {weather_validation}")
        
        # Perform ML prediction
        prediction_result = predict_crop_yield_ml(data['soil_data'], data['weather_data'])
        
        # Add additional context
        result_data = {
            'crop_type': data['crop_type'],
            'area_hectares': data.get('area', 1.0),
            'total_expected_yield': round(prediction_result['predicted_yield'] * data.get('area', 1.0), 2),
            **prediction_result
        }
        
        logger.info(f"Yield prediction completed for {data['crop_type']}: {prediction_result['predicted_yield']} tons/hectare")
        
        return jsonify(create_success_response(
            'Crop yield prediction completed successfully',
            result_data
        ))
        
    except Exception as e:
        logger.error(f"Error in yield prediction: {str(e)}")
        return create_error_response(f'Internal server error: {str(e)}', 500)

@app.route('/recommend/crop', methods=['POST'])
def recommend_crop():
    """
    Crop Recommendation Endpoint
    
    Expected JSON body:
    {
        "soil_data": {
            "nitrogen": 45,
            "phosphorus": 25,
            "potassium": 30,
            "ph": 6.8,
            "soil_type": "loamy"
        },
        "location_data": {
            "state": "Punjab",
            "district": "Amritsar",
            "rainfall": 800,
            "temperature": 25
        },
        "preferences": {
            "crop_category": "cereal",
            "market_preference": "local"
        }
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return create_error_response('No JSON data provided')
        
        # Validate required fields
        required_fields = ['soil_data', 'location_data']
        validation_error = validate_required_fields(data, required_fields)
        if validation_error:
            return create_error_response(validation_error)
        
        # Validate soil_data structure
        soil_required = ['nitrogen', 'phosphorus', 'potassium', 'ph']
        soil_validation = validate_required_fields(data['soil_data'], soil_required)
        if soil_validation:
            return create_error_response(f"Soil data - {soil_validation}")
        
        # Perform ML recommendation
        recommendation_result = recommend_crop_ml(data['soil_data'], data['location_data'])
        
        logger.info(f"Crop recommendation completed: {recommendation_result['name']} with score {recommendation_result['calculated_score']}")
        
        return jsonify(create_success_response(
            'Crop recommendation completed successfully',
            recommendation_result
        ))
        
    except Exception as e:
        logger.error(f"Error in crop recommendation: {str(e)}")
        return create_error_response(f'Internal server error: {str(e)}', 500)

@app.route('/identify/pest', methods=['POST'])
def identify_pest():
    """
    Pest and Disease Identification Endpoint
    
    Expected JSON body:
    {
        "image_data": "base64_encoded_image_string",
        "plant_type": "wheat",
        "symptoms": ["yellowing leaves", "spots on leaves"],
        "location": {
            "state": "Punjab",
            "climate": "tropical"
        }
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return create_error_response('No JSON data provided')
        
        # Validate required fields
        required_fields = ['image_data']
        validation_error = validate_required_fields(data, required_fields)
        if validation_error:
            return create_error_response(validation_error)
        
        # Basic image data validation
        image_data = data['image_data']
        if not image_data or len(image_data) < 100:  # Basic check for valid base64
            return create_error_response('Invalid or empty image data')
        
        # Perform ML identification
        plant_type = data.get('plant_type', 'general')
        identification_result = identify_pest_ml(image_data, plant_type)
        
        # Add additional context
        result_data = {
            'plant_type': plant_type,
            'analysis_date': datetime.utcnow().isoformat() + 'Z',
            **identification_result
        }
        
        logger.info(f"Pest identification completed: {identification_result['name']} ({identification_result['confidence']}% confidence)")
        
        return jsonify(create_success_response(
            'Pest identification completed successfully',
            result_data
        ))
        
    except Exception as e:
        logger.error(f"Error in pest identification: {str(e)}")
        return create_error_response(f'Internal server error: {str(e)}', 500)

# Error Handlers
# ==============

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return create_error_response('Endpoint not found', 404)

@app.errorhandler(405)
def method_not_allowed(error):
    """Handle 405 errors"""
    return create_error_response('Method not allowed', 405)

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    logger.error(f"Internal server error: {str(error)}")
    return create_error_response('Internal server error', 500)

# Development and Production Setup
# ================================

if __name__ == '__main__':
    print("🤖 Farm Management ML API Starting...")
    print("=" * 50)
    print(f"🌐 Server: http://{Config.HOST}:{Config.PORT}")
    print(f"🔬 Debug Mode: {Config.DEBUG}")
    print(f"🌱 Environment: {'Development' if Config.DEBUG else 'Production'}")
    print("=" * 50)
    print("📋 Available ML Endpoints:")
    print("   POST /predict/yield    - Crop yield prediction")
    print("   POST /recommend/crop   - Crop recommendation") 
    print("   POST /identify/pest    - Pest identification")
    print("   GET  /health          - Health check")
    print("=" * 50)
    
    # Run Flask app
    app.run(
        host=Config.HOST,
        port=Config.PORT,
        debug=Config.DEBUG,
        threaded=True
    )
    