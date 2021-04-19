import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Collaborator } from './collaborator';

@Entity()
export class Section {
	@PrimaryGeneratedColumn('uuid')
	public idSection!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@OneToMany(() => Collaborator, (collaborator) => collaborator.idCollaborator)
	public collaborator!: Collaborator[];
}
