const registerSuccess =(user,token)=>{
  return {
       success:true,
       username:user.username,
       id:user._id,
       token 
    }  
}

const loginSuccess =(user)=>{
   return {
     success:true,    
     user:{
         id:user.id ,
         username:user.username
        }  
    } 
}
    
module.exports = {registerSuccess,loginSuccess,loginSuccess}