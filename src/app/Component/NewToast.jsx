import toast from "react-hot-toast";


export const showToastSuccess = (message) => {
    toast.success(message);
  };
  
  export const showToastError = ( error, message) => {
    if(error.response===undefined){
      toast.error(message);}
    else if(error.response.status===400){
      toast.error(error.response.data);
    }else{
    toast.error(message);
    }
  };