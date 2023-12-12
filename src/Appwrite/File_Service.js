import {Client,ID,Storage} from "appwrite";
import Config from "../Config/Config";

export class FileServices{
    client=new Client();
    File;
    constructor(){
        this.client
            .setEndpoint(Config.appwriteurl)
            .setProject(Config.appwriteProjectId)
        this.File=new Storage(this.client)
    }
    async UploadFile(file){
        try {
    return  await this.File.createFile(
                Config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service error :: UploadFile", error);
            return false
        }
    }
    async DeleteFile(FileId){
        try {
            await this.File.deleteFile(
                Config.appwriteBucketId,
                FileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service error :: DeleteFile", error);
            return false
        }
    }
     FilePreview(FileId){
       return this.File.getFilePreview(
            Config.appwriteBucketId,
            FileId
        )
    }
}

export default File=new FileServices()