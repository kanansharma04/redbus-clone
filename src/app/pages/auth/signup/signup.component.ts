import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="container">
        <div class="auth-container">
          <div class="auth-form-container">
            <div class="auth-header">
              <h1>Create an Account</h1>
              <p>Sign up to start booking bus tickets</p>
            </div>
            
            <form class="auth-form" (submit)="onSubmit()">
              <div class="form-group">
                <label for="name" class="form-label">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  class="form-control" 
                  [(ngModel)]="signupData.name"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  class="form-control" 
                  [(ngModel)]="signupData.email"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="phone" class="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  class="form-control" 
                  [(ngModel)]="signupData.phone"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="password" class="form-label">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  class="form-control" 
                  [(ngModel)]="signupData.password"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  class="form-control" 
                  [(ngModel)]="confirmPassword"
                  required
                >
                @if (passwordError) {
                  <span class="input-error">{{ passwordError }}</span>
                }
              </div>
              
              <div class="form-group">
                <label class="terms-label">
                  <input type="checkbox" [(ngModel)]="agreeToTerms" name="agreeToTerms" required>
                  I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>
                </label>
              </div>
              
              @if (errorMessage) {
                <div class="error-message">{{ errorMessage }}</div>
              }
              
              <button 
                type="submit" 
                class="submit-btn" 
                [disabled]="loading || !canSubmit()"
              >
                {{ loading ? 'Creating Account...' : 'Sign Up' }}
              </button>
            </form>
            
            <div class="auth-footer">
              <p>Already have an account? <a routerLink="/login">Login</a></p>
            </div>
          </div>
          
          <div class="auth-image">
            <img src="https://images.pexels.com/photos/68629/pexels-photo-68629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Sign Up" class="auth-img">
            <div class="image-overlay">
              <h2>Join RedBus Today</h2>
              <p>Easy booking, great offers, and much more!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      padding: var(--space-8) 0;
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
    }
    
    .auth-container {
      display: flex;
      box-shadow: var(--shadow-lg);
      border-radius: var(--radius-lg);
      overflow: hidden;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .auth-form-container {
      flex: 1;
      padding: var(--space-8);
      background-color: white;
    }
    
    .auth-header {
      margin-bottom: var(--space-6);
      text-align: center;
    }
    
    .auth-header h1 {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--neutral-900);
      margin-bottom: var(--space-2);
    }
    
    .auth-header p {
      color: var(--neutral-600);
    }
    
    .auth-form {
      margin-bottom: var(--space-6);
    }
    
    .form-group {
      margin-bottom: var(--space-4);
    }
    
    .input-error {
      color: var(--error);
      font-size: var(--text-xs);
      margin-top: var(--space-1);
      display: block;
    }
    
    .terms-label {
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      font-size: var(--text-sm);
      color: var(--neutral-600);
    }
    
    .terms-label input {
      margin-top: 3px;
    }
    
    .terms-label a {
      color: var(--primary);
      text-decoration: none;
    }
    
    .terms-label a:hover {
      text-decoration: underline;
    }
    
    .error-message {
      background-color: var(--error-light);
      color: var(--error);
      padding: var(--space-3);
      border-radius: var(--radius-md);
      margin-bottom: var(--space-4);
      font-size: var(--text-sm);
    }
    
    .submit-btn {
      width: 100%;
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      padding: var(--space-3) 0;
      font-weight: 600;
      font-size: var(--text-base);
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .submit-btn:hover {
      background-color: var(--primary-dark);
    }
    
    .submit-btn:disabled {
      background-color: var(--neutral-300);
      cursor: not-allowed;
    }
    
    .auth-footer {
      text-align: center;
      color: var(--neutral-600);
      font-size: var(--text-sm);
    }
    
    .auth-footer a {
      color: var(--primary);
      font-weight: 600;
      text-decoration: none;
    }
    
    .auth-footer a:hover {
      text-decoration: underline;
    }
    
    .auth-image {
      flex: 1;
      position: relative;
      display: none;
    }
    
    .auth-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .image-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: var(--space-6);
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
      color: white;
    }
    
    .image-overlay h2 {
      font-size: var(--text-2xl);
      font-weight: 700;
      margin-bottom: var(--space-2);
    }
    
    @media screen and (min-width: 768px) {
      .auth-image {
        display: block;
      }
    }
  `]
})
export class SignupComponent {
  signupData = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };
  
  confirmPassword = '';
  agreeToTerms = false;
  loading = false;
  errorMessage = '';
  passwordError = '';
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  canSubmit(): boolean {
    if (!this.signupData.name || 
        !this.signupData.email || 
        !this.signupData.phone || 
        !this.signupData.password || 
        !this.confirmPassword || 
        !this.agreeToTerms) {
      return false;
    }
    
    if (this.signupData.password !== this.confirmPassword) {
      return false;
    }
    
    return true;
  }
  
  onSubmit(): void {
    if (!this.canSubmit()) return;
    
    if (this.signupData.password !== this.confirmPassword) {
      this.passwordError = 'Passwords do not match';
      return;
    }
    
    this.loading = true;
    this.errorMessage = '';
    this.passwordError = '';
    
    this.authService.register(this.signupData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message || 'Failed to create account. Please try again.';
      }
    });
  }
}