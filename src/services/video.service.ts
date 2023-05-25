/* eslint-disable @typescript-eslint/ban-types */
import clientRequest from "@/utils/axiosConfig"
import { AxiosProgressEvent } from "axios";

export const videoUpload = async (formData: object,setProgress: Function)=>{
    const res = await clientRequest.post('/api/video',{formData}, {onUploadProgress: (progressEvent: AxiosProgressEvent)=>{
        if(progressEvent.loaded && progressEvent.total){
            const complete =Number(Math.floor(progressEvent.loaded / progressEvent.total) * 100);
            setProgress(complete);
        }
    }});
    
    return res;
}