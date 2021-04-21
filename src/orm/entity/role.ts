import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission, User } from '../entities';

@Entity()
export class Role {
	@PrimaryGeneratedColumn('uuid')
	public id!: string;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public description!: string;

	@ManyToMany(() => User, (user) => user.id)
	@JoinTable({ name: 'user_role' })
	public users!: User;

	@ManyToMany(() => Permission, (permission) => permission.id)
	@JoinTable({ name: 'role_permission' })
	public permissions!: Permission[];
}
