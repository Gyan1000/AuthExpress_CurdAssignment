import CustomError from "../utilities/handlingError.js";

const loginValidation=(req,res,next)=>{
   const {username,password}=req.body;
   
   if(req.body!=null && username && password)
   {
        next()
   }      
   else
   {
    // res.status(501).send({msg:"ALL INPUT FIELDS ARE REQUIRED"})
    return next(new CustomError("ALL INPUT FIELDS ARE REQUIRED",501))
   }
}
export default loginValidation;