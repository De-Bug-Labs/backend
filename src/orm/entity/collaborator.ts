import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Section } from './section';

@Entity()
export class Collaborator {
	@PrimaryGeneratedColumn('uuid')
	public id_collaborator!: number;

	@Column({ type: 'varchar', nullable: false })
	public name!: string;

	@Column({ type: 'varchar', nullable: false })
	public description!: string;

	@Column({ type: 'varchar', nullable: false })
	public srcimg!: string;

	@Column({ type: 'varchar', nullable: false })
	public institution!: string;

	@ManyToOne(type => Section, (section) => section.id_section)
	public section!: Section;
}
