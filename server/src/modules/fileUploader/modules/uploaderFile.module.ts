// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
// export class UploaderFile {
//     @PrimaryGeneratedColumn()
//     public id: number;
//     @Column()
//     public url: string;
//     @Column()
//     public key: string;
// }

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UploaderFile {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public url: string;
    @Column()
    public key: string;
}
