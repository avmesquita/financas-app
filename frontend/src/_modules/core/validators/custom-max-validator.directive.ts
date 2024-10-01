import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

/**
 * Valor máximo
 */
@Directive({
  selector: '[customMax][formControlName],[customMax][formControl],[customMax][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomMaxDirective, multi: true}]
})
export class CustomMaxDirective implements Validator {
  /**
   * Valor máximo
   */
  @Input()
  customMax: number = 0;

  /**
   * Validação de Valor
   * 
   * @param c 
   * @returns 
   */
  validate(c: FormControl): {[key: string]: any} {
      let v = c.value;
      return ( v > this.customMax)? {"customMax": true} : {"customMax": false};
  }
}
