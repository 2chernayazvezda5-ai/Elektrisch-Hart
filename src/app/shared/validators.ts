import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(c: AbstractControl): ValidationErrors | null {
  const cpf = (c.value ?? '').replace(/\D/g, '');
  if (!cpf) return null;
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return { cpf: true };

  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += +cpf[i] * (len + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };

  return calc(9) === +cpf[9] && calc(10) === +cpf[10] ? null : { cpf: true };
}

export function cnpjValidator(c: AbstractControl): ValidationErrors | null {
  const v = (c.value ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!v) return null;
  if (!/^[A-Z0-9]{12}\d{2}$/.test(v) || /^(.)\1{13}$/.test(v)) return { cnpj: true };

  const calc = (base: string, weights: number[]) => {
    const sum = weights.reduce((s, w, i) => s + (base.charCodeAt(i) - 48) * w, 0);
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  const d1 = calc(v.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calc(v.slice(0, 12) + d1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return d1 === +v[12] && d2 === +v[13] ? null : { cnpj: true };
}

export function phoneValidator(c: AbstractControl): ValidationErrors | null {
  const v = (c.value ?? '').replace(/\D/g, '');
  if (!v) return null;
  return v.length === 10 || v.length === 11 ? null : { phone: true };
}

export function birthDateValidator(c: AbstractControl): ValidationErrors | null {
  const v: string = c.value ?? '';
  if (!v) return null;
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v);
  if (!m) return { date: true };
  const [, d, mo, y] = m.map(Number);
  const date = new Date(y, mo - 1, d);
  const valid =
    date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d;
  return valid && date <= new Date() && y > 1900 ? null : { date: true };
}

export function plateValidator(c: AbstractControl): ValidationErrors | null {
  const v = c.value ?? '';
  if (!v) return null;
  return /^[A-Z]{3}\d[A-Z0-9]\d{2}$/.test(v) ? null : { plate: true };
}

// Optional positive number; accepts "60", "62.5" or "62,5"
export function positiveNumberValidator(c: AbstractControl): ValidationErrors | null {
  const v = (c.value ?? '').toString().trim();
  if (!v) return null;
  const n = Number(v.replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? null : { number: true };
}