import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Collaborator } from './collaborator';

@Entity()
export class Section {
	@PrimaryGeneratedColumn('uuid')
	public id!: string;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@OneToMany(() => Collaborator, (collaborator) => collaborator.id)
	public collaborator!: Collaborator[];
}
