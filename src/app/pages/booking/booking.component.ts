import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { BookingService } from '../../services/booking.service';
import { Bus, Seat } from '../../models/bus.model';
import { Passenger, BookingRequest } from '../../models/booking.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="booking-page">
      <div class="container">
        @if (loading) {
          <div class="loading-container">
            <div class="loader"></div>
            <p>Loading booking information...</p>
          </div>
        } @else if (!bus) {
          <div class="error-container">
            <h2>Bus Not Found</h2>
            <p>The bus you're looking for doesn't exist or has been removed.</p>
            <button class="btn btn-primary" (click)="goToHome()">Go to Home</button>
          </div>
        } @else {
          <div class="booking-flow">
            <div class="booking-header">
              <h1>Complete Your Booking</h1>
              <p class="journey-info">
                {{ bus.operatorName }} - {{ formatDate(journeyDate) }}
              </p>
            </div>
            
            <div class="booking-container">
              <div class="booking-form">
                <h2 class="section-title">Passenger Details</h2>
                
                <div class="passenger-section">
                  @for (seat of selectedSeats; track seat.id; let i = $index) {
                    <div class="passenger-form card">
                      <div class="seat-info">
                        <span class="seat-label">Seat {{ seat.number }}</span>
                        <span class="seat-fare">₹{{ seat.fare }}</span>
                      </div>
                      
                      <div class="form-row">
                        <div class="form-group">
                          <label for="passengerName{{ i }}" class="form-label">Passenger Name</label>
                          <input 
                            type="text" 
                            class="form-control" 
                            id="passengerName{{ i }}" 
                            [(ngModel)]="passengers[i].name"
                            required
                          >
                        </div>
                        
                        <div class="form-group">
                          <label for="passengerAge{{ i }}" class="form-label">Age</label>
                          <input 
                            type="number" 
                            class="form-control" 
                            id="passengerAge{{ i }}" 
                            [(ngModel)]="passengers[i].age"
                            min="1"
                            max="99"
                            required
                          >
                        </div>
                        
                        <div class="form-group">
                          <label class="form-label">Gender</label>
                          <div class="radio-group">
                            <label class="radio-label">
                              <input 
                                type="radio" 
                                name="gender{{ i }}" 
                                value="male" 
                                [(ngModel)]="passengers[i].gender"
                              >
                              Male
                            </label>
                            <label class="radio-label">
                              <input 
                                type="radio" 
                                name="gender{{ i }}" 
                                value="female" 
                                [(ngModel)]="passengers[i].gender"
                              >
                              Female
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
                
                <div class="contact-section">
                  <h2 class="section-title">Contact Details</h2>
                  
                  <div class="card">
                    <div class="form-row">
                      <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input 
                          type="email" 
                          class="form-control" 
                          id="email" 
                          [(ngModel)]="contactDetails.email"
                          required
                        >
                        <small class="form-text">Your ticket will be sent to this email</small>
                      </div>
                      
                      <div class="form-group">
                        <label for="phone" class="form-label">Mobile Number</label>
                        <input 
                          type="tel" 
                          class="form-control" 
                          id="phone" 
                          [(ngModel)]="contactDetails.phone"
                          required
                        >
                        <small class="form-text">For ticket-related communications</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="booking-summary">
                <div class="summary-card">
                  <h3 class="summary-title">Booking Summary</h3>
                  
                  <div class="summary-item">
                    <span class="item-label">Bus Type</span>
                    <span class="item-value">{{ bus.busType }}</span>
                  </div>
                  
                  <div class="summary-item">
                    <span class="item-label">Journey Date</span>
                    <span class="item-value">{{ formatDate(journeyDate) }}</span>
                  </div>
                  
                  <div class="summary-item">
                    <span class="item-label">Departure</span>
                    <span class="item-value">{{ bus.departureTime }}</span>
                  </div>
                  
                  <div class="summary-item">
                    <span class="item-label">Boarding Point</span>
                    <span class="item-value">{{ getBoardingPoint()?.name }}</span>
                  </div>
                  
                  <div class="summary-item">
                    <span class="item-label">Dropping Point</span>
                    <span class="item-value">{{ getDroppingPoint()?.name }}</span>
                  </div>
                  
                  <div class="summary-item">
                    <span class="item-label">Selected Seats</span>
                    <span class="item-value">{{ getSelectedSeatNumbers() }}</span>
                  </div>
                  
                  <div class="fare-breakup">
                    <div class="breakup-item">
                      <span>Base Fare</span>
                      <span>₹{{ totalFare }}</span>
                    </div>
                    <div class="breakup-item">
                      <span>Taxes & Fees</span>
                      <span>₹{{ getTaxAmount() }}</span>
                    </div>
                  </div>
                  
                  <div class="total-amount">
                    <span>Total Amount</span>
                    <span>₹{{ getFinalAmount() }}</span>
                  </div>
                  
                  <button 
                    class="pay-button"
                    [disabled]="!isFormValid()"
                    (click)="confirmBooking()"
                  >
                    Pay ₹{{ getFinalAmount() }}
                  </button>
                  
                  <div class="payment-methods">
                    <span>We accept:</span>
                    <div class="methods-list">
                      <span class="method">Credit Card</span>
                      <span class="method">Debit Card</span>
                      <span class="method">UPI</span>
                      <span class="method">Net Banking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .booking-page {
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
    
    .booking-header {
      margin-bottom: var(--space-6);
    }
    
    .booking-header h1 {
      font-size: var(--text-3xl);
      font-weight: 700;
      color: var(--neutral-900);
      margin-bottom: var(--space-2);
    }
    
    .journey-info {
      color: var(--neutral-600);
      font-size: var(--text-lg);
    }
    
    .booking-container {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--space-6);
    }
    
    .section-title {
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--neutral-900);
      margin-bottom: var(--space-4);
    }
    
    .passenger-section {
      margin-bottom: var(--space-6);
    }
    
    .card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-4);
      margin-bottom: var(--space-4);
    }
    
    .seat-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: var(--space-3);
      margin-bottom: var(--space-3);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .seat-label {
      font-weight: 600;
      color: var(--neutral-900);
    }
    
    .seat-fare {
      color: var(--primary);
      font-weight: 600;
    }
    
    .form-row {
      display: flex;
      gap: var(--space-4);
    }
    
    .form-group {
      flex: 1;
      margin-bottom: var(--space-3);
    }
    
    .form-label {
      display: block;
      margin-bottom: var(--space-2);
      font-weight: 500;
      color: var(--neutral-700);
    }
    
    .form-text {
      display: block;
      margin-top: var(--space-1);
      font-size: var(--text-xs);
      color: var(--neutral-500);
    }
    
    .radio-group {
      display: flex;
      gap: var(--space-4);
    }
    
    .radio-label {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      cursor: pointer;
    }
    
    .summary-card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-4);
      position: sticky;
      top: var(--space-4);
    }
    
    .summary-title {
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--neutral-900);
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .summary-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-3);
    }
    
    .item-label {
      color: var(--neutral-600);
    }
    
    .item-value {
      font-weight: 500;
      color: var(--neutral-900);
    }
    
    .fare-breakup {
      margin-top: var(--space-4);
      padding-top: var(--space-3);
      border-top: 1px dashed var(--neutral-200);
    }
    
    .breakup-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-2);
      color: var(--neutral-700);
      font-size: var(--text-sm);
    }
    
    .total-amount {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: var(--text-lg);
      margin: var(--space-4) 0;
      padding-top: var(--space-3);
      border-top: 1px solid var(--neutral-200);
    }
    
    .pay-button {
      width: 100%;
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      padding: var(--space-3) 0;
      font-weight: 600;
      font-size: var(--text-lg);
      cursor: pointer;
      transition: background-color 0.2s ease;
      margin-bottom: var(--space-4);
    }
    
    .pay-button:hover {
      background-color: var(--primary-dark);
    }
    
    .pay-button:disabled {
      background-color: var(--neutral-300);
      cursor: not-allowed;
    }
    
    .payment-methods {
      font-size: var(--text-sm);
      color: var(--neutral-600);
      text-align: center;
    }
    
    .methods-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin-top: var(--space-2);
    }
    
    .method {
      padding: var(--space-1) var(--space-2);
      background-color: var(--neutral-100);
      border-radius: var(--radius-sm);
      font-size: var(--text-xs);
    }
    
    @media screen and (max-width: 992px) {
      .booking-container {
        grid-template-columns: 1fr;
      }
      
      .summary-card {
        position: static;
      }
    }
    
    @media screen and (max-width: 768px) {
      .form-row {
        flex-direction: column;
        gap: var(--space-2);
      }
    }
  `]
})
export class BookingComponent implements OnInit {
  bus: Bus | undefined;
  selectedSeats: Seat[] = [];
  loading = true;
  journeyDate = new Date().toISOString().split('T')[0];
  boardingPointId = '';
  droppingPointId = '';
  totalFare = 0;
  
  passengers: Passenger[] = [];
  contactDetails = {
    email: '',
    phone: ''
  };
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busService: BusService,
    private bookingService: BookingService
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
      if (params['boarding']) {
        this.boardingPointId = params['boarding'];
      }
      if (params['dropping']) {
        this.droppingPointId = params['dropping'];
      }
      if (params['fare']) {
        this.totalFare = parseInt(params['fare']);
      }
      if (params['seats']) {
        const seatIds = params['seats'].split(',');
        this.initializeSeats(seatIds);
      }
    });
  }
  
  loadBusDetails(busId: string): void {
    this.busService.getBusById(busId).subscribe(bus => {
      this.bus = bus;
      this.loading = false;
    });
  }
  
  initializeSeats(seatIds: string[]): void {
    this.busService.getSeatLayout(this.route.snapshot.paramMap.get('id') || '').subscribe(layout => {
      this.selectedSeats = layout.seats.filter(seat => seatIds.includes(seat.id));
      
      // Initialize passenger data
      this.passengers = this.selectedSeats.map(seat => ({
        name: '',
        age: 30,
        gender: 'male' as 'male' | 'female' | 'other',
        seatNumber: seat.number
      }));
    });
  }
  
  getBoardingPoint() {
    return this.bus?.boardingPoints.find(point => point.id === this.boardingPointId);
  }
  
  getDroppingPoint() {
    return this.bus?.droppingPoints.find(point => point.id === this.droppingPointId);
  }
  
  getSelectedSeatNumbers(): string {
    return this.selectedSeats.map(seat => seat.number).join(', ');
  }
  
  getTaxAmount(): number {
    // Calculate 5% tax
    return Math.round(this.totalFare * 0.05);
  }
  
  getFinalAmount(): number {
    return this.totalFare + this.getTaxAmount();
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
  
  isFormValid(): boolean {
    // Check passenger details
    const passengersValid = this.passengers.every(passenger => 
      passenger.name.trim() !== '' && 
      passenger.age > 0 && 
      ['male', 'female', 'other'].includes(passenger.gender)
    );
    
    // Check contact details
    const contactValid = 
      this.contactDetails.email.trim() !== '' && 
      this.contactDetails.phone.trim() !== '';
    
    return passengersValid && contactValid;
  }
  
  confirmBooking(): void {
    if (!this.isFormValid() || !this.bus) return;
    
    const bookingRequest: BookingRequest = {
      busId: this.bus.id,
      journeyDate: this.journeyDate,
      boardingPointId: this.boardingPointId,
      droppingPointId: this.droppingPointId,
      passengers: this.passengers,
      fare: this.getFinalAmount(),
      contactEmail: this.contactDetails.email,
      contactPhone: this.contactDetails.phone
    };
    
    this.bookingService.createBooking(bookingRequest).subscribe(booking => {
      // In a real app, this would redirect to a payment gateway
      // For now, we'll just show a success message and redirect to home
      alert(`Booking confirmed! Your PNR is: ${booking.pnr}`);
      this.router.navigate(['/']);
    });
  }
  
  goToHome(): void {
    this.router.navigate(['/']);
  }
}