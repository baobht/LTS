/* eslint-disable @typescript-eslint/ban-types */
import clientRequest from "@/utils/axiosConfig"

export const videoUpload = async (setProgress: Function)=>{
    clientRequest.post('/api/video', {onUploadProgress: (progressEvent: ProgressEvent)=>{
        const complete =Number(Math.floor(progressEvent.loaded / progressEvent.total) * 100);
        setProgress(complete);
    }})
}