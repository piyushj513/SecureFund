import connect from "../../lib/mongodb";
import User from '../../model/schema';

connect()

export default async function handler(req,res){

    const {email,password}=req.body
    const user = await User.findOne({email,password})
    if(!user){
        return res.json({status:'Not able to find the user'})
    }
    else{
<<<<<<< HEAD
        return res.redirect(303,'/main')
=======
        return res.redirect(303,'../main')
>>>>>>> 43913639c872e98af45d570c17da41397ede5f66
    }
}
