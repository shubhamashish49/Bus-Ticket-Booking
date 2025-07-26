import { Bus } from '../types';

export const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Patna', 'Bhopal', 'Agra', 'Vadodara'
];

export const generateMockBuses = (from: string, to: string): Bus[] => {
  const busOperators = [
    'Volvo Express', 'Royal Travels', 'Interstate Bus Service', 'Comfort Travels',
    'Highway Express', 'State Transport', 'Premium Travels', 'Deluxe Coaches'
  ];

  const busTypes = ['AC Sleeper', 'Non-AC Sleeper', 'AC Seater', 'Non-AC Seater', 'Volvo AC'];
  const amenities = ['WiFi', 'Charging Port', 'Entertainment', 'Blanket', 'Water Bottle', 'Snacks'];

  return Array.from({ length: 8 }, (_, index) => {
    const operator = busOperators[Math.floor(Math.random() * busOperators.length)];
    const type = busTypes[Math.floor(Math.random() * busTypes.length)];
    const depHour = Math.floor(Math.random() * 24);
    const depMinute = Math.floor(Math.random() * 60);
    const duration = Math.floor(Math.random() * 12) + 4; // 4-16 hours
    const arrivalTime = new Date();
    arrivalTime.setHours(depHour + duration, depMinute);
    
    const totalSeats = type.includes('Sleeper') ? 36 : 45;
    const bookedCount = Math.floor(Math.random() * totalSeats * 0.6);
    
    return {
      id: `bus-${index + 1}`,
      name: `${operator} ${type}`,
      type,
      departureTime: `${depHour.toString().padStart(2, '0')}:${depMinute.toString().padStart(2, '0')}`,
      arrivalTime: `${arrivalTime.getHours().toString().padStart(2, '0')}:${arrivalTime.getMinutes().toString().padStart(2, '0')}`,
      duration: `${duration}h ${Math.floor(Math.random() * 60)}m`,
      price: Math.floor(Math.random() * 1500) + 500,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      amenities: amenities.slice(0, Math.floor(Math.random() * 4) + 2),
      totalSeats,
      availableSeats: totalSeats - bookedCount,
      bookedSeats: Array.from({ length: bookedCount }, (_, i) => `${Math.floor(i / 4) + 1}${String.fromCharCode(65 + (i % 4))}`),
      seatLayout: {
        rows: type.includes('Sleeper') ? 12 : 15,
        seatsPerRow: type.includes('Sleeper') ? 3 : 4,
        aisleAfter: type.includes('Sleeper') ? 1 : 2
      }
    };
  });
};