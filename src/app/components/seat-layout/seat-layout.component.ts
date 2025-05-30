import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatLayout, Seat } from '../../models/bus.model';

@Component({
  selector: 'app-seat-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="seat-layout-container">
      <div class="layout-info">
        <div class="seat-types">
          <div class="seat-type">
            <div class="seat-example available"></div>
            <span>Available</span>
          </div>
          
          <div class="seat-type">
            <div class="seat-example booked"></div>
            <span>Booked</span>
          </div>
          
          <div class="seat-type">
            <div class="seat-example selected"></div>
            <span>Selected</span>
          </div>
          
          <div class="seat-type">
            <div class="seat-example ladies"></div>
            <span>Ladies</span>
          </div>
        </div>
        
        <div class="deck-selector">
          <button 
            class="deck-btn" 
            [class.active]="selectedDeck === 'lower'"
            (click)="selectDeck('lower')"
          >
            Lower Deck
          </button>
          <button 
            class="deck-btn" 
            [class.active]="selectedDeck === 'upper'"
            (click)="selectDeck('upper')"
          >
            Upper Deck
          </button>
        </div>
      </div>
      
      <div class="deck-layout">
        <div class="driver-area" *ngIf="selectedDeck === 'lower'">
          <div class="steering-wheel"></div>
          <span>Driver</span>
        </div>
        
        <div class="seats-grid">
          @for (row of getRows(); track row) {
            <div class="seat-row">
              @for (col of getColumns(); track col) {
                @if (getSeatAt(row, col)) {
                  <div 
                    class="seat" 
                    [class.available]="getSeatAt(row, col)?.status === 'available'"
                    [class.booked]="getSeatAt(row, col)?.status === 'booked'"
                    [class.selected]="getSeatAt(row, col)?.status === 'selected'"
                    [class.ladies]="getSeatAt(row, col)?.status === 'ladies'"
                    [class.disabled]="getSeatAt(row, col)?.status !== 'available'"
                    (click)="toggleSeat(getSeatAt(row, col))"
                  >
                    <span class="seat-number">{{ getSeatAt(row, col)?.number }}</span>
                  </div>
                } @else if (col === 2) {
                  <div class="aisle"></div>
                } @else {
                  <div class="empty-seat"></div>
                }
              }
            </div>
          }
        </div>
      </div>
      
      @if (selectedSeats.length > 0) {
        <div class="selected-seats-info">
          <h4>Selected Seats</h4>
          <div class="selected-seats-list">
            @for (seat of selectedSeats; track seat.id) {
              <div class="selected-seat-item">
                <span class="seat-number">{{ seat.number }}</span>
                <span class="seat-fare">₹{{ seat.fare }}</span>
                <button class="remove-seat" (click)="removeSeat(seat)">✕</button>
              </div>
            }
          </div>
          <div class="total-fare">
            <span>Total Fare:</span>
            <span class="fare-amount">₹{{ getTotalFare() }}</span>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .seat-layout-container {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-4);
    }
    
    .layout-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .seat-types {
      display: flex;
      gap: var(--space-4);
    }
    
    .seat-type {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--text-sm);
      color: var(--neutral-700);
    }
    
    .seat-example {
      width: 20px;
      height: 20px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--neutral-300);
    }
    
    .seat-example.available {
      background-color: white;
    }
    
    .seat-example.booked {
      background-color: var(--neutral-300);
    }
    
    .seat-example.selected {
      background-color: var(--primary);
    }
    
    .seat-example.ladies {
      background-color: #FF9CC5;
    }
    
    .deck-selector {
      display: flex;
      gap: var(--space-2);
    }
    
    .deck-btn {
      padding: var(--space-2) var(--space-3);
      border: 1px solid var(--neutral-300);
      background-color: white;
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .deck-btn.active {
      background-color: var(--primary);
      color: white;
      border-color: var(--primary);
    }
    
    .deck-layout {
      margin-bottom: var(--space-4);
      position: relative;
    }
    
    .driver-area {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: var(--text-xs);
      color: var(--neutral-600);
    }
    
    .steering-wheel {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid var(--neutral-400);
      margin-bottom: var(--space-1);
      position: relative;
    }
    
    .steering-wheel::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid var(--neutral-400);
    }
    
    .seats-grid {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      padding-left: 40px; /* Space for driver area */
    }
    
    .seat-row {
      display: flex;
      gap: var(--space-2);
      justify-content: flex-start;
    }
    
    .seat {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--neutral-300);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      background-color: white;
      position: relative;
    }
    
    .seat.available:hover {
      background-color: var(--neutral-100);
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }
    
    .seat.booked {
      background-color: var(--neutral-300);
      cursor: not-allowed;
    }
    
    .seat.selected {
      background-color: var(--primary);
      color: white;
      border-color: var(--primary-dark);
    }
    
    .seat.ladies {
      background-color: #FF9CC5;
      cursor: not-allowed;
    }
    
    .seat.disabled {
      cursor: not-allowed;
    }
    
    .seat-number {
      font-size: var(--text-xs);
      font-weight: 500;
    }
    
    .aisle {
      width: 20px;
    }
    
    .empty-seat {
      width: 40px;
      height: 40px;
    }
    
    .selected-seats-info {
      margin-top: var(--space-4);
      padding-top: var(--space-3);
      border-top: 1px solid var(--neutral-200);
    }
    
    .selected-seats-info h4 {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--neutral-800);
      margin-bottom: var(--space-3);
    }
    
    .selected-seats-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin-bottom: var(--space-3);
    }
    
    .selected-seat-item {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      background-color: var(--neutral-100);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
    }
    
    .remove-seat {
      background: none;
      border: none;
      color: var(--neutral-500);
      cursor: pointer;
      padding: 0;
      font-size: var(--text-sm);
      transition: color 0.2s ease;
    }
    
    .remove-seat:hover {
      color: var(--error);
    }
    
    .total-fare {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      padding-top: var(--space-3);
      border-top: 1px dashed var(--neutral-200);
    }
    
    .fare-amount {
      color: var(--primary);
      font-size: var(--text-lg);
    }
    
    @media screen and (max-width: 768px) {
      .layout-info {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-3);
      }
      
      .seat-types {
        flex-wrap: wrap;
      }
    }
  `]
})
export class SeatLayoutComponent {
  @Input() seatLayout!: SeatLayout;
  @Output() selectedSeatsChange = new EventEmitter<Seat[]>();
  
  selectedDeck: 'lower' | 'upper' = 'lower';
  selectedSeats: Seat[] = [];
  
  selectDeck(deck: 'lower' | 'upper'): void {
    this.selectedDeck = deck;
  }
  
  getRows(): number[] {
    return Array.from({ length: this.seatLayout.rows }, (_, i) => i);
  }
  
  getColumns(): number[] {
    return Array.from({ length: this.seatLayout.cols }, (_, i) => i);
  }
  
  getSeatAt(row: number, col: number): Seat | undefined {
    return this.seatLayout.seats.find(seat => 
      seat.position.row === row && 
      seat.position.col === col && 
      seat.deck === this.selectedDeck
    );
  }
  
  toggleSeat(seat: Seat | undefined): void {
    if (!seat || seat.status !== 'available') {
      return;
    }
    
    const index = this.selectedSeats.findIndex(s => s.id === seat.id);
    
    if (index === -1) {
      // Add seat to selection
      this.selectedSeats.push({...seat, status: 'selected'});
    } else {
      // Remove seat from selection
      this.selectedSeats.splice(index, 1);
    }
    
    this.selectedSeatsChange.emit(this.selectedSeats);
  }
  
  removeSeat(seat: Seat): void {
    const index = this.selectedSeats.findIndex(s => s.id === seat.id);
    if (index !== -1) {
      this.selectedSeats.splice(index, 1);
      this.selectedSeatsChange.emit(this.selectedSeats);
    }
  }
  
  getTotalFare(): number {
    return this.selectedSeats.reduce((total, seat) => total + seat.fare, 0);
  }
}