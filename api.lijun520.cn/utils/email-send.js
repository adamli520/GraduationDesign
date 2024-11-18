const nodemailer = require('nodemailer');

const config = {
    host: 'smtphz.qiye.163.com',
    port: 465,
    secureConnection: true,
    auth: {
        user: 'support@lijun520.cn', // 邮箱账号
        pass: 'F9qXyxzkWyaFZCTh' // 邮箱的授权码
    }
};

const transporter = nodemailer.createTransport(config);

module.exports.Emailer=(mail)=>{
    return new Promise((resolve, reject) => {
        transporter.sendMail(mail, function (error, info) {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(true);
        });
    });
}


