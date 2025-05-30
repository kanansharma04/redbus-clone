import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="search-form-container">
      <form class="search-form" (submit)="onSearchSubmit()">
        <div class="form-row">
          <div class="form-group">
            <label for="source" class="form-label">FROM</label>
            <input
              type="text"
              id="source"
              name="source"
              [(ngModel)]="searchData.source"
              class="form-control"
              placeholder="Enter source city"
              required
            />
          </div>
          
          <button type="button" class="swap-btn" (click)="swapLocations()">
            <span class="swap-icon">⇄</span>
          </button>
          
          <div class="form-group">
            <label for="destination" class="form-label">TO</label>
            <input
              type="text"
              id="destination"
              name="destination"
              [(ngModel)]="searchData.destination"
              class="form-control"
              placeholder="Enter destination city"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="date" class="form-label">DATE</label>
            <input
              type="date"
              id="date"
              name="date"
              [(ngModel)]="searchData.date"
              class="form-control"
              [min]="minDate"
              required
            />
          </div>
          
          <button type="submit" class="search-btn">
            SEARCH BUSES
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .search-form-container {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      padding: var(--space-6);
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .search-form {
      width: 100%;
    }
    
    .form-row {
      display: flex;
      align-items: flex-end;
      gap: var(--space-4);
    }
    
    .form-group {
      flex: 1;
      position: relative;
    }
    
    .form-label {
      display: block;
      font-weight: 600;
      color: var(--neutral-700);
      margin-bottom: var(--space-2);
      font-size: var(--text-sm);
    }
    
    .form-control {
      width: 100%;
      padding: var(--space-3) var(--space-4);
      border: 1px solid var(--neutral-300);
      border-radius: var(--radius-md);
      font-size: var(--text-base);
      transition: all 0.2s ease;
    }
    
    .form-control:focus {
      border-color: var(--primary);
      outline: none;
      box-shadow: 0 0 0 3px rgba(216, 78, 85, 0.2);
    }
    
    .form-control::placeholder {
      color: var(--neutral-400);
    }
    
    .swap-btn {
      background-color: white;
      border: 2px solid var(--primary);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-bottom: var(--space-2);
      transition: all 0.2s ease;
      color: var(--primary);
      font-weight: bold;
    }
    
    .swap-btn:hover {
      background-color: var(--primary);
      color: white;
      transform: rotate(180deg);
    }
    
    .swap-icon {
      font-size: 18px;
    }
    
    .search-btn {
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      padding: var(--space-3) var(--space-6);
      font-weight: 600;
      font-size: var(--text-base);
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 180px;
    }
    
    .search-btn:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
    }
    
    .search-btn:active {
      transform: translateY(0);
    }
    
    @media screen and (max-width: 992px) {
      .form-row {
        flex-wrap: wrap;
      }
      
      .form-group {
        flex-basis: calc(50% - var(--space-4));
      }
      
      .search-btn {
        margin-top: var(--space-4);
        width: 100%;
      }
    }
    
    @media screen and (max-width: 768px) {
      .form-row {
        flex-direction: column;
      }
      
      .form-group {
        width: 100%;
      }
      
      .swap-btn {
        align-self: center;
        margin: var(--space-2) 0;
      }
    }
  `]
})
export class SearchFormComponent {
  searchData = {
    source: '',
    destination: '',
    date: this.formatDate(new Date())
  };
  
  minDate = this.formatDate(new Date());
  
  constructor(private router: Router) {}
  
  swapLocations(): void {
    const temp = this.searchData.source;
    this.searchData.source = this.searchData.destination;
    this.searchData.destination = temp;
  }
  
  onSearchSubmit(): void {
    if (this.searchData.source && this.searchData.destination && this.searchData.date) {
      this.router.navigate(['/bus-list'], { 
        queryParams: { 
          from: this.searchData.source,
          to: this.searchData.destination,
          date: this.searchData.date
        }
      });
    }
  }
  
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}