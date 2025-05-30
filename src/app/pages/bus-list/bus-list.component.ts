import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Bus, BusFilter } from '../../models/bus.model';
import { BusService } from '../../services/bus.service';
import { BusCardComponent } from '../../components/bus-card/bus-card.component';
import { FilterSidebarComponent } from '../../components/filter-sidebar/filter-sidebar.component';
import { SearchFormComponent } from '../../components/search-form/search-form.component';

@Component({
  selector: 'app-bus-list',
  standalone: true,
  imports: [CommonModule, BusCardComponent, FilterSidebarComponent, SearchFormComponent],
  template: `
    <div class="bus-list-page">
      <div class="search-container">
        <div class="container">
          <app-search-form></app-search-form>
        </div>
      </div>
      
      <div class="container">
        <div class="journey-info">
          <div class="route-info">
            <h1>{{ searchParams.from }} to {{ searchParams.to }}</h1>
            <p class="journey-date">{{ formatDate(searchParams.date) }}</p>
          </div>
          
          @if (buses.length > 0) {
            <div class="buses-count">{{ buses.length }} buses found</div>
          }
        </div>
        
        <div class="content-container">
          <div class="sidebar">
            <app-filter-sidebar
              [filter]="filter"
              (filterChange)="applyFilters($event)"
            ></app-filter-sidebar>
          </div>
          
          <div class="main-content">
            @if (loading) {
              <div class="loading-container">
                <div class="loader"></div>
                <p>Searching for buses...</p>
              </div>
            } @else if (buses.length === 0) {
              <div class="no-results">
                <h3>No buses found for this route</h3>
                <p>Try changing your search criteria or date</p>
              </div>
            } @else {
              <div class="sort-controls">
                <span>Sort by: </span>
                <button 
                  class="sort-btn" 
                  [class.active]="sortBy === 'departure'"
                  (click)="sortBuses('departure')"
                >
                  Departure
                </button>
                <button 
                  class="sort-btn" 
                  [class.active]="sortBy === 'duration'"
                  (click)="sortBuses('duration')"
                >
                  Duration
                </button>
                <button 
                  class="sort-btn" 
                  [class.active]="sortBy === 'fare'"
                  (click)="sortBuses('fare')"
                >
                  Fare
                </button>
                <button 
                  class="sort-btn" 
                  [class.active]="sortBy === 'rating'"
                  (click)="sortBuses('rating')"
                >
                  Rating
                </button>
              </div>
              
              <div class="bus-list">
                @for (bus of buses; track bus.id) {
                  <app-bus-card [bus]="bus"></app-bus-card>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bus-list-page {
      padding-bottom: var(--space-10);
    }
    
    .search-container {
      background-color: var(--primary);
      padding: var(--space-6) 0;
      margin-bottom: var(--space-6);
    }
    
    .journey-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-6);
    }
    
    .route-info h1 {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--neutral-900);
      margin-bottom: var(--space-1);
    }
    
    .journey-date {
      color: var(--neutral-600);
      font-size: var(--text-base);
    }
    
    .buses-count {
      background-color: var(--primary);
      color: white;
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-md);
      font-weight: 500;
    }
    
    .content-container {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: var(--space-6);
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-10);
      color: var(--neutral-700);
    }
    
    .loader {
      border: 4px solid var(--neutral-200);
      border-top: 4px solid var(--primary);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin-bottom: var(--space-4);
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .no-results {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-8);
      text-align: center;
      box-shadow: var(--shadow-md);
    }
    
    .no-results h3 {
      color: var(--neutral-900);
      font-size: var(--text-xl);
      margin-bottom: var(--space-2);
    }
    
    .no-results p {
      color: var(--neutral-600);
    }
    
    .sort-controls {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-3) var(--space-4);
      margin-bottom: var(--space-4);
      display: flex;
      align-items: center;
      gap: var(--space-3);
      box-shadow: var(--shadow-sm);
    }
    
    .sort-controls span {
      color: var(--neutral-600);
      font-size: var(--text-sm);
    }
    
    .sort-btn {
      background: none;
      border: none;
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--neutral-700);
    }
    
    .sort-btn:hover {
      background-color: var(--neutral-100);
    }
    
    .sort-btn.active {
      background-color: var(--primary);
      color: white;
    }
    
    .bus-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
    
    @media screen and (max-width: 992px) {
      .content-container {
        grid-template-columns: 1fr;
      }
      
      .sort-controls {
        overflow-x: auto;
        white-space: nowrap;
        padding: var(--space-2) var(--space-3);
      }
    }
    
    @media screen and (max-width: 768px) {
      .journey-info {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-2);
      }
      
      .buses-count {
        align-self: flex-start;
      }
    }
  `]
})
export class BusListComponent implements OnInit {
  buses: Bus[] = [];
  filteredBuses: Bus[] = [];
  loading = true;
  searchParams = {
    from: '',
    to: '',
    date: ''
  };
  filter: BusFilter = {
    departureTime: [],
    busType: [],
    amenities: [],
    priceRange: {
      min: 100,
      max: 3000
    }
  };
  sortBy: 'departure' | 'duration' | 'fare' | 'rating' = 'departure';
  
  constructor(
    private route: ActivatedRoute,
    private busService: BusService
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = {
        from: params['from'] || 'Delhi',
        to: params['to'] || 'Mumbai',
        date: params['date'] || new Date().toISOString().slice(0, 10)
      };
      
      this.searchBuses();
    });
  }
  
  searchBuses(): void {
    this.loading = true;
    
    this.busService.searchBuses(
      this.searchParams.from,
      this.searchParams.to,
      this.searchParams.date
    ).subscribe(buses => {
      this.buses = buses;
      this.filteredBuses = [...buses];
      this.sortBuses(this.sortBy);
      this.loading = false;
    });
  }
  
  applyFilters(filter: BusFilter): void {
    this.filter = filter;
    this.filteredBuses = this.busService.applyFilters(this.buses, filter);
    this.sortBuses(this.sortBy);
  }
  
  sortBuses(sortBy: 'departure' | 'duration' | 'fare' | 'rating'): void {
    this.sortBy = sortBy;
    
    switch (sortBy) {
      case 'departure':
        this.buses.sort((a, b) => {
          const timeA = this.convertToMinutes(a.departureTime);
          const timeB = this.convertToMinutes(b.departureTime);
          return timeA - timeB;
        });
        break;
        
      case 'duration':
        this.buses.sort((a, b) => {
          const durationA = this.convertDurationToMinutes(a.duration);
          const durationB = this.convertDurationToMinutes(b.duration);
          return durationA - durationB;
        });
        break;
        
      case 'fare':
        this.buses.sort((a, b) => a.fare - b.fare);
        break;
        
      case 'rating':
        this.buses.sort((a, b) => b.rating - a.rating);
        break;
    }
  }
  
  private convertToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  private convertDurationToMinutes(duration: string): number {
    // Format: "8h 30m"
    const hours = parseInt(duration.split('h')[0]) || 0;
    const minutes = parseInt(duration.split('h')[1]?.split('m')[0]) || 0;
    return hours * 60 + minutes;
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
}