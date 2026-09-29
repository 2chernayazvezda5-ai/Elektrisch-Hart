import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { SignupHeader } from '../signup-header/signup-header';
import { SignupState } from '../signup-state';

@Component({
  selector: 'app-email-verification',
  imports: [SignupHeader],
  templateUrl: './email-verification.html',
  styleUrl: './email-verification.scss',
})
export class EmailVerification implements OnInit, OnDestroy {
  @ViewChildren('digitBox') digitBoxes!: QueryList<ElementRef<HTMLInputElement>>;

  digits: string[] = ['', '', '', '', '', ''];
  secondsLeft = 300;
  private timerId?: ReturnType<typeof setInterval>;

  constructor(
    private router: Router,
    private signupState: SignupState,
  ) {}

  get email() {
    return this.signupState.driver.email || 'seu@email.com';
  }

  get timeLeft() {
    const minutes = Math.floor(this.secondsLeft / 60).toString().padStart(2, '0');
    const seconds = (this.secondsLeft % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }

  startTimer() {
    clearInterval(this.timerId);
    this.secondsLeft = 300;
    this.timerId = setInterval(() => {
      if (this.secondsLeft > 0) this.secondsLeft--;
    }, 1000);
  }

  onDigitInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(-1);
    input.value = value;
    this.digits[index] = value;
    if (value && index < 5) this.digitBoxes.get(index + 1)?.nativeElement.focus();
  }

  onDigitKeydown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace' && !this.digits[index] && index > 0) {
      this.digitBoxes.get(index - 1)?.nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 6);
    pasted.split('').forEach((char, i) => {
      this.digits[i] = char;
      this.digitBoxes.get(i)!.nativeElement.value = char;
    });
  }

  resendCode() {
    // TODO: call the backend to send a new code
    this.startTimer();
  }

  verify() {
    if (this.digits.join('').length < 6) return;
    // TODO: validate the code with the backend
    this.router.navigate(['/signup/complete']);
  }
}