import { Entity, Column, PrimaryGeneratedColumn, Generated, BeforeInsert, DeleteDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Conta } from './conta.entity';

/**
 * Entidade Utilizador
 */
@Entity('TB_USER')
export class User {
  
  /* KEYS COLUMNS */

  /* PK */
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'COD_USER_ID', unsigned: true, comment: 'Primary Key' })
  id: number;

  /* UNIQUE KEY */
  @ApiProperty()  
  @Column({ name: 'TXT_UUID', unique: true, comment: 'Another PK as GUID' })
  @Generated("uuid")
  uuid: string;

  /* DATA COLUMNS */

  @ApiProperty()
  @Column({ name: 'TXT_NAME', unique: true, length: 256 })
  @MinLength(4)
  name: string;

  @ApiProperty()
  @Column({ name: 'TXT_EMAIL', unique: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Column({ name: 'TXT_PASSWORD', length: 128, select: false })
  @MinLength(8)
  password: string;

  @ApiProperty()  
  @Column({ name: 'TIP_ROLE', unsigned: true, nullable: false, default: 2 })
  role: number; //UserRole;
  
  @ApiProperty()
  @Column({ name: 'FLG_ACTIVE', default: true })
  active: boolean;

  @ApiProperty()
  @Column({ name: "B64_IMAGE", type: 'longtext', nullable: true })
  image: string;

  /* LOG PURPOSES COLUMNS */

  @Column({ name: 'DAT_CREATED', type: 'timestamp', default: () => 'NOW()' })
  createdAt: Date;
  
  @UpdateDateColumn({ name: 'DAT_UPDATED', type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;
  
  @DeleteDateColumn({ name: 'DAT_DELETED', type: 'timestamp' })
  deletedAt: Date;  
  

  @OneToMany(() => Conta, (conta) => conta.user, { lazy: true, nullable: true, cascade: false, 
                                                   onDelete: 'NO ACTION', onUpdate: 'NO ACTION',
                                                   createForeignKeyConstraints: true })    
  contas?: Conta[];

  /* BEFORE INSERT RULES */

  @BeforeInsert()
  emailToLowerCase() {
      this.email = this.email.toLowerCase();      
  }

  @BeforeInsert()
  inactivate() {
    if (this.deletedAt) {
      this.active = false;
    }
  }  
}
