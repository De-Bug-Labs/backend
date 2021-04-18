import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post_Register } from './post_register';
import { Staff_Department } from './staff_department';
@Entity()
export class Staff {
	@PrimaryGeneratedColumn('uuid')
	public id_staff!: number;

	@Column({ type: 'varchar', nullable: false, unique: true })
	public email!: string;

	@OneToMany(() => Post_Register, (post_register) => post_register.id_post)
	public post_register!: Post_Register;

	@OneToMany(() => Staff_Department, (staff_department) => staff_department.staff)
	public staff_department!: Staff_Department;
}
