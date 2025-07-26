export interface Bus {
  id: string;
  name: string;
  type: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  rating: number;
  amenities: string[];
  totalSeats: number;
  availableSeats: number;
  bookedSeats: string[];
  seatLayout: {
    rows: number;
    seatsPerRow: number;
    aisleAfter: number;
  };
}

export interface Passenger {
  name: string;
  gender: string;
  age: number;
}

export interface BookingDetails {
  id: string;
  bus: Bus;
  seats: string[];
  passengers: Passenger[];
  totalAmount: number;
  bookingDate: string;
  from: string;
  to: string;
  travelDate: string;
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
}