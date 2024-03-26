from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.api_v1.router import api_router
from .models import ModelLoader,PKLModelLoader
from .api.api_v1.endpoints import image_inference, kidney_inference,liver_inference,dibetes_inference,heart_inference

app = FastAPI()

# Added CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    ModelLoader.load_model("fracture", "app/mlmodels/fracture_model.h5")
    ModelLoader.load_model("malaria", "app/mlmodels/malaria_detector.h5")
    PKLModelLoader.load_model("kidney", "app/mlmodels/Kidney.pkl")
    PKLModelLoader.load_model("liver", "app/mlmodels/Liver.pkl")
    PKLModelLoader.load_model("heart", "app/mlmodels/Heart.pkl")
    PKLModelLoader.load_model("dibetes", "app/mlmodels/Diabetes.pkl")

# Include the routers from the api_v1 
app.include_router(api_router, prefix="/api/v1")


app.include_router(image_inference.router, prefix="/api/v1")
app.include_router(kidney_inference.router, prefix="/api/v1")
app.include_router(liver_inference.router, prefix="/api/v1")
app.include_router(dibetes_inference.router, prefix="/api/v1")
app.include_router(heart_inference.router, prefix="/api/v1")

@app.get("/")
async def read_root():
    return {"message": "Hello World"}
