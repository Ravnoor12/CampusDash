import client from "./client"

export const createUser = async (userInfo)=>{
    try{
        console.log("Creating user with info:", userInfo);
        const {data} = await client.post('/api/customer/signup',userInfo);  //data is FirstName, LastName, Email, Password.  
        return data;
    }
    catch (error){
        const {response} = error;
        if(response?.data) return response.data;
        return {error:error.message || error}; 
    }
}


export const signInUser = async (userInfo)=>{
    try{
        console.log("Signing in user with info:", userInfo);
        const {data} = await client.post('/api/customer/signin',userInfo); //userInfo consist of Email, Password. 
        return data;
    }
    catch (error){
        const {response} = error;
        if(response?.data) return response.data;
        return {error:error.message || error}; 
    }
}


// export const forgetPassword = async (email)=>{
//     try{
//         const {data} = await client.post('/user/forget-password',{email});
//         return data;
//     }
//     catch (error){
//         const {response} = error;
//         if(response?.data) return response.data;
//         return {error:error.message || error}; 
//     }
// }

// export const verifyPasswordResetToken = async (token,userId)=>{
//     try{
//         const {data} = await client.post('/user/verify-password-reset-token',{token,userId});
//         return data;
//     }
//     catch (error){
//         const {response} = error;
//         if(response?.data) return response.data;
//         return {error:error.message || error}; 
//     }
//}

// export const resetPassword = async (passwordInfo)=>{ 
//     try{
//         const {data} = await client.post('/user/reset-password',passwordInfo);
//         return data;
//     }
//     catch (error){
//         const {response} = error;
//         if(response?.data) return response.data;
//         return {error:error.message || error}; 
//     }
// }
