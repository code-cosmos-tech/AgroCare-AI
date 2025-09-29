from joblib import load
import pandas as pd

log_tnfr = load('model_utils/log_tnfr.joblib')
model = load('model_utils/yield_predictor.joblib')

# Prepare input data
input_values = pd.DataFrame(
    [[ 'Dry chillies', 'Whole Year', 'Assam', 13587, 2051.4, 1293074.79, 4211.97]],  # Single row of raw data
    columns=[
        'Crop', 'Season', 'State', 'Area', 'Annual_Rainfall',
        'Fertilizer_Per_Hectare', 'Pesticide_Per_Hectare'
    ]
)

# Predict using raw input
log_prediction = model.predict(input_values)
print("Log prediction:", log_prediction)

# Inverse transform the prediction to original scale
prediction = log_tnfr.inverse_transform(log_prediction.reshape(-1, 1))

print("Final prediction:", prediction[0][0])

# Wheat,1998,Rabi,Assam,89591,90509,2354.4,8851590.8,25981.39,0.999545455