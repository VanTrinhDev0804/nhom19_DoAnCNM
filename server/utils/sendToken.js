

module.exports.sendToken = (res, user, statusCode , message )=>{

    const token = user.getJWTtToken();
    const options ={
        httpOnly : true,
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*60*1000)
    }
    const userData = {
        _id : user.id,
        name : user.name,
        email : user.email,
        avatar : user.avatar,

    }

    

    res.statusCode(statusCode).json({success :true , message, user})
}