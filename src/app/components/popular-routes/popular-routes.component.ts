import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PopularRoute {
  from: string;
  to: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-popular-routes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="popular-routes">
      <div class="container">
        <h2 class="section-title">Popular Routes</h2>
        
        <div class="routes-grid">
          @for (route of popularRoutes; track route.from + route.to) {
            <div class="route-card" [style.backgroundImage]="'url(' + route.image + ')'">
              <div class="route-info">
                <div class="route-name">
                  <span class="from">{{ route.from }}</span>
                  <span class="route-arrow">→</span>
                  <span class="to">{{ route.to }}</span>
                </div>
                <div class="route-price">Starting from ₹{{ route.price }}</div>
                <a [routerLink]="['/bus-list']" 
                   [queryParams]="{ from: route.from, to: route.to, date: todayDate }" 
                   class="route-button">
                  Book Now
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .popular-routes {
      padding: var(--space-10) 0;
    }
    
    .section-title {
      text-align: center;
      margin-bottom: var(--space-8);
      color: var(--neutral-900);
      font-size: var(--text-3xl);
      font-weight: 700;
    }
    
    .routes-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-6);
    }
    
    .route-card {
      height: 240px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      position: relative;
      background-size: cover;
      background-position: center;
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .route-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7));
      z-index: 1;
    }
    
    .route-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .route-info {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: var(--space-4);
      color: white;
      z-index: 2;
    }
    
    .route-name {
      font-size: var(--text-xl);
      font-weight: 600;
      margin-bottom: var(--space-2);
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }
    
    .route-arrow {
      margin: 0 var(--space-1);
      font-size: var(--text-lg);
    }
    
    .route-price {
      margin-bottom: var(--space-3);
      font-size: var(--text-sm);
      opacity: 0.9;
    }
    
    .route-button {
      display: inline-block;
      background-color: var(--primary);
      color: white;
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-md);
      font-weight: 500;
      text-decoration: none;
      transition: background-color 0.2s ease;
      font-size: var(--text-sm);
    }
    
    .route-button:hover {
      background-color: var(--primary-dark);
      text-decoration: none;
      color: white;
    }
    
    @media screen and (max-width: 992px) {
      .routes-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media screen and (max-width: 768px) {
      .routes-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PopularRoutesComponent {
  todayDate = this.formatDate(new Date());
  
  popularRoutes: PopularRoute[] = [
    {
      from: 'Delhi',
      to: 'Chandigarh',
      price: 800,
      image: 'https://images.pexels.com/photos/1534057/pexels-photo-1534057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      from: 'Mumbai',
      to: 'Pune',
      price: 450,
      image: 'https://images.pexels.com/photos/3290068/pexels-photo-3290068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      from: 'Bangalore',
      to: 'Hyderabad',
      price: 950,
      image: 'https://images.pexels.com/photos/2526935/pexels-photo-2526935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      from: 'Chennai',
      to: 'Coimbatore',
      price: 650,
      image: 'https://images.pexels.com/photos/6002748/pexels-photo-6002748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      from: 'Kolkata',
      to: 'Siliguri',
      price: 750,
      image: 'https://images.pexels.com/photos/2845013/pexels-photo-2845013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      from: 'Ahmedabad',
      to: 'Surat',
      price: 350,
      image: 'https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
  
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}