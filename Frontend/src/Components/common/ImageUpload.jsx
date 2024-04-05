import React, { useEffect, useState } from "react";
import ImageUpdater from "./ImageUpdater";

const ImageUpload = ({
  children,
  setValue,
  register,
  name,
  watch,
  image
}) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if ( watch(name) && watch(name).length > 0) {
      setImageUrl(URL.createObjectURL(watch(name)[0]));
    }
  }, [watch(name)]);

  useEffect(()=> {
     if(image){
      setImageUrl(image)
     }
  },[image])

  return (
    <div className="px-[34px] flex flex-col gap-2 justify-center items-center py-6">
      <div
        className="border-dashed border-black flex justify-center items-center
        border-[1px] rounded-2xl h-[134px] w-[212px] text-secondary-black"
      >
        {/* {watch("image") && watch("image").length > 0 ? ( */}
        {imageUrl ? (
          <img src={imageUrl} alt="document" className="h-[94px] w-[94px]" />
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              // setIsDragging(true);
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (
                e &&
                e.dataTransfer &&
                e.dataTransfer.files &&
                e.dataTransfer.files.length
              ) {
                setValue(name, e.dataTransfer.files);
              }
              // {
              //   Array.from(e.dataTransfer.files).forEach((file) => {
              //     file.uid = uuidv4();
              //     handleFilesAdd({ file });
              //   });
              // }
            }}
            onDragEnter={(e) => {
              e.preventDefault();
            }}
            onDragLeave={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col items-center justify-between gap-2"
          >
            <div className="flex flex-col items-center justify-between gap-1">
              <p>Drag and drop or</p>
            </div>
            <ImageUpdater name={name} register={register}>
              <div className="px-4 py-2  text-xs font-medium rounded-lg hover:cursor-pointer bg-background text-white bg-black">
                Upload an image
              </div>
            </ImageUpdater>
          </div>
        )}
      </div>
      {watch(name) && watch(name).length > 0 && (
        <div className="flex items-center gap-6">
          <p
            onClick={() => {
              setValue(name, null);
               setImageUrl("");
            }}
            className="text-xs underline text-secondary-black hover:cursor-pointer"
          >
            Cancel
          </p>
          {/* <button
            onClick={() => {
              setDisableBtn && setDisableBtn(true);
              onDocumentSubmit && onDocumentSubmit(watch(name));
            }}
            className="px-8 py-3 ml-auto text-white w-fit mt-10 rounded bg-green-500"
          >
            Save
          </button> */}
        </div>
      )}
      {(!watch(name) || watch(name).length === 0) && <>{children}</>}
    </div>
  );
};

export default ImageUpload;
