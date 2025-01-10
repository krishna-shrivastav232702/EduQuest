import { useState } from "react";
import axios from "axios";

interface PresignedUrlResponse{
    url:string;
    fields:{[key:string]:string};
}


const FileUpload:React.FC = ()=>{
    const [file,setFile] = useState<File | null>(null);
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = async () =>{
        if(!file){
            alert("Please select a file to upload");
            return;
        }
        const filename = file.name;
        const contentType = file.type;

        try {
            const response = await axios.post<PresignedUrlResponse>('http://localhost:7008/pdf/getPresignedUrl',{filename,contentType});
            const {url} = response.data;
            await uploadFileToS3(file,url);
        } catch (error) {
            console.error("Error Fetching Presigned Url",error);
        }
    };

    const uploadFileToS3 = async(file:File,url:string)=>{
        const formData = new FormData();
        formData.append("file",file);
        try {
            await axios.put(url,formData,{
                headers:{
                    "Content-Type":file.type,
                }
            });
            alert("file uploaded successfully");
        } catch (error) {
            console.log("Error uploading file to s3",error);
            alert("Error uploading file");
        }
    }


    return(
        <div>
            <input 
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            />
            <button onClick={handleUploadClick}>Upload</button> 
        </div>
    )
}

export default FileUpload