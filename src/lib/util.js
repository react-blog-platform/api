const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const mailGenerator = new Mailgen({
	theme: 'default',
	product: {
		name: 'Mailgen',
		link: 'https://mailgen.js/'
	}
});

const email = {
	body: {
		name: 'John Appleseed',
		intro: 'You have received this email because a password reset request for your account was received.',
		action: {
			instructions: 'Click the button below to reset your password:',
			button: {
				color: '#DC4D2F',
				text: 'Reset your password',
				link: 'https://mailgen.js/reset?s=b350163a1a010d9729feb74992c1a010'
			}
		},
		outro: 'If you did not request a password reset, no further action is required on your part.'
	}
};

const emailBody = mailGenerator.generate(email);


// 发送邮件的工具函数
export function sendMail(options) {
	let testAccount = nodemailer.createTestAccount();

	let transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass
		}
	});

	transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>',
		to: 'bar@example.com, baz@example.com',
		subject: 'Hello ✔',
		text: 'Hello world?',
		html: '<b>Hello world?</b>'
	});
}


