import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { PopularRoutesComponent } from '../../components/popular-routes/popular-routes.component';
import { OffersComponent } from '../../components/offers/offers.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchFormComponent, PopularRoutesComponent, OffersComponent],
  template: `
    <div class="home-page">
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">Book Bus Tickets</h1>
            <p class="hero-subtitle">Travel with comfort and safety</p>
            
            <app-search-form class="search-form"></app-search-form>
          </div>
        </div>
      </section>
      
      <app-popular-routes></app-popular-routes>
      
      <section class="advantages-section">
        <div class="container">
          <h2 class="section-title">Why Choose Us</h2>
          
          <div class="advantages-grid">
            <div class="advantage-card">
              <div class="advantage-icon">🎫</div>
              <h3 class="advantage-title">Hassle-free Booking</h3>
              <p class="advantage-description">Book bus tickets online with just a few clicks. Easy and convenient booking experience.</p>
            </div>
            
            <div class="advantage-card">
              <div class="advantage-icon">💰</div>
              <h3 class="advantage-title">Best Prices</h3>
              <p class="advantage-description">Get the best fares and amazing seasonal offers on bus tickets.</p>
            </div>
            
            <div class="advantage-card">
              <div class="advantage-icon">🔍</div>
              <h3 class="advantage-title">Extensive Options</h3>
              <p class="advantage-description">Compare and choose from thousands of bus operators across the country.</p>
            </div>
            
            <div class="advantage-card">
              <div class="advantage-icon">🔒</div>
              <h3 class="advantage-title">Safe & Secure</h3>
              <p class="advantage-description">Secure payment options and 100% safe booking experience.</p>
            </div>
          </div>
        </div>
      </section>
      
      <app-offers></app-offers>
      
      <section class="download-app">
        <div class="container">
          <div class="download-content">
            <div class="download-info">
              <h2 class="download-title">Download Our App</h2>
              <p class="download-description">
                Get the RedBus app for a seamless booking experience. Access your tickets, get exclusive app-only offers, and book faster with saved preferences.
              </p>
              <div class="app-stores">
                <a href="#" class="app-link">
                  <img src="https://via.placeholder.com/150x50" alt="App Store" class="app-store-img">
                </a>
                <a href="#" class="app-link">
                  <img src="https://via.placeholder.com/150x50" alt="Google Play" class="app-store-img">
                </a>
              </div>
            </div>
            <div class="app-preview">
              <img src="https://via.placeholder.com/300x600" alt="App Preview" class="app-preview-img">
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero-section {
      background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      background-size: cover;
      background-position: center;
      color: white;
      padding: var(--space-12) 0;
      position: relative;
    }
    
    .hero-content {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .hero-title {
      font-size: var(--text-4xl);
      font-weight: 700;
      margin-bottom: var(--space-3);
      animation: fadeIn 0.5s ease-in;
    }
    
    .hero-subtitle {
      font-size: var(--text-xl);
      margin-bottom: var(--space-8);
      opacity: 0.9;
      animation: fadeIn 0.5s ease-in 0.2s both;
    }
    
    .search-form {
      animation: slideInUp 0.5s ease-out 0.4s both;
    }
    
    .advantages-section {
      padding: var(--space-10) 0;
      background-color: white;
    }
    
    .section-title {
      text-align: center;
      margin-bottom: var(--space-8);
      color: var(--neutral-900);
      font-size: var(--text-3xl);
      font-weight: 700;
    }
    
    .advantages-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-6);
    }
    
    .advantage-card {
      background-color: white;
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .advantage-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .advantage-icon {
      font-size: 48px;
      margin-bottom: var(--space-4);
    }
    
    .advantage-title {
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--neutral-900);
      margin-bottom: var(--space-3);
    }
    
    .advantage-description {
      color: var(--neutral-700);
      font-size: var(--text-sm);
      line-height: 1.6;
    }
    
    .download-app {
      padding: var(--space-10) 0;
      background-color: var(--neutral-100);
    }
    
    .download-content {
      display: flex;
      align-items: center;
      gap: var(--space-8);
    }
    
    .download-info {
      flex: 1;
    }
    
    .download-title {
      font-size: var(--text-3xl);
      font-weight: 700;
      color: var(--neutral-900);
      margin-bottom: var(--space-4);
    }
    
    .download-description {
      color: var(--neutral-700);
      margin-bottom: var(--space-6);
      font-size: var(--text-base);
      line-height: 1.6;
    }
    
    .app-stores {
      display: flex;
      gap: var(--space-4);
    }
    
    .app-link {
      transition: transform 0.2s ease;
    }
    
    .app-link:hover {
      transform: translateY(-3px);
    }
    
    .app-store-img {
      border-radius: var(--radius-md);
    }
    
    .app-preview {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    
    .app-preview-img {
      max-height: 500px;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
    }
    
    @media screen and (max-width: 992px) {
      .advantages-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .download-content {
        flex-direction: column;
      }
      
      .download-info, .app-preview {
        width: 100%;
        text-align: center;
      }
      
      .app-stores {
        justify-content: center;
      }
    }
    
    @media screen and (max-width: 768px) {
      .hero-title {
        font-size: var(--text-3xl);
      }
      
      .hero-subtitle {
        font-size: var(--text-lg);
      }
      
      .advantages-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {}