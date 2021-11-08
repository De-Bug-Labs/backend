import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Information {
	@PrimaryGeneratedColumn('uuid')
	public id!: string;

	@Column({ type: 'text', nullable: false })
	public mision!: string;

	@Column({ type: 'text', nullable: false })
	public instalation!: string;

	@Column({ type: 'text', nullable: false })
	public team!: string;

	@Column({ type: 'text', nullable: false, default: 'GAAP' })
	public indexText!: string;
}
