import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ExampleUser {
	@PrimaryGeneratedColumn('uuid')
	public id!: string;

	@Column({ type: 'varchar', nullable: false })
	public firstName!: string;

	@Column({ type: 'varchar', nullable: false })
	public lastName!: string;

	@Column({ type: 'int', nullable: false })
	public age!: number;
}
