import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../entities';

@Entity()
export class Permission {
	@PrimaryGeneratedColumn('uuid')
	public id!: string;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public description!: string;

	@ManyToMany(() => Role, (role) => role.id)
	@JoinTable({ name: 'role_permission' })
	public roles!: Role[];
}
