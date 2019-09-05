const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
import emailConfig from './email'


// 发送邮件的工具函数
export async function sendMail(options,token) {
	let transporter = nodemailer.createTransport(emailConfig);
	const mailGenerator = new Mailgen({
		theme: 'default',
		product: {
			name: 'React Blog App',
			link: 'https://baidu.com/'
		}
	});

	const email = {
		body: {
			name: options.name,
			intro: ['很高兴你使用我们的博客服务！','当前邮箱有效期验证时间为30分钟，请在有效期内完成验证！'],
			action: {
				instructions: '请点击这里验证你的邮箱的合法性',
				button: {
					color: '#DCED2F',
					text: '去验证',
					link: `http://localhost:3000/user/email/check/${token}`
				}
			},
			outro: '如果这不是你触发的申请或者你不想使用我们的服务，请忽视它!'
		}
	};

	const emailBody = mailGenerator.generate(email);
	const emailText = mailGenerator.generatePlaintext(email);

	await transporter.sendMail({
		from: emailConfig.auth.user,
		to: options.email,
		subject: '邮箱校验',
		html: emailBody,
		text: emailText,
	}).catch(err => {
		console.log(err)
	})
}


