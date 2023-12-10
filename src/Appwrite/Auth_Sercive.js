import { Account,Client,ID } from "appwrite";
import Config from "../Config/Config";

export class AuthService{
    Client=new Client();
    account;
    constructor(){
        this.Client
            .setEndpoint(Config.appwriteurl)
            .setProject(Config.appwriteProjectId)
        
        this.account=new Account(this.Client)
    }

    async CreateAccount({email,password,name}){
        try {
           const account= await this.account.create(ID.unique(), email, password, name);
           if(Account){
            this.Login({email,password});
           }
           else{
            return account
           }
        } catch (error) {
            throw error;
        }
    }
    async Login({email,password}){
        try {
           return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
        }
    }
    async Logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Service error :: Logout", error);
        }
    }
    async GetUserAccount(){
        try {
           return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service Error:: GetUserAccount", error);
        }
        return null
    }    
}

export default service=new AuthService()