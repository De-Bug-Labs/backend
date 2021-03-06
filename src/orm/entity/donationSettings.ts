import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class DonationSettings {
	@PrimaryColumn({ type: 'timestamptz', nullable: false, unique: true })
	public date!: Date;

	@Column({ type: 'int', nullable: false })
	public limit!: number;
}
