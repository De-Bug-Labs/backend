import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user';

@Entity()
export class Rol {
	@PrimaryGeneratedColumn('uuid')
	public idRol!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public description!: string;

	@OneToMany(() => User, (user) => user.idUser)
	public user!: User;
}
