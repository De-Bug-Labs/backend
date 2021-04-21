import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../entities';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	public id!: number;

	@Column({ type: 'varchar', nullable: false, unique: true })
	public email!: string;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public lastName!: string;

	@Column({ type: 'varchar', nullable: false })
	public password!: string;

	@ManyToMany(() => Role, (rol) => rol.id)
	@JoinTable({ name: 'user_role' })
	public roles!: Role[];
}
