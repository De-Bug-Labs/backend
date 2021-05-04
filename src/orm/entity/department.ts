import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Staff } from '../entities';

@Entity()
export class Department {
	@PrimaryGeneratedColumn('uuid')
	public id!: string;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public description!: string;

	@ManyToMany(() => Staff, (staff) => staff.id)
	@JoinTable({ name: 'staff_department' })
	public staff!: Staff[];
}
