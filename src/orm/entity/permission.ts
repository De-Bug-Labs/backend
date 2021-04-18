import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rol_Permission } from './rol_permission';
@Entity()
export class Permission {
	@PrimaryGeneratedColumn('uuid')
	public id_permission!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public description!: string;

	@OneToMany(() => Rol_Permission, (rol_permission) => rol_permission.permission)
	public permission!: Rol_Permission[];
}
