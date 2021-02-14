import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Example extends BaseEntity{
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;
}