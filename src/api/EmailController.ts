import { getManager } from 'typeorm';
import { Department, PostRegister } from '../orm/entities';

const departmentRepo = getManager().getRepository(Department);
const registerRepo = getManager().getRepository(PostRegister);

//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const createRegisterEmail = async (req, res): Promise<void> => {
	try {
		let email = new PostRegister();
		email = req.swagger.params.postRegister.raw;
		const department = req.swagger.params.postRegister.raw.departmentId;
		const message = req.swagger.params.postRegister.raw.description;
		const userMail = req.swagger.params.postRegister.raw.email;
		const staff = (
			await departmentRepo.findOneOrFail({
				relations: ['staff'],
				where: {
					id: department,
				},
			})
		).staff;
		email.staff = staff[0];
		email.date = new Date();
		const insert = await registerRepo.save(email);
		const staffMail = staff.map((t) => t.email);

		res.status(201).json(insert);

		const nodemailer = require('nodemailer');

		const auth = {
			user: process.env.NODEMAILER_MAIL,
			pass: process.env.NODEMAILER_PASS,
		};
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: auth,
		});

		const maillist = [staffMail, userMail];

		const mailOptions = {
			from: auth.user,
			to: maillist, //buscar una forma de poner el staff aqui
			subject: 'Solicitud de ayuda GAAP I.A.P',
			text: `${message}  \n\n de parte de: ${email.name} \n telefono: ${email.phone}`, //esto ya esta resuelto
		};

		transporter.sendMail(mailOptions);
	} catch (e) {
		console.info(e);
		res.status(400).json(e);
	}
};
