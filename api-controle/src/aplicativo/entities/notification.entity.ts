import { Entity, Column, PrimaryGeneratedColumn, Generated, UpdateDateColumn, DeleteDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

/**
 * Entidade Notificação
 */
@Entity('TB_NOTIFICATION')
export class Notification {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'COD_NOTIFICATION_ID', unsigned: true, comment: 'Primary Key' })
  id: number;

  @ApiProperty()
  @Column({ name: 'TXT_UUID', unique: true, comment: 'Another PK as GUID' })
  @Generated("uuid")
  uuid: string;

  @ApiProperty()
  @Column({ name: 'TXT_MESSAGE' })
  @IsNotEmpty()
  message: string;

  @ApiProperty()
  @Column({ name: 'COD_USER_ID', unsigned: true, default: null, nullable: true, comment: 'Define IF this notificatios is to an user or a broadcast message'})
  userId?: number;

  @ManyToOne(() => User, user => user.id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', cascade: false, nullable: true })
  @JoinColumn({ name: "COD_USER_ID", foreignKeyConstraintName: 'FK_NOTIFICATION_USER' })
  user?: User;  

  @Column({ name: 'DAT_CREATED', type: 'timestamp', default: () => 'NOW()' })
  createdAt: Date;
  
  @UpdateDateColumn({ name: 'DAT_UPDATED', type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;
  
  @DeleteDateColumn({ name: 'DAT_DELETED', type: 'timestamp' })
  deletedAt: Date;  
}
