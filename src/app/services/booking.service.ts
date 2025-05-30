import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Booking, BookingRequest } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: Booking[] = [];

  constructor() {}

  createBooking(bookingRequest: BookingRequest): Observable<Booking> {
    // In a real app, this would be an API call
    const mockBooking: Booking = {
      id: `BOOK-${Math.floor(Math.random() * 1000000)}`,
      bookingDate: new Date().toISOString(),
      journeyDate: bookingRequest.journeyDate,
      status: 'confirmed',
      pnr: `PNR${Math.floor(Math.random() * 10000000)}`,
      busId: bookingRequest.busId,
      busDetails: {
        operatorName: 'Sharma Travels', // This would come from the API in a real app
        busType: 'AC Sleeper (2+1)',
        departureTime: '22:00',
        arrivalTime: '06:00'
      },
      boardingPoint: {
        name: 'Anand Vihar',
        time: '22:00',
        address: 'Anand Vihar ISBT, Delhi'
      },
      droppingPoint: {
        name: 'Sector 43',
        time: '06:00',
        address: 'Sector 43 ISBT, Chandigarh'
      },
      passengers: bookingRequest.passengers,
      fare: bookingRequest.fare,
      contactEmail: bookingRequest.contactEmail,
      contactPhone: bookingRequest.contactPhone
    };
    
    this.bookings.push(mockBooking);
    
    return of(mockBooking).pipe(delay(1000));
  }

  getBookingById(id: string): Observable<Booking | undefined> {
    const booking = this.bookings.find(b => b.id === id);
    return of(booking).pipe(delay(500));
  }

  getUserBookings(): Observable<Booking[]> {
    return of(this.bookings).pipe(delay(800));
  }

  cancelBooking(id: string): Observable<{ success: boolean }> {
    const bookingIndex = this.bookings.findIndex(b => b.id === id);
    
    if (bookingIndex !== -1) {
      this.bookings[bookingIndex].status = 'cancelled';
      return of({ success: true }).pipe(delay(800));
    }
    
    return of({ success: false }).pipe(delay(800));
  }
}