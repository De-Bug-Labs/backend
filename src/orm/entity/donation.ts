import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Donation {
	@PrimaryGeneratedColumn('uuid')
	public id!: string;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'timestamptz', nullable: false })
	public date!: Date;

	@Column({ type: 'int', nullable: false })
	public amount!: number;
}
