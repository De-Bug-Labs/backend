import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Staff } from './staff';

@Entity()
export class PostRegister {
	@PrimaryGeneratedColumn('uuid')
	public idPost!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public email!: string;

	@Column({ type: 'varchar', nullable: false })
	public phone!: string;

	@Column({ type: 'varchar', nullable: false })
	public description!: string;

	@Column({ type: 'timestamptz', nullable: false })
	public date!: Date;

	@ManyToOne(() => Staff, (staff) => staff.idStaff)
	public staff!: Staff;
}
