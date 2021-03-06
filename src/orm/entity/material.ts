import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Material {
	@PrimaryGeneratedColumn('uuid')
	public id!: string;

	@Column({ type: 'varchar', nullable: false })
	public title!: string;

	@Column({ type: 'varchar', nullable: false })
	public link!: string;
}
