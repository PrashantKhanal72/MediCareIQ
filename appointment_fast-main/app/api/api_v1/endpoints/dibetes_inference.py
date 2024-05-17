from fastapi import APIRouter, HTTPException
from pydantic import BaseModel # Import BaseModel from Pydantic for data validation
from fastapi.responses import JSONResponse # Import JSONResponse to customize response data
from ....models import PKLModelLoader  # Import a custom module to load machine learning models
import numpy as np

router = APIRouter() # Create a router object to handle API routes requests.



class DibetesRequest(BaseModel): # Define a data model for the API request using Pydantic
   noOfPregnencies : float
   glucoseLevel : float
   currentBloodPressure : float
   bMI : float
   diabetesPedigreeFunction : float
   age : float

# Define a POST route will receive requests
@router.post("/dibetes/predict/", response_model=dict) 

# Asynchronous function to handle predictions
async def model2_predict(request: DibetesRequest):
    try:
        model = PKLModelLoader.models["dibetes"] # Load the diabetes prediction model
        if not model:
            raise HTTPException(status_code=404, detail="Model not found")
        to_predict = np.array([ # Prepare the input data by converting request data into a numpy array
            request.noOfPregnencies,
            request.glucoseLevel,
            request.currentBloodPressure,
            request.bMI,
            request.diabetesPedigreeFunction,
            request.age,
        ]).reshape(1, 6)
        
        predictions = model.predict(to_predict)  # Make a prediction

         #Convert numpy data to list to ensure JSON compatibility.
        return JSONResponse(content={"prediction": predictions.tolist()}) # Return predictions as JSON
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
