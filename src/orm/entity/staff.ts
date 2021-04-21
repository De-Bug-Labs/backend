import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Department, PostRegister } from '../entities';
@Entity()
export class Staff {
	@PrimaryGeneratedColumn('uuid')
	public id!: string;

	@Column({ type: 'varchar', nullable: false, unique: true })
	public email!: string;

	@OneToMany(() => PostRegister, (postRegister) => postRegister.id)
	public postRegister!: PostRegister;

	@ManyToMany(() => Department, (department) => department.id)
	@JoinTable({ name: 'staff_department' })
	public departments!: Department[];
}
