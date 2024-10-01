import { Column, DeleteDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.entity";
import { Lancamento } from "./lancamento.entity";

/**
 * Entidade Conta
 */
@Entity('TB_ACCOUNT')
export class Conta {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'COD_ACCOUNT_ID', unsigned: true, comment: 'Primary Key' })
    id: number;
  
    @ApiProperty()
    @Column({ name: 'TXT_UUID', unique: true, comment: 'Another PK as GUID' })
    @Generated("uuid")
    uuid: string;  

    @ApiProperty()
    @Column({ name: 'TXT_NAME' }) 
    nome: string;

    @ApiProperty()
    @Column({ name: 'TXT_DESCRIPTION' }) 
    descricao: string;

    @ApiProperty()
    @Column({ name: 'NUM_BALANCE_CREDIT', unsigned: false, default: 0 })
    saldoCredito: number;

    @ApiProperty()
    @Column({ name: 'NUM_BALANCE_DEBIT', unsigned: false, default: 0 })    
    saldoDebito: number;

    @ApiProperty()
    @Column({ name: 'NUM_BALANCE_FUTURE', unsigned: false, default: 0 })    
    saldoFuturo: number;

    @ApiProperty()
    @Column({ name: 'NUM_BALANCE_CONSOLIDATED', unsigned: false, default: 0 })    
    saldoConsolidado: number;

    @ApiProperty()
    @Column({ name: 'COD_USER_ID', unsigned: true, nullable: true })
    userId: number;
  
    @ManyToOne(() => User, user => user.id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: "COD_USER_ID", foreignKeyConstraintName: 'FK_ACCOUNT_USER' })
    user: User;
  
    @ApiProperty()
    @Column({ name: 'FLG_ACTIVE', default: true })
    active: boolean;
  
    @Column({ name: 'DAT_CREATED', type: 'timestamp', default: () => 'NOW()' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'DAT_UPDATED', type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
    
    @DeleteDateColumn({ name: 'DAT_DELETED', type: 'timestamp' })
    deletedAt: Date;  

    @OneToMany(() => Lancamento, (lancamento) => lancamento.conta, 
                { lazy: true, nullable: true, cascade: false, 
                  onDelete: 'NO ACTION', onUpdate: 'NO ACTION',
                  createForeignKeyConstraints: true })    
    lancamentos?: Lancamento[]
  
  }