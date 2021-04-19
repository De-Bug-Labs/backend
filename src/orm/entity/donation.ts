import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Donation {
	@PrimaryGeneratedColumn('uuid')
	public idDonation!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'date', nullable: false })
	public date!: Date;

	@Column({ type: 'int', nullable: false })
	public amount!: number;
}
