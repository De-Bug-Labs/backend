import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Calendar {
	@PrimaryGeneratedColumn('uuid')
	public id!: string;

	@Column({ type: 'date', nullable: false })
	public date!: string;

	@Column({ type: 'varchar', nullable: true })
	public srcimg!: string;

	@Column({ type: 'varchar', nullable: true })
	public description!: string;

	@Column({ type: 'varchar', nullable: true })
	public address!: string;

	@Column({ type: 'varchar', nullable: false })
	public title!: string;
}
