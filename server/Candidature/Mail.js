const nodemailer = require('nodemailer');
//const account = require('../Account/lib');
const app = require('express').Router();
   
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', (req,res) =>{
    console.log("Hi");
});

app.post('/send', (req,res) =>{
  console.log("Hello");
    //const output = "<p>vous avez reçu une nouvelle demande de contact</p><h3>Contact details</h3><ul><li>Name: ${req.body.name}</li><li>Email: ${req.body.mail}</li></ul><h3>Message</h3><p>Email: ${req.body.message}</p>";
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "gestioncandidaturem1miaa@gmail.com",
          pass: "azertyM1MIAA"
        }
      });
    
      // setup email data with unicode symbols
      let mailOptions = {
        from: "gestioncandidaturem1miaa@gmail.com", // sender address
        to: "pogoman28@gmail.com", // list of receivers
        subject: "test", // Subject line
        //text: "Hello world?", // plain text body
        //html: output // html body
        html: "Hello there"

      };
     
      transporter.sendMail(mailOptions, (error, info) =>{
          if(error){
              console.log("Erreur lors de l'envoi du mail");
              return console.log(error);
          }
          console.log("Message envoyé !");
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
      });
  
 
});

module.exports = app;