const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const options = {
  auth: {
    api_key: process.env.SENDGRID_KEY
  }
};

module.exports = async ({ email, name, subject, href }) => {
  try {
    // Handlebar

    const hbsOptions = {
      viewEngine: {
        extname: '.handlebars',
        layoutsDir: path.resolve(__dirname, '../views/'),
        defaultLayout: 'resetPassword'
      },
      viewPath: path.resolve(__dirname, '../views/')
    };

    const mailOptions = {
      to: email,
      from: process.env.EMAIL,
      subject,
      template: 'resetPassword',
      context: {
        name,
        href
      }
    };

    const transporter = nodemailer.createTransport(sendGridTransport(options));

    transporter.use('compile', hbs(hbsOptions));
    transporter.sendMail(mailOptions, (err, info) => {
      err && console.log(err);
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
};
