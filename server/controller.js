import model from "./model";


export const saveDb = async (req,res)=>{
    try {
           console.log(req.body);
        const checkExist =await User.findOne({email:req.body.email})
        console.log(req.body.phone);
        if(checkExist){
            console.log("1");
            res.json({status:false,error:'Email already exists'})
        }else{
            console.log("2");
            const data = new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                phone:req.body.phone,
                is_Admin:false
               })
        
               const userData = await data.save()
               const token = jwt.sign({userId:userData._id},process.env.JWT_SECRET,{expiresIn:'30d'})
               console.log(token+"here");
               res.json({userData,token,status:true})
        }

    } catch (error) {
        console.log(error.message);
    }
}