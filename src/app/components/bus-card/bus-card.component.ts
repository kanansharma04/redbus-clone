import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Bus } from '../../models/bus.model';

@Component({
  selector: 'app-bus-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bus-card">
      <div class="bus-info">
        <div class="bus-operator">
          <div class="operator-name">{{ bus.operatorName }}</div>
          <div class="bus-type">{{ bus.busType }}</div>
        </div>
        
        <div class="bus-timing">
          <div class="departure">
            <div class="time">{{ bus.departureTime }}</div>
            <div class="label">Departure</div>
          </div>
          
          <div class="duration">
            <div class="duration-line"></div>
            <div class="duration-text">{{ bus.duration }}</div>
          </div>
          
          <div class="arrival">
            <div class="time">{{ bus.arrivalTime }}</div>
            <div class="label">Arrival</div>
          </div>
        </div>
        
        <div class="bus-rating">
          <div class="rating-value">{{ bus.rating }}/5</div>
          <div class="rating-count">{{ bus.totalReviews }} ratings</div>
        </div>
        
        <div class="bus-seats">
          <div class="seats-available">{{ bus.availableSeats }} Seats Available</div>
          <div class="seat-layout">{{ bus.availableSeats }}/{{ bus.totalSeats }}</div>
        </div>
        
        <div class="bus-fare">
          <div class="fare-amount">₹{{ bus.fare }}</div>
          <div class="fare-label">Per Seat</div>
        </div>
      </div>
      
      <div class="bus-amenities">
        <div class="amenities-list">
          @for (amenity of bus.amenities.slice(0, 5); track amenity) {
            <span class="amenity-tag">{{ amenity }}</span>
          }
          @if (bus.amenities.length > 5) {
            <span class="amenity-tag more-tag">+{{ bus.amenities.length - 5 }} more</span>
          }
        </div>
        
        <div class="bus-actions">
          <button class="btn-outline btn-sm view-details" (click)="toggleDetails()">
            {{ showDetails ? 'Hide Details' : 'View Details' }}
          </button>
          <a [routerLink]="['/bus-details', bus.id]" class="btn-primary btn-sm select-seats">
            Select Seats
          </a>
        </div>
      </div>
      
      @if (showDetails) {
        <div class="bus-details slide-in-up">
          <div class="details-section">
            <h4 class="details-title">Boarding Points</h4>
            <div class="points-list">
              @for (point of bus.boardingPoints; track point.id) {
                <div class="point-item">
                  <div class="point-name">{{ point.name }}</div>
                  <div class="point-time">{{ point.time }}</div>
                  <div class="point-address">{{ point.address }}</div>
                </div>
              }
            </div>
          </div>
          
          <div class="details-section">
            <h4 class="details-title">Dropping Points</h4>
            <div class="points-list">
              @for (point of bus.droppingPoints; track point.id) {
                <div class="point-item">
                  <div class="point-name">{{ point.name }}</div>
                  <div class="point-time">{{ point.time }}</div>
                  <div class="point-address">{{ point.address }}</div>
                </div>
              }
            </div>
          </div>
          
          <div class="details-section">
            <h4 class="details-title">Cancellation Policy</h4>
            <p class="cancellation-policy">{{ bus.cancellationPolicy }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .bus-card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      margin-bottom: var(--space-4);
      overflow: hidden;
      transition: box-shadow 0.2s ease;
    }
    
    .bus-card:hover {
      box-shadow: var(--shadow-lg);
    }
    
    .bus-info {
      display: grid;
      grid-template-columns: 2fr 3fr 1fr 1fr 1fr;
      padding: var(--space-4);
      border-bottom: 1px solid var(--neutral-200);
      gap: var(--space-4);
      align-items: center;
    }
    
    .bus-operator {
      display: flex;
      flex-direction: column;
    }
    
    .operator-name {
      font-weight: 600;
      font-size: var(--text-lg);
      color: var(--neutral-900);
      margin-bottom: var(--space-1);
    }
    
    .bus-type {
      color: var(--neutral-600);
      font-size: var(--text-sm);
    }
    
    .bus-timing {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .departure, .arrival {
      text-align: center;
    }
    
    .time {
      font-size: var(--text-xl);
      font-weight: 600;
      color: var(--neutral-900);
    }
    
    .label {
      font-size: var(--text-xs);
      color: var(--neutral-500);
      margin-top: var(--space-1);
    }
    
    .duration {
      position: relative;
      text-align: center;
      flex: 1;
      padding: 0 var(--space-4);
    }
    
    .duration-line {
      height: 2px;
      background-color: var(--neutral-300);
      position: relative;
    }
    
    .duration-line::before, .duration-line::after {
      content: '';
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--neutral-300);
      top: -2px;
    }
    
    .duration-line::before {
      left: 0;
    }
    
    .duration-line::after {
      right: 0;
    }
    
    .duration-text {
      font-size: var(--text-xs);
      color: var(--neutral-500);
      margin-top: var(--space-2);
    }
    
    .bus-rating, .bus-seats {
      text-align: center;
    }
    
    .rating-value {
      font-weight: 600;
      color: var(--neutral-900);
      font-size: var(--text-base);
    }
    
    .rating-count, .seat-layout {
      font-size: var(--text-xs);
      color: var(--neutral-500);
      margin-top: var(--space-1);
    }
    
    .seats-available {
      font-weight: 600;
      color: var(--success);
      font-size: var(--text-base);
    }
    
    .bus-fare {
      text-align: center;
    }
    
    .fare-amount {
      font-weight: 700;
      color: var(--primary);
      font-size: var(--text-xl);
    }
    
    .fare-label {
      font-size: var(--text-xs);
      color: var(--neutral-500);
      margin-top: var(--space-1);
    }
    
    .bus-amenities {
      padding: var(--space-4);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .amenities-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    
    .amenity-tag {
      background-color: var(--neutral-100);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-sm);
      font-size: var(--text-xs);
      color: var(--neutral-700);
    }
    
    .more-tag {
      background-color: var(--neutral-200);
      color: var(--neutral-800);
    }
    
    .bus-actions {
      display: flex;
      gap: var(--space-3);
    }
    
    .view-details, .select-seats {
      transition: all 0.2s ease;
    }
    
    .select-seats:hover {
      transform: translateY(-2px);
    }
    
    .bus-details {
      padding: var(--space-4);
      background-color: var(--neutral-50);
      border-top: 1px solid var(--neutral-200);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-4);
    }
    
    .details-title {
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--neutral-800);
      margin-bottom: var(--space-3);
    }
    
    .points-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
    
    .point-item {
      padding: var(--space-2);
      border-radius: var(--radius-md);
      background-color: white;
      border: 1px solid var(--neutral-200);
    }
    
    .point-name {
      font-weight: 600;
      color: var(--neutral-900);
      font-size: var(--text-sm);
    }
    
    .point-time {
      color: var(--primary);
      font-weight: 500;
      font-size: var(--text-sm);
      margin: var(--space-1) 0;
    }
    
    .point-address {
      font-size: var(--text-xs);
      color: var(--neutral-600);
    }
    
    .cancellation-policy {
      font-size: var(--text-sm);
      color: var(--neutral-700);
      line-height: 1.6;
    }
    
    @media screen and (max-width: 992px) {
      .bus-info {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto auto;
      }
      
      .bus-operator {
        grid-column: 1 / 3;
      }
      
      .bus-timing {
        grid-column: 1 / 3;
      }
      
      .bus-details {
        grid-template-columns: 1fr;
      }
    }
    
    @media screen and (max-width: 768px) {
      .bus-amenities {
        flex-direction: column;
        gap: var(--space-3);
      }
      
      .amenities-list {
        justify-content: center;
      }
    }
  `]
})
export class BusCardComponent {
  @Input() bus!: Bus;
  showDetails = false;
  
  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}