const nodemailer = require('nodemailer');

function sendEmail(user, message) {
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'smartfarmpysy@gmail.com',
        pass: 'bqesxaekougkqbsk'
      }
  })
    
  var mailOptions = {
  from: 'smartfarmpysy@gmail.com',
  to: user.account,
  subject: '你的農場健康度低於標準 - Smart Farm',
  text: message
  }
  
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
      console.log(error);
  } else {
      console.log('Email sent: ' + info.response);
  }})
}
module.exports =  sendEmail