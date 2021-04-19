import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Staff } from './staff';
import { Department } from './department';
@Entity()
export class StaffDepartment {
	@PrimaryGeneratedColumn('uuid')
	public idStaffDepartment!: number;

	@ManyToOne(() => Staff, (staff) => staff.idStaff)
	public staff!: Staff;

	@ManyToOne(() => Department, (department) => department.idDepartment)
	public department!: Department;
}
