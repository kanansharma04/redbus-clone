export interface Passenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  seatNumber: string;
}

export interface BookingRequest {
  busId: string;
  journeyDate: string;
  boardingPointId: string;
  droppingPointId: string;
  passengers: Passenger[];
  fare: number;
  contactEmail: string;
  contactPhone: string;
}

export interface Booking {
  id: string;
  bookingDate: string;
  journeyDate: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  pnr: string;
  busId: string;
  busDetails: {
    operatorName: string;
    busType: string;
    departureTime: string;
    arrivalTime: string;
  };
  boardingPoint: {
    name: string;
    time: string;
    address: string;
  };
  droppingPoint: {
    name: string;
    time: string;
    address: string;
  };
  passengers: Passenger[];
  fare: number;
  contactEmail: string;
  contactPhone: string;
}