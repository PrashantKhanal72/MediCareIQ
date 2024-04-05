const ViewPresciption = ({ data }) => {
  return (
    <div className="w-full h-full overflow-y-auto max-h-[500px]  mt-2">
      {data?.map((item, index) => {
        return <div>
              <p className="text-[17px]">{index+1}) {item?.description}</p> 
          </div>
      })}
    </div>
  );
};

export default ViewPresciption;
