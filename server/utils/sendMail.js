const nodeMailer = require('nodemailer')


module.exports.sendMail = async(email , subject , text ) => {
    const transport =nodeMailer.createTransport({
      
        host:process.env.SMTP_HOST, 
        port:process.env.SMTP_PORT,
        secure: false,
        auth: {
            user :process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
    });
    
    const options ={
        from : process.env.SMTP_USER,
        to: email,
        subject,
        text :text ,
        
        
    }


    return transport.sendMail(options,function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        } })
}