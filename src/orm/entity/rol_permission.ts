import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Rol } from './rol';
import { Permission } from './permission';
@Entity()
export class Rol_Permission {
	@PrimaryGeneratedColumn('uuid')
	public id_rol_permission!: number;

	@ManyToOne(() => Rol, (rol) => rol.id_rol)
	public rol!: Rol;

	@ManyToOne(() => Permission, (permission) => permission.id_permission)
	public permission!: Permission;
}
