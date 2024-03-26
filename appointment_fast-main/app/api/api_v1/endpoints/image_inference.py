from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
from io import BytesIO
from ....models import ModelLoader

from pydantic import BaseModel
router = APIRouter()

class Model1Request(BaseModel):
    # Define your request schema here
    pass


@router.post("/fracture/predict")
async def model1_predict_image(file: UploadFile = File(...)):
    try:
        # Convert the SpooledTemporaryFile to a BytesIO object
        contents = await file.read()
        img_bytes = BytesIO(contents)

        # Load the image using Pillow
        img = Image.open(img_bytes)
        img = img.resize((224, 224))  # Adjust the target size as needed for your model

        # Convert the image to a numpy array
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)  # Model expects a batch of images

        # Make prediction with the model
        model = ModelLoader.models["fracture"]
        prediction = model.predict(img_array)

        # Return the prediction
        return JSONResponse(content={"prediction": prediction.tolist()})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await file.close()  # Ensure the file is closed after operation

@router.post("/malaria/predict")
async def model1_predict_image(file: UploadFile = File(...)):
    try:
        # Convert the SpooledTemporaryFile to a BytesIO object
        contents = await file.read()
        img_bytes = BytesIO(contents)

        # Load the image using Pillow
        img = Image.open(img_bytes)
        img = img.resize((130, 130))  # Adjust the target size as needed for your model

        # Convert the image to a numpy array
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)  # Model expects a batch of images

        # Make prediction with the model
        model = ModelLoader.models["malaria"]
        prediction = model.predict(img_array)

        # Return the prediction
        return JSONResponse(content={"prediction": prediction.tolist()})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await file.close()  # Ensure the file is closed after operation