import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Rol } from './rol';
import { Permission } from './permission';
@Entity()
export class RolPermission {
	@PrimaryGeneratedColumn('uuid')
	public idRolPermission!: number;

	@ManyToOne(() => Rol, (rol) => rol.idRol)
	public rol!: Rol;

	@ManyToOne(() => Permission, (permission) => permission.idPermission)
	public permission!: Permission;
}
