from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from ....models import PKLModelLoader
import numpy as np
import joblib

router = APIRouter()

class KidneyRequest(BaseModel):
    bloodPressure: float
    specificGravity: float
    albumin: float  
    bloodSugarLevel: float
    redBloodCellsCount: float
    pusCellCount: float
    pusCellClumps: float

@router.post("/kidney/predict/", response_model=dict)
async def model2_predict(request: KidneyRequest):
    try:
        model = PKLModelLoader.models["kidney"]
        if not model:
            raise HTTPException(status_code=404, detail="Model not found")
        
        # Ensure the data is in the correct shape (e.g., a 2D array for scikit-learn models)
        predictions = model.predict([[
            request.bloodPressure,
            request.specificGravity,
            request.albumin,
            request.bloodSugarLevel,
            request.redBloodCellsCount,
            request.pusCellCount,
            request.pusCellClumps,
        ]])

        return JSONResponse(content={"prediction": predictions.tolist()})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



