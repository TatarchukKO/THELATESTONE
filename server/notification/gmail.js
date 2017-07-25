const nodemailer = require('nodemailer');
const dateFormat = require('dateformat');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true, // secure:true for port 465, secure:false for port 587
  port: 465,
  auth: {
    user: 'exadelbot@gmail.com',
    pass: 'Exadel123789',
  },
  tls: {
    rejectUnauthorized: false,
  },
});
function greetings(obj) {
  return `Здравствуйте, ${obj.firstName} ${obj.secondName},`;
}
function interviewee(obj) {
  return `Вам назначено собеседование кандидата ${obj.ruFirstName} ${obj.ruSecondName}`;
}
function vacancy(obj) {
  return `на вакансию ${obj.name}`;
}
function technology(obj) {
  return `по технологии ${obj.skillName}`;
}
function interviewDate(obj) {
  return `Дата собеседования:
  ${dateFormat(obj.date, 'yyyy-mm-dd HH:MM')} `;
}

function formHtml(obj) {
  let html = '';
  if (obj.type === 'TECH') {
    html = `<b> ${greetings(obj)} <br>
  ${interviewee(obj)} ${vacancy(obj)} ${technology(obj)}.<br>
    ${interviewDate(obj)}</b>`;
  }
  if (obj.type === 'HRM') {
    html = `<b>${greetings(obj)}<br>
    ${interviewee(obj)} ${vacancy(obj)}.<br>
    ${interviewDate(obj)}</b>`;
  }
  return html;
}
function formConfig(obj) {
  const config = {};
  config.from = '<exadelbot@gmail.com>';
  config.to = obj.login;
  config.subject = 'Interview notification';
  config.text = '';
  config.html = formHtml(obj);
  return config;
}

function sendMail(config) {
  transporter.sendMail(formConfig(config), (error) => {
    if (error) {
      throw error;
    }
  });
}

module.exports = {
  sendMail,
};
