import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Collaborator } from './collaborator';

@Entity()
export class Section {
	@PrimaryGeneratedColumn('uuid')
	public id_section!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@OneToMany(() => Collaborator, (collaborator) => collaborator.id_collaborator)
	public collaborator!: Collaborator[];
}
