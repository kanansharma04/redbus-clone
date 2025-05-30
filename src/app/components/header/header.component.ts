import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/" class="logo-link">
              <span class="logo-text">Red<span class="logo-text-bold">Bus</span></span>
            </a>
          </div>
          
          <nav class="nav">
            <ul class="nav-list">
              <li class="nav-item">
                <a routerLink="/" class="nav-link">Bus Tickets</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">RYDE</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">redRail</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">Cab Rental</a>
              </li>
            </ul>
          </nav>
          
          <div class="user-actions">
            @if (authService.isLoggedIn()) {
              <div class="user-profile">
                <span class="user-name">{{ authService.currentUser()?.name }}</span>
                <div class="user-menu">
                  <a href="#" class="user-menu-link">My Bookings</a>
                  <a href="#" class="user-menu-link">Profile</a>
                  <a href="#" class="user-menu-link">Wallet</a>
                  <button class="logout-btn" (click)="logout()">Logout</button>
                </div>
              </div>
            } @else {
              <a routerLink="/login" class="btn btn-outline btn-sm">Login / Register</a>
            }
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--primary);
      color: white;
      padding: var(--space-3) 0;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
    }
    
    .logo-text {
      font-size: var(--text-2xl);
      font-weight: 400;
      color: white;
      letter-spacing: -0.5px;
    }
    
    .logo-text-bold {
      font-weight: 700;
    }
    
    .nav-list {
      display: flex;
      list-style: none;
      gap: var(--space-6);
    }
    
    .nav-link {
      color: white;
      font-weight: 500;
      text-decoration: none;
      position: relative;
      transition: all 0.2s ease;
    }
    
    .nav-link:hover {
      color: var(--neutral-100);
      text-decoration: none;
    }
    
    .nav-link:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: white;
      transition: width 0.3s ease;
    }
    
    .nav-link:hover:after {
      width: 100%;
    }
    
    .user-actions {
      position: relative;
    }
    
    .user-profile {
      position: relative;
      cursor: pointer;
    }
    
    .user-name {
      font-weight: 500;
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-md);
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .user-profile:hover .user-menu {
      display: block;
    }
    
    .user-menu {
      display: none;
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: var(--space-2);
      background-color: white;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      min-width: 180px;
      overflow: hidden;
      animation: fadeIn 0.2s ease;
    }
    
    .user-menu-link {
      display: block;
      padding: var(--space-3) var(--space-4);
      color: var(--neutral-800);
      transition: background-color 0.2s ease;
      text-decoration: none;
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .user-menu-link:hover {
      background-color: var(--neutral-100);
      color: var(--primary);
      text-decoration: none;
    }
    
    .logout-btn {
      display: block;
      width: 100%;
      text-align: left;
      padding: var(--space-3) var(--space-4);
      background-color: white;
      border: none;
      color: var(--error);
      font-family: inherit;
      font-size: inherit;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .logout-btn:hover {
      background-color: var(--neutral-100);
    }
    
    @media screen and (max-width: 768px) {
      .nav {
        display: none;
      }
      
      .header-content {
        justify-content: space-between;
      }
    }
  `]
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}
  
  logout(): void {
    this.authService.logout();
  }
}