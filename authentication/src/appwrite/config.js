import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class sevice{
client=new Client();
Databases;
bucket;
constructor(){
    this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

            this. databases = new Databases(this.client);
            this.bucket=new Storage(this.client)

}

async createPost(title,slug,content,featuredImage,status,userId){
    try {
        return await this.databases.createDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId

            }
        )
    } catch (error) {
        throw error;
        
    }

}
async updatePost(slug,{title,content,featuredImage,status}){
    try {
        return  await this.databases.updateDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            
            }
        )
    } catch (error) {
        throw Error
        
    }
}

async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionId,
            slug,
         
        )

        return true;
    } catch (error) {
        throw Error
        
    }
}

async getPost(slug){
    try {

        return await this.databases.getDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionId,
            slug,
        )
        
    } catch (error) {
        throw error
    }
}

async getPosts(queries=[Query.equal("status","active")]){

    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionId,
            queries,
            
        )
        
    } catch (error) {

        throw error;
        return false
        
    }


}

//file Upload services

async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketID,
            ID.unique(),
            file
        )
    } catch (error) {
        throw error
        return false
    }
}
async deleteFile(fileId){

    try {
        return await this.bucket.deleteFile(
            conf.appwriteBucketID,
            ID.unique(),
            fileId
            
        )
        return true;
    } catch (error) {
        throw error
    }

}


getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketID,
        fileId,
    )
}
}





const service=new sevice();



export default service; 