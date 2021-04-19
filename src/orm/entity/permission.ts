import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolPermission } from './rolPermission';
@Entity()
export class Permission {
	@PrimaryGeneratedColumn('uuid')
	public idPermission!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public description!: string;

	@OneToMany(() => RolPermission, (rolPermission) => rolPermission.permission)
	public permission!: RolPermission[];
}
