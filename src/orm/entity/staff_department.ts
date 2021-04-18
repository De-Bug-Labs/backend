import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Staff } from './staff';
import { Department } from './department';
@Entity()
export class Staff_Department {
	@PrimaryGeneratedColumn('uuid')
	public id_staff_department!: number;

	@ManyToOne(() => Staff, (staff) => staff.id_staff)
	public staff!: Staff;

	@ManyToOne(() => Department, (department) => department.id_department)
	public department!: Department;
}
