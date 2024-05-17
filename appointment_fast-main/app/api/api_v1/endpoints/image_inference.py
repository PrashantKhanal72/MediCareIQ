from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
# used for  preparing images for model input.
from tensorflow.keras.preprocessing import image
# PIL is used for opening and manipulating images.
from PIL import Image
import numpy as np
from io import BytesIO # BytesIO is used for handling binary data in memory.
from ....models import ModelLoader

from pydantic import BaseModel
router = APIRouter()  # Creates a new router instance for routing specific paths.

 # Defines a request model
class Model1Request(BaseModel):
    pass

 # Defines a POST endpoint for fracture prediction.
@router.post("/fracture/predict")
async def model1_predict_image(file: UploadFile = File(...)):
    try:
         # Convert the file contents directly into a BytesIO object for image processing.
        contents = await file.read()
        img_bytes = BytesIO(contents)

        # Open the image using PIL, directly from memory.
        img = Image.open(img_bytes)
        img = img.resize((224, 224))  

        # Add an extra dimension to the array, converting it from (224, 224, 3) to (1, 224, 224, 3)
        # This is required because models expect a batch of images, not a single image.
       
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0) 

       
        model = ModelLoader.models["fracture"]
        prediction = model.predict(img_array)

        # Create and return a JSON response with the prediction results converted from NumPy array to list.
        return JSONResponse(content={"prediction": prediction.tolist()})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await file.close()  

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