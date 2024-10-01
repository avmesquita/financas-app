import { Entity, Column, PrimaryGeneratedColumn, Generated, UpdateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Entidade Autenticação
 */
@Entity('TB_AUTHENTICATION')
export class Authentication {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'COD_AUTHENTICATION_ID', unsigned: true, comment: 'Primary Key' })
  id: number;

  @ApiProperty()
  @Column({ name: 'TXT_UUID', unique: true, comment: 'Another PK as GUID' })
  @Generated("uuid")
  uuid: string;

  @ApiProperty()
  @Column({ name: 'TXT_TOKEN', type: 'text' })
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @Column({ name: 'COD_USER_ID', unsigned: true, nullable: true })
  userId: number;

  @ManyToOne(() => User, user => user.id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: "COD_USER_ID", foreignKeyConstraintName: 'FK_AUTHENTICATION_USER' })
  user: User;

  @Column({ name: 'DAT_CREATED', type: 'timestamp', default: () => 'NOW()' })
  createdAt: Date;
  
  @UpdateDateColumn({ name: 'DAT_UPDATED', type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;
  
  @DeleteDateColumn({ name: 'DAT_DELETED', type: 'timestamp' })
  deletedAt: Date;  
}

