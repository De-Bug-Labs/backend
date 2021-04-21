import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class View {
	@PrimaryGeneratedColumn('uuid')
	public id!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'boolean', nullable: false })
	public status!: boolean;
}
