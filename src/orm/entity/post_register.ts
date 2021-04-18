import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Staff } from './staff';

@Entity()
export class Post_Register {
	@PrimaryGeneratedColumn('uuid')
	public id_post!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public email!: string;

	@Column({ type: 'varchar', nullable: false })
	public phone!: string;

	@Column({ type: 'varchar', nullable: false })
	public description!: string;

	@Column({ type: 'date', nullable: false })
	public date!: Date;

	@ManyToOne(() => Staff, (staff) => staff.id_staff)
	public staff!: Staff;
}
