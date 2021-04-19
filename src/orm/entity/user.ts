import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Rol } from './rol';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	public idUser!: number;

	@Column({ type: 'varchar', nullable: false, unique: true })
	public email!: string;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public lastName!: string;

	@Column({ type: 'varchar', nullable: false })
	public password!: string;

	@ManyToOne(() => Rol, (rol) => rol.idRol)
	public rol!: Rol;
}
