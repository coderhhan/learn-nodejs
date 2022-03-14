module.exports = Mailer;

function Mailer(mailId, VerificationCode) {
  const nodemailer = require("nodemailer"); //引入依赖
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    service: "qq",
    port: 465,
    secure: true,
    auth: {
      user: "906271803@qq.com", //发送方邮箱
      pass: "jsspcynfiiwebbge", //发送方邮箱的授权码,一般去邮箱设置里面找，应该可以找到
    },
  });
  //设置收件人信息
  let mailOptions = {
    from: "906271803@qq.com", //谁发的
    to: mailId, //发给谁
    subject: "DailyWriter验证码为" + VerificationCode, //主题是什么
    text: "验证码邮件", //文本内容
    html: "", //html模板
    // attachments: [              //附件信息,如果需要了再打开使用
    //     {
    //         filename: '',
    //         path: '',
    //     }
    // ]
  };
  return new Promise((resolve, reject) => {
    //异步函数
    //发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error); //错误
      } else {
        resolve(info);
      }
    });
  });
}
