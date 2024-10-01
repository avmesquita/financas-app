import { Column, DeleteDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Conta } from "./conta.entity";
import { ApiProperty } from "@nestjs/swagger";

/**
 * Entidade Lançamento
 */
@Entity('TB_ACCOUNTING_ENTRY')
export class Lancamento {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'COD_ACCOUNTING_ENTRY_ID', unsigned: true, comment: 'Primary Key' })
    id: number;
  
    @ApiProperty()
    @Column({ name: 'TXT_UUID', unique: true, comment: 'Another PK as GUID', nullable: true })
    @Generated("uuid")
    uuid: string;
  
    @ApiProperty()
    @Column({ name: 'COD_ENTRY_TYPE', nullable: false })
    tipoLancamento: string;

    @ApiProperty()
    @Column({ name: 'TXT_TITLE' })
    titulo: string;
    
    @ApiProperty()
    @Column({ name: 'TXT_DESCRIPTION' })
    descricao: string;

    @ApiProperty()
    @Column({ name: 'DAT_DATE', type: 'date', nullable: false })
    data: Date;

    @ApiProperty()
    @Column('decimal', { name: 'NUM_VALUE', precision: 10, scale: 2, nullable: false } )
    valor: number;

    @ApiProperty()
    @Column({ name: 'TXT_CATEGORIES', nullable: false, default: '' })
    categorias: string;

    @ApiProperty()
    @Column({ name: 'B64_IMAGE', type:'text', nullable: true })
    image: string;
 
    @ManyToOne( () => Conta, conta => conta.id)    
    @JoinColumn({ name: "COD_ACCOUNT_ID", foreignKeyConstraintName: 'FK_ACCOUNTING_ENTRY_ACCOUNT' })
    conta: Conta;

    @ApiProperty()
    @Column({ name: 'COD_ACCOUNT_ID', unsigned: true, nullable: false })
    contaId: number;  

    @Column({ name: 'DAT_CREATED', type: 'timestamp', default: () => 'NOW()' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'DAT_UPDATED', type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
    
    @DeleteDateColumn({ name: 'DAT_DELETED', type: 'timestamp' })
    deletedAt: Date;  
}