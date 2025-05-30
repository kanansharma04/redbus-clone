import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusFilter } from '../../models/bus.model';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <aside class="filter-sidebar">
      <div class="filter-header">
        <h3 class="filter-title">Filters</h3>
        <button class="reset-btn" (click)="resetFilters()">Reset All</button>
      </div>
      
      <div class="filter-section">
        <h4 class="section-title">Departure Time</h4>
        <div class="filter-options">
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.departureTime?.includes('morning')"
              (change)="toggleDepartureTime('morning')"
            >
            <span class="option-label">Morning (5:00 - 11:59)</span>
          </label>
          
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.departureTime?.includes('afternoon')"
              (change)="toggleDepartureTime('afternoon')"
            >
            <span class="option-label">Afternoon (12:00 - 16:59)</span>
          </label>
          
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.departureTime?.includes('evening')"
              (change)="toggleDepartureTime('evening')"
            >
            <span class="option-label">Evening (17:00 - 20:59)</span>
          </label>
          
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.departureTime?.includes('night')"
              (change)="toggleDepartureTime('night')"
            >
            <span class="option-label">Night (21:00 - 4:59)</span>
          </label>
        </div>
      </div>
      
      <div class="filter-section">
        <h4 class="section-title">Bus Type</h4>
        <div class="filter-options">
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.busType?.includes('AC')"
              (change)="toggleBusType('AC')"
            >
            <span class="option-label">AC</span>
          </label>
          
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.busType?.includes('Non-AC')"
              (change)="toggleBusType('Non-AC')"
            >
            <span class="option-label">Non-AC</span>
          </label>
          
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.busType?.includes('Sleeper')"
              (change)="toggleBusType('Sleeper')"
            >
            <span class="option-label">Sleeper</span>
          </label>
          
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.busType?.includes('Seater')"
              (change)="toggleBusType('Seater')"
            >
            <span class="option-label">Seater</span>
          </label>
          
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.busType?.includes('Volvo')"
              (change)="toggleBusType('Volvo')"
            >
            <span class="option-label">Volvo</span>
          </label>
        </div>
      </div>
      
      <div class="filter-section">
        <h4 class="section-title">Price Range</h4>
        <div class="price-range">
          <div class="price-slider">
            <input 
              type="range" 
              min="100" 
              max="3000" 
              step="100" 
              [(ngModel)]="priceRange.max" 
              (ngModelChange)="updatePriceFilter()"
            >
          </div>
          <div class="price-labels">
            <span class="min-price">₹100</span>
            <span class="max-price">₹{{ priceRange.max }}</span>
          </div>
        </div>
      </div>
      
      <div class="filter-section">
        <h4 class="section-title">Amenities</h4>
        <div class="filter-options">
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.amenities?.includes('WiFi')"
              (change)="toggleAmenity('WiFi')"
            >
            <span class="option-label">WiFi</span>
          </label>
          
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.amenities?.includes('Charging Point')"
              (change)="toggleAmenity('Charging Point')"
            >
            <span class="option-label">Charging Point</span>
          </label>
          
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.amenities?.includes('Water Bottle')"
              (change)="toggleAmenity('Water Bottle')"
            >
            <span class="option-label">Water Bottle</span>
          </label>
          
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.amenities?.includes('Blanket')"
              (change)="toggleAmenity('Blanket')"
            >
            <span class="option-label">Blanket</span>
          </label>
          
          <label class="filter-option">
            <input 
              type="checkbox" 
              [checked]="filter.amenities?.includes('Movie')"
              (change)="toggleAmenity('Movie')"
            >
            <span class="option-label">Movie</span>
          </label>
        </div>
      </div>
      
      <button class="apply-btn" (click)="applyFilters()">Apply Filters</button>
    </aside>
  `,
  styles: [`
    .filter-sidebar {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-4);
      position: sticky;
      top: var(--space-4);
    }
    
    .filter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .filter-title {
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--neutral-900);
      margin: 0;
    }
    
    .reset-btn {
      color: var(--primary);
      background: none;
      border: none;
      font-size: var(--text-sm);
      cursor: pointer;
      padding: 0;
    }
    
    .reset-btn:hover {
      text-decoration: underline;
    }
    
    .filter-section {
      margin-bottom: var(--space-5);
    }
    
    .section-title {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--neutral-800);
      margin-bottom: var(--space-3);
    }
    
    .filter-options {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    
    .filter-option {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      cursor: pointer;
    }
    
    .option-label {
      font-size: var(--text-sm);
      color: var(--neutral-700);
    }
    
    .price-range {
      padding: 0 var(--space-1);
    }
    
    .price-slider {
      width: 100%;
      margin-bottom: var(--space-2);
    }
    
    .price-slider input {
      width: 100%;
      -webkit-appearance: none;
      height: 5px;
      border-radius: 5px;
      background: var(--neutral-300);
      outline: none;
    }
    
    .price-slider input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--primary);
      cursor: pointer;
    }
    
    .price-labels {
      display: flex;
      justify-content: space-between;
      font-size: var(--text-sm);
      color: var(--neutral-700);
    }
    
    .apply-btn {
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      padding: var(--space-3) 0;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      transition: background-color 0.2s ease;
    }
    
    .apply-btn:hover {
      background-color: var(--primary-dark);
    }
    
    @media screen and (max-width: 992px) {
      .filter-sidebar {
        position: static;
        margin-bottom: var(--space-4);
      }
    }
  `]
})
export class FilterSidebarComponent {
  @Input() filter: BusFilter = {
    departureTime: [],
    busType: [],
    amenities: [],
    priceRange: {
      min: 100,
      max: 3000
    }
  };
  
  @Output() filterChange = new EventEmitter<BusFilter>();
  
  priceRange = {
    min: 100,
    max: 3000
  };
  
  constructor() {}
  
  toggleDepartureTime(time: string): void {
    if (!this.filter.departureTime) {
      this.filter.departureTime = [];
    }
    
    const index = this.filter.departureTime.indexOf(time);
    if (index === -1) {
      this.filter.departureTime.push(time);
    } else {
      this.filter.departureTime.splice(index, 1);
    }
  }
  
  toggleBusType(type: string): void {
    if (!this.filter.busType) {
      this.filter.busType = [];
    }
    
    const index = this.filter.busType.indexOf(type);
    if (index === -1) {
      this.filter.busType.push(type);
    } else {
      this.filter.busType.splice(index, 1);
    }
  }
  
  toggleAmenity(amenity: string): void {
    if (!this.filter.amenities) {
      this.filter.amenities = [];
    }
    
    const index = this.filter.amenities.indexOf(amenity);
    if (index === -1) {
      this.filter.amenities.push(amenity);
    } else {
      this.filter.amenities.splice(index, 1);
    }
  }
  
  updatePriceFilter(): void {
    if (!this.filter.priceRange) {
      this.filter.priceRange = { min: 100, max: 3000 };
    }
    
    this.filter.priceRange.min = this.priceRange.min;
    this.filter.priceRange.max = this.priceRange.max;
  }
  
  applyFilters(): void {
    this.filterChange.emit(this.filter);
  }
  
  resetFilters(): void {
    this.filter = {
      departureTime: [],
      busType: [],
      amenities: [],
      priceRange: {
        min: 100,
        max: 3000
      }
    };
    
    this.priceRange = {
      min: 100,
      max: 3000
    };
    
    this.filterChange.emit(this.filter);
  }
}