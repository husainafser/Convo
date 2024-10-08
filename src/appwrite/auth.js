import config from "../config/config";
import { Client, Account, ID } from "appwrite";


export class AuthService{
 client = new Client(); // did not set endpoint here because if authservice will be called then constructor will called automactically then in constructor we will set endpoint
 account;

 constructor(){
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
 }

 async createAccount({email,password,name}){
    try {
        const userAccount = await this.account.create(ID.unique(),email,password,name);
        if (userAccount) {
            return this.login({email,password});
        } else {
            return userAccount;
        }
    } catch (error) {
        throw error;
    }
 }

 async login({email,password}){
    try {
        return await this.account.createEmailPasswordSession(email,password);
    } catch (error) {
        throw error;
    }
 }

 async getCurrentUser(){
    try {
        const user = await this.account.get();
        // console.log(user);
        return user;
    } catch (error) {
         console.log(error);
    }
    return null;
 }

 async logout(){
    try {
        return await this.account.deleteSessions();
    } catch (error) {
        throw error;
    }
 }
}
// use new keyword for using constructor
const authService = new AuthService();

export default authService;