export interface Bus {
  id: string;
  operatorName: string;
  operatorLogo?: string;
  busType: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fare: number;
  rating: number;
  totalReviews: number;
  availableSeats: number;
  totalSeats: number;
  amenities: string[];
  boardingPoints: BoardingPoint[];
  droppingPoints: DroppingPoint[];
  cancellationPolicy: string;
}

export interface BoardingPoint {
  id: string;
  name: string;
  time: string;
  address: string;
}

export interface DroppingPoint {
  id: string;
  name: string;
  time: string;
  address: string;
}

export interface Seat {
  id: string;
  number: string;
  status: 'available' | 'booked' | 'selected' | 'ladies';
  fare: number;
  type: 'seater' | 'sleeper' | 'semi-sleeper';
  deck: 'lower' | 'upper';
  position: {
    row: number;
    col: number;
  };
}

export interface SeatLayout {
  rows: number;
  cols: number;
  seats: Seat[];
}

export interface BusFilter {
  departureTime?: string[];
  busType?: string[];
  operatorName?: string[];
  amenities?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
}