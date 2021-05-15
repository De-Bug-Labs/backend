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
		const page = req.swagger.params.page.raw || 1;
		const pageSize = req.swagger.params.pageSize.raw || 5;
		const day = req.swagger.params.day.raw || '';
		const week = req.swagger.params.week.raw || -1;
		const month = req.swagger.params.month.raw || '';
		const year = req.swagger.params.year.raw || '';
		if(week != -1){	
			const initW = ('0' + ((7 * (week-1)) + 1)).slice(-2);
			const endW = ('0' + (7 * (week) + 1)).slice(-2);
			const currentDate = new Date();
			const currentMonth = ('0' + (currentDate.getUTCMonth() + 1)).slice(-2); //months from 1-12
			const currentYear = currentDate.getUTCFullYear();
			console.log(week);
			console.log(currentMonth);
			console.log(currentYear);
			console.log(initW);
			console.log(endW);
			const events = await calendarRepo.find({
			where: `date::text BETWEEN '${currentYear}-${currentMonth}-${initW}' AND '${currentYear}-${currentMonth}-${endW}' ORDER BY date DESC`,
			take: pageSize, 
			skip: (page - 1) * pageSize 
		});
		if (events.length) res.status(200).json(events);
		else res.status(404).json({ message: 'index out of bound' });
	}
		else{
			const events = await calendarRepo.find({
				where: `date::text LIKE '${year}%-%${month}-%${day}%' ORDER BY date DESC`,
				take: pageSize, 
				skip: (page - 1) * pageSize 
			});
			if (events.length) res.status(200).json(events);
			else res.status(404).json({ message: 'index out of bound' });
		}
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
