import { Injectable, signal } from '@angular/core';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'redbus_auth';
  private currentUserSignal = signal<User | null>(null);
  
  isLoggedIn = signal<boolean>(false);
  currentUser = this.currentUserSignal.asReadonly();

  constructor() {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Mock login - would be replaced with real API call
    if (credentials.email === 'user@example.com' && credentials.password === 'password') {
      const authResponse: AuthResponse = {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          name: 'John Doe',
          email: 'user@example.com',
          phone: '1234567890'
        }
      };
      
      return of(authResponse).pipe(
        delay(800), // Simulate network delay
        tap(response => this.setSession(response))
      );
    }
    
    return throwError(() => new Error('Invalid email or password'));
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    // Mock registration - would be replaced with real API call
    const authResponse: AuthResponse = {
      token: 'mock-jwt-token',
      user: {
        id: '1',
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      }
    };
    
    return of(authResponse).pipe(
      delay(800), // Simulate network delay
      tap(response => this.setSession(response))
    );
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSignal.set(null);
    this.isLoggedIn.set(false);
  }

  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authResponse));
    this.currentUserSignal.set(authResponse.user);
    this.isLoggedIn.set(true);
  }

  private loadUserFromStorage(): void {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      try {
        const authData: AuthResponse = JSON.parse(storedData);
        this.currentUserSignal.set(authData.user);
        this.isLoggedIn.set(true);
      } catch (e) {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
  }
}