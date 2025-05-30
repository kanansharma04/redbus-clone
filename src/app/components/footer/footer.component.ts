import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4 class="footer-heading">About RedBus</h4>
            <ul class="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Mobile Version</a></li>
              <li><a href="#">RedBus on Mobile</a></li>
              <li><a href="#">Sitemap</a></li>
              <li><a href="#">Offers</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">Info</h4>
            <ul class="footer-links">
              <li><a href="#">T & C</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Agent Registration</a></li>
              <li><a href="#">Insurance Partner</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">Global Sites</h4>
            <ul class="footer-links">
              <li><a href="#">India</a></li>
              <li><a href="#">Singapore</a></li>
              <li><a href="#">Malaysia</a></li>
              <li><a href="#">Indonesia</a></li>
              <li><a href="#">Peru</a></li>
              <li><a href="#">Colombia</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">Our Partners</h4>
            <ul class="footer-links">
              <li><a href="#">Goibibo</a></li>
              <li><a href="#">Makemytrip</a></li>
            </ul>
            
            <div class="social-section mt-4">
              <h4 class="footer-heading">Follow Us</h4>
              <div class="social-links">
                <a href="#" class="social-link">Facebook</a>
                <a href="#" class="social-link">Twitter</a>
                <a href="#" class="social-link">Instagram</a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p class="copyright">© 2025 RedBus Clone. All rights reserved.</p>
          <div class="payment-methods">
            <span class="payment-method">Visa</span>
            <span class="payment-method">Mastercard</span>
            <span class="payment-method">Paytm</span>
            <span class="payment-method">UPI</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--neutral-800);
      color: var(--neutral-300);
      padding: var(--space-8) 0 var(--space-4);
      margin-top: var(--space-8);
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-8);
    }
    
    .footer-heading {
      color: white;
      font-size: var(--text-base);
      margin-bottom: var(--space-4);
      font-weight: 600;
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .footer-links li {
      margin-bottom: var(--space-2);
    }
    
    .footer-links a {
      color: var(--neutral-400);
      text-decoration: none;
      transition: color 0.2s ease;
      font-size: var(--text-sm);
    }
    
    .footer-links a:hover {
      color: white;
      text-decoration: none;
    }
    
    .social-links {
      display: flex;
      gap: var(--space-3);
      margin-top: var(--space-2);
    }
    
    .social-link {
      color: var(--neutral-400);
      text-decoration: none;
      transition: color 0.2s ease;
      font-size: var(--text-sm);
    }
    
    .social-link:hover {
      color: white;
      text-decoration: none;
    }
    
    .footer-bottom {
      margin-top: var(--space-8);
      padding-top: var(--space-4);
      border-top: 1px solid var(--neutral-700);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .copyright {
      font-size: var(--text-sm);
      color: var(--neutral-400);
      margin: 0;
    }
    
    .payment-methods {
      display: flex;
      gap: var(--space-3);
    }
    
    .payment-method {
      font-size: var(--text-sm);
      color: var(--neutral-300);
    }
    
    @media screen and (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-6);
      }
      
      .footer-bottom {
        flex-direction: column;
        gap: var(--space-3);
      }
    }
    
    @media screen and (max-width: 480px) {
      .footer-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {}