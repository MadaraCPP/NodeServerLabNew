// services/emailService.js
const nodemailer = require('nodemailer');

// Настройка транспорта для отправки писем через Mail.ru
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'flowchat@mail.ru',
    pass: 'acSfFdxuH0pTrNVDGKNj',
  },
});

// Функция для отправки активационного письма
const sendActivationEmail = async (to, link) => {
  try {
    await transporter.sendMail({
      from: '"FlowChat" <flowchat@mail.ru>',
      to,
      subject: 'Активация аккаунта',
      html: `<h1>Активация аккаунта</h1>
             <p>Перейдите по ссылке для активации:</p>
             <a href="${link}">${link}</a>`,
    });
    console.log('Activation email sent');
  } catch (error) {
    console.error('Error sending activation email:', error);
    throw error;
  }
};

module.exports = { sendActivationEmail };
