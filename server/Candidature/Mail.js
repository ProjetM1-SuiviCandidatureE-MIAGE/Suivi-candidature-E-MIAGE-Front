const nodemailer = require('nodemailer');
const account = require('../Account/lib');
let express = require('express').app(),
    app = express();
   
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.post('/send', (req,res) =>{
    const output = '<p>vous avez reçu une nouvelle demande de contact</p><h3>Contact details</h3><ul><li>Name: ${req.body.name}</li><li>Email: ${req.body.email}</li></ul><h3>Message</h3><p>Email: ${req.body.message}</p>';
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.login, // generated ethereal user
          pass: account.login // generated ethereal password
        }
      });
    
      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "jeannebertoux@gmail.com", // list of receivers
        subject: "test ✔", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
      };
     
      transporter.sendMail(mailOptions, (error, info) =>{
          if(error){
              return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
      });
  
 
});