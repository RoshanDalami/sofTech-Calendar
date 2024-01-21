const nodemailer = require('nodemailer');


async function sendEmail(email,username,title){
    try {
        var transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASSWORD
            }
          });
          const mailOptions = {
            from:'roshandalami0@gmail.com',
            to : email ,
            subject: "Task has been assigned to you",
            html:`<p> 
                Dear, ${username} You are reciving this email, because you has been assigned to task ${title} in Softech task management system. 
            </p>`
          }
          const mailresponse = await transport.sendMail(mailOptions)
          return mailresponse
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = sendEmail