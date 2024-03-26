import tensorflow as tf
from joblib import load

class ModelLoader:
    models = {}

    @classmethod
    def load_model(cls, model_name: str, model_path: str):
        if model_name not in cls.models:
            cls.models[model_name] = tf.keras.models.load_model(model_path)
        return cls.models[model_name]

# Example usage
# ModelLoader.load_model("model1", "path/to/model1.h5")
# ModelLoader.load_model("model2", "path/to/model2.h5")



class PKLModelLoader:
    models = {}

    @classmethod
    def load_model(cls, model_name: str, model_path: str):
        if model_name not in cls.models:
            try:
                cls.models[model_name] = load(model_path)
                print(f"Model {model_name} loaded successfully.")
            except Exception as e:
                print(f"Failed to load model {model_name}. Error: {e}")
        else:
            print(f"Model {model_name} is already loaded.")
        return cls.models[model_name]

# Example usage (uncomment and modify the path as needed)
# if __name__ == "__main__":
#     svm_model = ModelLoader.load_model("svm_model", "path/to/your/svm_model.pkl")

