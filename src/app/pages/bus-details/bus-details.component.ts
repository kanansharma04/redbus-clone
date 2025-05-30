import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BusService } from '../../services/bus.service';
import { Bus, Seat, SeatLayout } from '../../models/bus.model';
import { SeatLayoutComponent } from '../../components/seat-layout/seat-layout.component';

@Component({
  selector: 'app-bus-details',
  standalone: true,
  imports: [CommonModule, FormsModule, SeatLayoutComponent],
  template: `
    <div class="bus-details-page">
      <div class="container">
        @if (loading) {
          <div class="loading-container">
            <div class="loader"></div>
            <p>Loading bus details...</p>
          </div>
        } @else if (!bus) {
          <div class="error-container">
            <h2>Bus Not Found</h2>
            <p>The bus you're looking for doesn't exist or has been removed.</p>
            <button class="btn btn-primary" (click)="goBack()">Go Back</button>
          </div>
        } @else {
          <div class="back-link" (click)="goBack()">
            ← Back to search results
          </div>
          
          <div class="bus-overview card">
            <div class="bus-header">
              <div class="bus-title">
                <h1>{{ bus.operatorName }}</h1>
                <div class="bus-type">{{ bus.busType }}</div>
              </div>
              
              <div class="bus-rating">
                <span class="rating-value">{{ bus.rating }}/5</span>
                <span class="rating-count">{{ bus.totalReviews }} ratings</span>
              </div>
            </div>
            
            <div class="journey-details">
              <div class="time-section departure">
                <div class="time">{{ bus.departureTime }}</div>
                <div class="date">{{ formatDate(journeyDate) }}</div>
                <div class="location">{{ source }}</div>
              </div>
              
              <div class="journey-line">
                <div class="duration">{{ bus.duration }}</div>
              </div>
              
              <div class="time-section arrival">
                <div class="time">{{ bus.arrivalTime }}</div>
                <div class="date">{{ formatArrivalDate(journeyDate, bus.departureTime, bus.arrivalTime) }}</div>
                <div class="location">{{ destination }}</div>
              </div>
            </div>
          </div>
          
          <div class="seat-selection card">
            <h2 class="section-title">Select Seats</h2>
            
            @if (seatLayout) {
              <app-seat-layout 
                [seatLayout]="seatLayout"
                (selectedSeatsChange)="onSelectedSeatsChange($event)"
              ></app-seat-layout>
            } @else {
              <div class="loading-seats">
                <div class="loader"></div>
                <p>Loading seat layout...</p>
              </div>
            }
          </div>
          
          @if (selectedSeats.length > 0) {
            <div class="booking-footer">
              <div class="selected-seats-summary">
                <div class="seats-info">
                  <span class="seats-count">{{ selectedSeats.length }} Seats</span>
                  <span class="seats-numbers">{{ getSeatNumbers() }}</span>
                </div>
                <div class="total-fare">
                  Total: <span class="fare-amount">₹{{ getTotalFare() }}</span>
                </div>
              </div>
              
              <div class="boarding-point">
                <label for="boardingPoint" class="boarding-label">Boarding Point:</label>
                <select id="boardingPoint" class="form-select" [(ngModel)]="selectedBoardingPoint">
                  @for (point of bus.boardingPoints; track point.id) {
                    <option [value]="point.id">{{ point.name }} - {{ point.time }}</option>
                  }
                </select>
              </div>
              
              <div class="dropping-point">
                <label for="droppingPoint" class="dropping-label">Dropping Point:</label>
                <select id="droppingPoint" class="form-select" [(ngModel)]="selectedDroppingPoint">
                  @for (point of bus.droppingPoints; track point.id) {
                    <option [value]="point.id">{{ point.name }} - {{ point.time }}</option>
                  }
                </select>
              </div>
              
              <button 
                class="proceed-btn"
                [disabled]="!canProceed()"
                (click)="proceedToBooking()"
              >
                Proceed to Book
              </button>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .bus-details-page {
      padding: var(--space-6) 0 var(--space-10);
    }
    
    .loading-container, .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-10);
      text-align: center;
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
    
    .back-link {
      color: var(--primary);
      cursor: pointer;
      margin-bottom: var(--space-4);
      display: inline-block;
      font-weight: 500;
    }
    
    .back-link:hover {
      text-decoration: underline;
    }
    
    .card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-6);
      margin-bottom: var(--space-6);
    }
    
    .bus-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-4);
    }
    
    .bus-title h1 {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--neutral-900);
      margin-bottom: var(--space-1);
    }
    
    .bus-type {
      color: var(--neutral-600);
      font-size: var(--text-base);
    }
    
    .bus-rating {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    
    .rating-value {
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--neutral-900);
    }
    
    .rating-count {
      color: var(--neutral-500);
      font-size: var(--text-sm);
    }
    
    .journey-details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-4) 0;
    }
    
    .time-section {
      text-align: center;
    }
    
    .time {
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--neutral-900);
    }
    
    .date {
      color: var(--neutral-600);
      margin: var(--space-1) 0;
    }
    
    .location {
      font-weight: 500;
      color: var(--neutral-800);
    }
    
    .journey-line {
      flex: 1;
      position: relative;
      padding: 0 var(--space-4);
    }
    
    .journey-line::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--neutral-300);
      z-index: 1;
    }
    
    .duration {
      position: relative;
      z-index: 2;
      background-color: white;
      padding: 0 var(--space-2);
      text-align: center;
      font-size: var(--text-sm);
      color: var(--neutral-500);
      width: fit-content;
      margin: 0 auto;
    }
    
    .section-title {
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--neutral-900);
      margin-bottom: var(--space-4);
    }
    
    .loading-seats {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-6);
    }
    
    .booking-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: white;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      padding: var(--space-4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 100;
    }
    
    .selected-seats-summary {
      display: flex;
      flex-direction: column;
    }
    
    .seats-info {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    
    .seats-count {
      font-weight: 600;
      color: var(--neutral-900);
    }
    
    .seats-numbers {
      color: var(--neutral-600);
      font-size: var(--text-sm);
    }
    
    .total-fare {
      font-weight: 500;
      color: var(--neutral-700);
    }
    
    .fare-amount {
      font-size: var(--text-lg);
      font-weight: 700;
      color: var(--primary);
    }
    
    .boarding-point, .dropping-point {
      display: flex;
      flex-direction: column;
      width: 200px;
    }
    
    .boarding-label, .dropping-label {
      font-size: var(--text-sm);
      color: var(--neutral-600);
      margin-bottom: var(--space-1);
    }
    
    .proceed-btn {
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      padding: var(--space-3) var(--space-6);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .proceed-btn:hover {
      background-color: var(--primary-dark);
    }
    
    .proceed-btn:disabled {
      background-color: var(--neutral-300);
      cursor: not-allowed;
    }
    
    @media screen and (max-width: 992px) {
      .booking-footer {
        flex-wrap: wrap;
        gap: var(--space-3);
      }
      
      .boarding-point, .dropping-point {
        width: calc(50% - var(--space-2));
      }
      
      .proceed-btn {
        width: 100%;
        margin-top: var(--space-3);
      }
    }
    
    @media screen and (max-width: 768px) {
      .bus-header {
        flex-direction: column;
        gap: var(--space-2);
      }
      
      .bus-rating {
        align-items: flex-start;
      }
      
      .journey-details {
        flex-direction: column;
        gap: var(--space-4);
      }
      
      .journey-line {
        width: 100%;
        height: 40px;
      }
      
      .journey-line::before {
        top: 0;
        bottom: 0;
        left: 50%;
        right: auto;
        width: 2px;
        height: auto;
      }
    }
  `]
})
export class BusDetailsComponent implements OnInit {
  bus: Bus | undefined;
  seatLayout: SeatLayout | undefined;
  selectedSeats: Seat[] = [];
  loading = true;
  journeyDate = new Date().toISOString().split('T')[0];
  source = 'Delhi';
  destination = 'Mumbai';
  selectedBoardingPoint = '';
  selectedDroppingPoint = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busService: BusService
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const busId = params.get('id');
      if (busId) {
        this.loadBusDetails(busId);
      }
    });
    
    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        this.journeyDate = params['date'];
      }
      if (params['from']) {
        this.source = params['from'];
      }
      if (params['to']) {
        this.destination = params['to'];
      }
    });
  }
  
  loadBusDetails(busId: string): void {
    this.busService.getBusById(busId).subscribe(bus => {
      this.bus = bus;
      this.loading = false;
      
      if (bus) {
        this.selectedBoardingPoint = bus.boardingPoints[0].id;
        this.selectedDroppingPoint = bus.droppingPoints[0].id;
        
        this.loadSeatLayout(busId);
      }
    });
  }
  
  loadSeatLayout(busId: string): void {
    this.busService.getSeatLayout(busId).subscribe(layout => {
      this.seatLayout = layout;
    });
  }
  
  onSelectedSeatsChange(seats: Seat[]): void {
    this.selectedSeats = seats;
  }
  
  getSeatNumbers(): string {
    return this.selectedSeats.map(seat => seat.number).join(', ');
  }
  
  getTotalFare(): number {
    return this.selectedSeats.reduce((total, seat) => total + seat.fare, 0);
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
  
  formatArrivalDate(journeyDate: string, departureTime: string, arrivalTime: string): string {
    const depHour = parseInt(departureTime.split(':')[0]);
    const arrHour = parseInt(arrivalTime.split(':')[0]);
    
    const journeyDateObj = new Date(journeyDate);
    
    // If arrival time is earlier than departure time, it's the next day
    if (arrHour < depHour) {
      journeyDateObj.setDate(journeyDateObj.getDate() + 1);
    }
    
    return journeyDateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
  
  canProceed(): boolean {
    return this.selectedSeats.length > 0 && 
           !!this.selectedBoardingPoint && 
           !!this.selectedDroppingPoint;
  }
  
  proceedToBooking(): void {
    if (this.bus) {
      this.router.navigate(['/booking', this.bus.id], {
        queryParams: {
          seats: this.selectedSeats.map(s => s.id).join(','),
          boarding: this.selectedBoardingPoint,
          dropping: this.selectedDroppingPoint,
          date: this.journeyDate,
          fare: this.getTotalFare()
        }
      });
    }
  }
  
  goBack(): void {
    this.router.navigate(['/bus-list'], {
      queryParams: {
        from: this.source,
        to: this.destination,
        date: this.journeyDate
      }
    });
  }
}