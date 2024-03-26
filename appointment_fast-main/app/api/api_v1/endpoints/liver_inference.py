from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from ....models import PKLModelLoader

router = APIRouter()



class LiverRequest(BaseModel):
   totalBilirubin :float
   directBilirubin :float
   alkalinePhosphotase :float
   alamineAminotransferase :float
   totalProtiens :float
   albumin :float
   albuminGlobulinRatio :float

@router.post("/liver/predict/", response_model=dict)
async def model2_predict(request: LiverRequest):
    try:
        model = PKLModelLoader.models["liver"]
        if not model:
            raise HTTPException(status_code=404, detail="Model not found")
        
        # Ensure the data is in the correct shape (e.g., a 2D array for scikit-learn models)
        predictions = model.predict([[
            request.totalBilirubin,
            request.directBilirubin,
            request.alkalinePhosphotase,
            request.alamineAminotransferase,
            request.totalProtiens,
            request.albumin,
            request.albuminGlobulinRatio,
        ]])

        return JSONResponse(content={"prediction": predictions.tolist()})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
