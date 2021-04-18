import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Donation_Settings {
	@PrimaryColumn({ type: 'date', nullable: false, unique: true })
	public date!: Date;

	@Column({ type: 'int', nullable: false })
	public limit!: number;
}
