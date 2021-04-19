import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StaffDepartment } from './staffDepartment';

@Entity()
export class Department {
	@PrimaryGeneratedColumn('uuid')
	public idDepartment!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public description!: string;

	@OneToMany(() => StaffDepartment, (staffDepartment) => staffDepartment.department)
	public staffDepartment!: StaffDepartment;
}
