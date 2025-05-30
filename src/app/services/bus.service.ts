import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Bus, BusFilter, SeatLayout } from '../models/bus.model';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private mockBuses: Bus[] = [
    {
      id: '1',
      operatorName: 'Sharma Travels',
      operatorLogo: 'https://via.placeholder.com/50',
      busType: 'AC Sleeper (2+1)',
      departureTime: '22:00',
      arrivalTime: '06:00',
      duration: '8h 0m',
      fare: 1200,
      rating: 4.5,
      totalReviews: 320,
      availableSeats: 18,
      totalSeats: 36,
      amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket', 'Movie', 'Reading Light'],
      boardingPoints: [
        { id: 'b1', name: 'Anand Vihar', time: '22:00', address: 'Anand Vihar ISBT, Delhi' },
        { id: 'b2', name: 'Kashmere Gate', time: '22:30', address: 'Kashmere Gate ISBT, Delhi' }
      ],
      droppingPoints: [
        { id: 'd1', name: 'Sector 43', time: '06:00', address: 'Sector 43 ISBT, Chandigarh' },
        { id: 'd2', name: 'Sector 17', time: '06:15', address: 'Sector 17 Bus Stand, Chandigarh' }
      ],
      cancellationPolicy: 'Cancellation charges will be 10% of the total fare if cancelled before 12 hours of departure.'
    },
    {
      id: '2',
      operatorName: 'Royal Travels',
      operatorLogo: 'https://via.placeholder.com/50',
      busType: 'Non-AC Seater',
      departureTime: '21:30',
      arrivalTime: '05:30',
      duration: '8h 0m',
      fare: 800,
      rating: 3.8,
      totalReviews: 156,
      availableSeats: 22,
      totalSeats: 40,
      amenities: ['Charging Point', 'Water Bottle'],
      boardingPoints: [
        { id: 'b1', name: 'Anand Vihar', time: '21:30', address: 'Anand Vihar ISBT, Delhi' }
      ],
      droppingPoints: [
        { id: 'd1', name: 'Sector 43', time: '05:30', address: 'Sector 43 ISBT, Chandigarh' }
      ],
      cancellationPolicy: 'Cancellation charges will be 15% of the total fare if cancelled before 12 hours of departure.'
    },
    {
      id: '3',
      operatorName: 'Volvo Express',
      operatorLogo: 'https://via.placeholder.com/50',
      busType: 'AC Volvo Seater (2+2)',
      departureTime: '20:45',
      arrivalTime: '05:15',
      duration: '8h 30m',
      fare: 1500,
      rating: 4.7,
      totalReviews: 420,
      availableSeats: 12,
      totalSeats: 42,
      amenities: ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket', 'Movie', 'Reading Light', 'Snacks'],
      boardingPoints: [
        { id: 'b1', name: 'Anand Vihar', time: '20:45', address: 'Anand Vihar ISBT, Delhi' },
        { id: 'b2', name: 'Kashmere Gate', time: '21:15', address: 'Kashmere Gate ISBT, Delhi' }
      ],
      droppingPoints: [
        { id: 'd1', name: 'Sector 43', time: '05:15', address: 'Sector 43 ISBT, Chandigarh' },
        { id: 'd2', name: 'Sector 17', time: '05:30', address: 'Sector 17 Bus Stand, Chandigarh' }
      ],
      cancellationPolicy: 'Cancellation charges will be 10% of the total fare if cancelled before 24 hours of departure.'
    }
  ];

  constructor() { }

  searchBuses(from: string, to: string, date: string): Observable<Bus[]> {
    // In a real app, this would be an API call with query params
    return of(this.mockBuses).pipe(delay(800));
  }

  getBusById(id: string): Observable<Bus | undefined> {
    const bus = this.mockBuses.find(b => b.id === id);
    return of(bus).pipe(delay(300));
  }

  getSeatLayout(busId: string): Observable<SeatLayout> {
    // Mock seat layout
    const seatLayout: SeatLayout = {
      rows: 9,
      cols: 5,
      seats: this.generateMockSeats()
    };
    
    return of(seatLayout).pipe(delay(500));
  }

  private generateMockSeats(): any[] {
    const seats = [];
    const statusOptions: Array<'available' | 'booked' | 'ladies'> = ['available', 'booked', 'ladies'];
    
    // Generate lower deck seats
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 5; col++) {
        // Skip the middle column (aisle)
        if (col === 2) continue;
        
        const seatNumber = `L${row + 1}${['A', 'B', 'C', 'D'][col === 3 ? 2 : (col === 4 ? 3 : col)]}`;
        const randomStatus = statusOptions[Math.floor(Math.random() * (statusOptions.length - 0.2))]; // Bias towards available
        
        seats.push({
          id: `lower-${row}-${col}`,
          number: seatNumber,
          status: randomStatus,
          fare: 1200,
          type: 'sleeper',
          deck: 'lower',
          position: { row, col }
        });
      }
    }
    
    // Generate upper deck seats
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 5; col++) {
        // Skip the middle column (aisle)
        if (col === 2) continue;
        
        const seatNumber = `U${row + 1}${['A', 'B', 'C', 'D'][col === 3 ? 2 : (col === 4 ? 3 : col)]}`;
        const randomStatus = statusOptions[Math.floor(Math.random() * (statusOptions.length - 0.2))]; // Bias towards available
        
        seats.push({
          id: `upper-${row}-${col}`,
          number: seatNumber,
          status: randomStatus,
          fare: 1100, // Upper deck slightly cheaper
          type: 'sleeper',
          deck: 'upper',
          position: { row, col }
        });
      }
    }
    
    return seats;
  }

  applyFilters(buses: Bus[], filters: BusFilter): Bus[] {
    let filteredBuses = [...buses];
    
    // Filter by departure time
    if (filters.departureTime && filters.departureTime.length) {
      filteredBuses = filteredBuses.filter(bus => {
        const hour = parseInt(bus.departureTime.split(':')[0]);
        if (filters.departureTime?.includes('morning') && hour >= 5 && hour < 12) return true;
        if (filters.departureTime?.includes('afternoon') && hour >= 12 && hour < 17) return true;
        if (filters.departureTime?.includes('evening') && hour >= 17 && hour < 21) return true;
        if (filters.departureTime?.includes('night') && (hour >= 21 || hour < 5)) return true;
        return false;
      });
    }
    
    // Filter by bus type
    if (filters.busType && filters.busType.length) {
      filteredBuses = filteredBuses.filter(bus => {
        return filters.busType?.some(type => bus.busType.toLowerCase().includes(type.toLowerCase()));
      });
    }
    
    // Filter by operator name
    if (filters.operatorName && filters.operatorName.length) {
      filteredBuses = filteredBuses.filter(bus => {
        return filters.operatorName?.includes(bus.operatorName);
      });
    }
    
    // Filter by amenities
    if (filters.amenities && filters.amenities.length) {
      filteredBuses = filteredBuses.filter(bus => {
        return filters.amenities?.every(amenity => 
          bus.amenities.some(a => a.toLowerCase() === amenity.toLowerCase())
        );
      });
    }
    
    // Filter by price range
    if (filters.priceRange) {
      filteredBuses = filteredBuses.filter(bus => {
        return bus.fare >= filters.priceRange!.min && bus.fare <= filters.priceRange!.max;
      });
    }
    
    return filteredBuses;
  }
}