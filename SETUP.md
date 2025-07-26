# Bus Ticketing and Payment System - Setup Guide

## Overview
A comprehensive bus booking platform with route search, seat selection, passenger management, and dummy payment processing. Built with React, TypeScript, and Tailwind CSS.

## Features
- 🔍 **Route Search**: Search buses between cities with date selection
- 🚌 **Bus Listings**: View available buses with pricing, timings, and amenities
- 💺 **Seat Selection**: Interactive seat map with real-time availability
- 👥 **Passenger Management**: Collect passenger details for each seat
- 💳 **Payment Gateway**: Dummy payment system with multiple payment options
- 🎫 **Ticket Generation**: Professional ticket with download functionality
- 📱 **Responsive Design**: Works seamlessly on all devices

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React useState hooks

## Project Structure
```
src/
├── components/
│   ├── SearchForm.tsx          # Route search with city dropdown
│   ├── BusList.tsx            # Display available buses
│   ├── SeatSelection.tsx      # Interactive seat selection
│   ├── PassengerDetails.tsx   # Passenger information form
│   ├── PaymentGateway.tsx     # Dummy payment processing
│   └── TicketDownload.tsx     # Ticket generation & download
├── data/
│   └── mockData.ts            # Mock bus data and cities
├── types/
│   └── index.ts               # TypeScript interfaces
├── App.tsx                    # Main application component
└── main.tsx                   # Application entry point
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation
1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage Guide

### 1. Search for Buses
- Select departure and destination cities from dropdown
- Choose travel date (minimum tomorrow)
- Click "Search Buses" to view available options

### 2. Select Bus
- Browse through available buses with details:
  - Departure/arrival times and duration
  - Bus type and amenities
  - Pricing and seat availability
- Click "Select Seats" to proceed

### 3. Choose Seats
- View interactive seat layout
- Click on available seats to select (green = selected, red = booked)
- Review selection and click "Continue to Passenger Details"

### 4. Enter Passenger Information
- Fill in details for each selected seat:
  - Full name (required)
  - Gender (required)
  - Age (required)
- Click "Continue to Payment"

### 5. Complete Payment
- Choose from payment methods:
  - Credit/Debit Card
  - UPI
  - Net Banking
  - Digital Wallet
- Fill in dummy payment details
- Click "Pay" to process (simulated 3-second delay)

### 6. Download Ticket
- View booking confirmation
- Download printable ticket with:
  - Booking ID and journey details
  - Passenger information
  - QR code placeholder
  - Important travel guidelines

## Key Features Explained

### Seat Management
- Real-time seat availability tracking
- Prevents double booking of seats
- Visual feedback for seat selection status

### Mock Data System
- Generates realistic bus data dynamically
- 18 Indian cities with random bus schedules
- Various bus types and amenities

### Payment Simulation
- Realistic payment gateway interface
- Multiple payment method options
- Processing animation and success handling
- No actual payment processing

### Ticket Generation
- Professional ticket design
- Printable format with all booking details
- QR code placeholder for verification
- Important travel information included

## Customization Options

### Adding Cities
Edit `src/data/mockData.ts` to add more cities:
```typescript
export const cities = [
  'Mumbai', 'Delhi', 'Bangalore',
  // Add new cities here
];
```

### Modifying Bus Data
Customize bus generation logic in `generateMockBuses()` function:
- Bus operators and types
- Pricing ranges
- Amenities list
- Seat configurations

### Styling Changes
- Colors: Update Tailwind classes throughout components
- Layout: Modify component structures
- Animations: Add custom transitions and effects

## Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Notes
- Optimized for fast loading with minimal dependencies
- Responsive design for all screen sizes
- Efficient state management with React hooks
- Print-optimized ticket generation

## Future Enhancements
- Real payment gateway integration
- User authentication and trip history
- Email ticket delivery
- Bus tracking and notifications
- Multi-language support
- Mobile app version

## Support
For technical support or questions about the implementation, refer to the component documentation or modify the code according to your specific requirements.

---

**Note**: This is a demonstration system with dummy payment processing. For production use, integrate with actual payment gateways and implement proper security measures.