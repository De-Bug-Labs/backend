import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user';

@Entity()
export class Rol {
	@PrimaryGeneratedColumn('uuid')
	public id_rol!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public description!: string;

	@OneToMany(() => User, (user) => user.id_user)
	public user!: User[];
}
