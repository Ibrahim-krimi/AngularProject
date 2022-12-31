let userModel = require('../model/user');


function getUser(req,res){

    let  Useremail =req.body.email;
    let password =req.body.password;
    console.log("this.Useremail",Useremail);
    console.log("this.password",password);

    userModel.findOne({nom:Useremail,motdepasse:password},(err,user)=>{
        if (err){
            console.log("err",err);
            res.send(err)
        }
        console.log("user=  ",user);
        res.json(user);
    })
}

function getUsers(req, res){
    userModel.find((err, users) => {
        if(err){
            res.send(err)
        }
        else{
            res.send(users);
        }

    });
}

module.exports={getUser,getUsers};
