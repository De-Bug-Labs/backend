import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Staff_Department } from './staff_department';

@Entity()
export class Department {
	@PrimaryGeneratedColumn('uuid')
	public id_department!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public description!: string;

	@OneToMany(() => Staff_Department, (staff_department) => staff_department.department)
	public staff_department!: Staff_Department;
}
