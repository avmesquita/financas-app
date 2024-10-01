import { IPerfil } from "../interfaces/iperfil.interface";
import { Perfil } from "./perfil.model";

/**
 * Utilizador
 */
export class Utilizador  {

  /**
   * Nome
   */
  nome: string;

  /**
   * Telemóvel
   */
  telemovel: string;

  /**
   * E-Mail
   */
  email: string;

  /**
   * Identificador primário
   */
  id: string;

  /**
   * Senha
   */
  senha: string;

  /**
   * Perfil
   */
  perfil: IPerfil;

  /**
   * Token JWT
   */
  jwtToken: string;
     
  /**
   * Constructor
   */
  constructor() {
    this.nome = '';
    this.telemovel = '';
    this.email = '';
    this.id = '';
    this.senha = '';
    this.perfil = new Perfil();
    this.jwtToken = '';
  }
}
