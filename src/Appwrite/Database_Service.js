import {Client,ID,Databases, Query} from "appwrite";
import Config from "../Config/Config";

export class Database{
    client=new Client(); 
    Database;
    constructor(){
        this.client
            .setEndpoint(Config.appwriteurl)
            .setProject(Config.appwriteProjectId)
        
        this.Database=new Databases(this.client)
    }

    async CreatePost({Slug,Title,Content,Image,Status,UserId}){
        try{ 
        return await this.Database.createDocument(
            Config.appwriteDatabseId,
            Config.appwriteCollectionId,
            Slug,
            {
                Title,
                Content,
                Image,
                Status,
                UserId
            }
        )
        } catch(error){
            console.log("Appwrite Service error :: CreatePost", error);
        }
    }
    async UpdatePost(Slug,{Title,Content,Image,Status}){
        try {
          return  await this.Database.updateDocument(
                Config.appwriteDatabseId,
                Config.appwriteCollectionId,
                Slug,
                {
                    Title,
                    Content,
                    Image,
                    Status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service error :: UpdatePost", error);
        }
    }
    async DeletePost(slug){
      try {
        await this.Database.deleteDocument(
            Config.appwriteDatabseId,
            Config.appwriteCollectionId,
            slug
        )
        return true
      } catch (error) {
        console.log("Appwrite Service error :: DeleteAccount", error); 
        return false
      }
    }
    async GetPost(slug){
        try {
    return  await this.Database.getDocument(
                Config.appwriteDatabseId,
                Config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service error :: GetPost", error);
        }
    }
    async GetPosts(Querries=[Query.equal('Status','Active')]){
        try {
            return await this.Database.listDocuments(
                Config.appwriteDatabseId,
                Config.appwriteCollectionId,
                Querries
            )
        } catch (error) {
            console.log("Appwrite Service error :: GetPosts", error);
        }
    }
}

export default DatabaseService=new Database()