import { getManager } from 'typeorm';
import { Calendar } from '../orm/entities';

const calendarRepo = getManager().getRepository(Calendar);

//Example of CRUD (Create, Read, Update, Delete)
//implementation of an example entity in TypeORM with swagger

export const createCalendar = async (req, res): Promise<void> => {
	try {
		const festival = new Calendar();
		festival.date = req.swagger.params.calendar.raw.date;
		festival.srcimg = req.swagger.params.calendar.raw.srcimg;
		festival.description = req.swagger.params.calendar.raw.description;
		festival.address = req.swagger.params.calendar.raw.address;
		festival.title = req.swagger.params.calendar.raw.title;
		const insert = await calendarRepo.save(festival);
		res.status(201).json(insert);
	} catch (e) {
		res.status(400).json(e);
	}
};
export const consultCalendar = async (req, res): Promise<void> => {
	try {
		const page = req.swagger.params.page.raw;
		const pageSize = req.swagger.params.pageSize.raw;
		const events = await calendarRepo.find({ take: pageSize, skip: (page - 1) * pageSize });
		if (events.length) res.status(200).json(events);
		else res.status(404).json({ message: 'index out of bound' });
	} catch (e) {
		res.status(400).json(e);
	}
};

export const consultCalendarPages = async (req, res): Promise<void> => {
	try {
		const pageSize = req.swagger.params.pageSize.raw;
		const events = await calendarRepo.count();
		res.status(200).json({
			pageSize: pageSize,
			eventsCount: events,
			pageCount: Math.ceil(events / pageSize),
		});
	} catch (e) {
		res.status(400).json(e);
	}
};
