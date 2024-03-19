import moment from "moment";

export const timeFormatinAMPM = (time) => {
        // Parse the time using moment
  const times = time.split(':');
  console.log(times)
  if(times.length > 0 && times[0] > 11 ){
        return `${times[0]%12}:${times[1]} pm`
  }else if(times.length > 0 && times[0] < 11 ){
       return `${times[0]}:${times[1]} am`
  }
}