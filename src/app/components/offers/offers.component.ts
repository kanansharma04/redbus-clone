import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Offer {
  id: string;
  title: string;
  code: string;
  description: string;
  validUntil: string;
  image: string;
}

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="offers-section">
      <div class="container">
        <h2 class="section-title">Offers & Discounts</h2>
        
        <div class="offers-container">
          <div class="offers-slider">
            @for (offer of offers; track offer.id) {
              <div class="offer-card">
                <div class="offer-image">
                  <img [src]="offer.image" [alt]="offer.title" class="offer-img">
                </div>
                <div class="offer-content">
                  <h3 class="offer-title">{{ offer.title }}</h3>
                  <div class="offer-code">
                    <span class="code">{{ offer.code }}</span>
                    <button class="copy-btn" (click)="copyCode(offer.code)">Copy</button>
                  </div>
                  <p class="offer-description">{{ offer.description }}</p>
                  <p class="offer-validity">Valid till: {{ offer.validUntil }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .offers-section {
      padding: var(--space-10) 0;
      background-color: var(--neutral-100);
    }
    
    .section-title {
      text-align: center;
      margin-bottom: var(--space-8);
      color: var(--neutral-900);
      font-size: var(--text-3xl);
      font-weight: 700;
    }
    
    .offers-container {
      position: relative;
      overflow: hidden;
    }
    
    .offers-slider {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-6);
    }
    
    .offer-card {
      background-color: white;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .offer-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .offer-image {
      height: 150px;
      overflow: hidden;
    }
    
    .offer-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .offer-card:hover .offer-img {
      transform: scale(1.05);
    }
    
    .offer-content {
      padding: var(--space-4);
    }
    
    .offer-title {
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--neutral-900);
      margin-bottom: var(--space-3);
    }
    
    .offer-code {
      display: flex;
      align-items: center;
      margin-bottom: var(--space-3);
      gap: var(--space-2);
    }
    
    .code {
      background-color: var(--neutral-100);
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      font-family: monospace;
      font-weight: 600;
      color: var(--primary);
      letter-spacing: 0.5px;
    }
    
    .copy-btn {
      background-color: var(--secondary);
      color: white;
      border: none;
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .copy-btn:hover {
      background-color: var(--secondary-dark);
    }
    
    .offer-description {
      color: var(--neutral-700);
      font-size: var(--text-sm);
      margin-bottom: var(--space-3);
      line-height: 1.6;
    }
    
    .offer-validity {
      color: var(--neutral-500);
      font-size: var(--text-xs);
      font-style: italic;
    }
    
    @media screen and (max-width: 992px) {
      .offers-slider {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media screen and (max-width: 768px) {
      .offers-slider {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class OffersComponent {
  offers: Offer[] = [
    {
      id: '1',
      title: 'First Trip Discount',
      code: 'FIRST200',
      description: 'Get ₹200 off on your first trip booking. Minimum booking amount ₹1000.',
      validUntil: '31 Dec 2025',
      image: 'https://images.pexels.com/photos/3755761/pexels-photo-3755761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '2',
      title: 'Weekend Special',
      code: 'WEEKEND15',
      description: '15% off on all weekend trips. Maximum discount up to ₹500.',
      validUntil: '30 Jun 2025',
      image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '3',
      title: 'Summer Vacation Offer',
      code: 'SUMMER25',
      description: 'Flat 25% off on all bookings for travel between May 1st to June 30th.',
      validUntil: '30 Jun 2025',
      image: 'https://images.pexels.com/photos/386025/pexels-photo-386025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
  
  copyCode(code: string): void {
    navigator.clipboard.writeText(code).then(() => {
      alert('Coupon code copied to clipboard!');
    });
  }
}