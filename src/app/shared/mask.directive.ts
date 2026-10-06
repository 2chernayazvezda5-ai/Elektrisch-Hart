import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

// 0 = digit, L = letter, # = letter or digit. Anything else is a literal.
const MASKS = {
  cpf: '000.000.000-00',
  phone: '(00) 00000-0000',
  date: '00/00/0000',
  cnpj: '##.###.###/####-00',
  plate: 'LLL0#00',
} as const;

const TOKENS: Record<string, RegExp> = {
  '0': /[0-9]/,
  L: /[A-Z]/,
  '#': /[A-Z0-9]/,
};

@Directive({ selector: 'input[appMask]' })
export class MaskDirective {
  @Input('appMask') type: keyof typeof MASKS = 'cpf';

  private el = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private control = inject(NgControl);

  @HostListener('input')
  onInput() {
    const raw = this.el.nativeElement.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const masked = this.apply(raw, MASKS[this.type]);
    this.el.nativeElement.value = masked;
    this.control.control?.setValue(masked, { emitEvent: false });
  }

  private apply(raw: string, mask: string): string {
    let out = '';
    let i = 0;
    for (const m of mask) {
      const token = TOKENS[m];
      if (!token) {
        out += m;
        continue;
      }
      while (i < raw.length && !token.test(raw[i])) i++;
      if (i >= raw.length) break;
      out += raw[i++];
    }
    return out.replace(/[^A-Z0-9]+$/, '');
  }
}