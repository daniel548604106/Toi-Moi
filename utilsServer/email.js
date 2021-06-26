const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const options = {
  auth: {
    api_key: process.env.SENDGRID_KEY
  }
};

module.exports = async ({ email, subject, html }) => {
  try {
    const mailOptions = {
      to: email,
      from: process.env.EMAIL,
      subject,
      html
    };

    const transporter = nodemailer.createTransport(sendGridTransport(options));

    transporter.sendMail(mailOptions, (err, info) => {
      err && console.log(err);
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
  }
};
