import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PostRegister } from './postRegister';
import { StaffDepartment } from './staffDepartment';
@Entity()
export class Staff {
	@PrimaryGeneratedColumn('uuid')
	public idStaff!: number;

	@Column({ type: 'varchar', nullable: false, unique: true })
	public email!: string;

	@OneToMany(() => PostRegister, (postRegister) => postRegister.idPost)
	public postRegister!: PostRegister;

	@OneToMany(() => StaffDepartment, (staffDepartment) => staffDepartment.staff)
	public staffDepartment!: StaffDepartment;
}
