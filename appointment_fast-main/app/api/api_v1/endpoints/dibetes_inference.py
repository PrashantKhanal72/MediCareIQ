from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from ....models import PKLModelLoader
import numpy as np

router = APIRouter()



class DibetesRequest(BaseModel):
   noOfPregnencies : float
   glucoseLevel : float
   currentBloodPressure : float
   bMI : float
   diabetesPedigreeFunction : float
   age : float

@router.post("/dibetes/predict/", response_model=dict)
async def model2_predict(request: DibetesRequest):
    try:
        model = PKLModelLoader.models["dibetes"]
        if not model:
            raise HTTPException(status_code=404, detail="Model not found")
        to_predict = np.array([
            request.noOfPregnencies,
            request.glucoseLevel,
            request.currentBloodPressure,
            request.bMI,
            request.diabetesPedigreeFunction,
            request.age,
        ]).reshape(1, 6)
        # Ensure the data is in the correct shape (e.g., a 2D array for scikit-learn models)
        predictions = model.predict(to_predict)

        return JSONResponse(content={"prediction": predictions.tolist()})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
