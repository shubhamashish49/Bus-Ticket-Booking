import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import BusList from './components/BusList';
import SeatSelection from './components/SeatSelection';
import PassengerDetails from './components/PassengerDetails';
import PaymentGateway from './components/PaymentGateway';
import TicketDownload from './components/TicketDownload';
import { Bus, BookingDetails, Passenger } from './types';
import { generateMockBuses } from './data/mockData';

type Step = 'search' | 'buses' | 'seats' | 'passenger' | 'payment' | 'ticket';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('search');
  const [searchParams, setSearchParams] = useState({ from: '', to: '', date: '' });
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const handleSearch = (from: string, to: string, date: string) => {
    setSearchParams({ from, to, date });
    const mockBuses = generateMockBuses(from, to);
    setBuses(mockBuses);
    setCurrentStep('buses');
  };

  const handleBusSelect = (bus: Bus) => {
    setSelectedBus(bus);
    setCurrentStep('seats');
  };

  const handleSeatConfirm = (seats: string[]) => {
    setSelectedSeats(seats);
    setPassengers(seats.map(() => ({ name: '', gender: '', age: 0 })));
    setCurrentStep('passenger');
  };

  const handlePassengerSubmit = (passengerData: Passenger[]) => {
    setPassengers(passengerData);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
    if (selectedBus) {
      const booking: BookingDetails = {
        id: `BUS${Date.now()}`,
        bus: selectedBus,
        seats: selectedSeats,
        passengers,
        totalAmount: selectedSeats.length * selectedBus.price,
        bookingDate: new Date().toISOString().split('T')[0],
        from: searchParams.from,
        to: searchParams.to,
        travelDate: searchParams.date,
      };
      setBookingDetails(booking);
      
      // Update bus seat availability
      setBuses(prev => prev.map(bus => 
        bus.id === selectedBus.id 
          ? { ...bus, bookedSeats: [...bus.bookedSeats, ...selectedSeats] }
          : bus
      ));
      
      setCurrentStep('ticket');
    }
  };

  const resetBooking = () => {
    setCurrentStep('search');
    setSelectedBus(null);
    setSelectedSeats([]);
    setPassengers([]);
    setBookingDetails(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={resetBooking}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">BusBooker</span>
            </div>
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Help</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">My Trips</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      {currentStep !== 'search' && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <div className="flex items-center space-x-4">
                {['buses', 'seats', 'passenger', 'payment', 'ticket'].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep === step
                          ? 'bg-blue-600 text-white'
                          : ['buses', 'seats', 'passenger', 'payment', 'ticket'].indexOf(currentStep) > index
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 capitalize">{step}</span>
                    {index < 4 && <div className="w-8 h-0.5 bg-gray-200 ml-4" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'search' && <SearchForm onSearch={handleSearch} />}
        {currentStep === 'buses' && (
          <BusList 
            buses={buses} 
            onBusSelect={handleBusSelect}
            searchParams={searchParams}
          />
        )}
        {currentStep === 'seats' && selectedBus && (
          <SeatSelection 
            bus={selectedBus} 
            onSeatConfirm={handleSeatConfirm}
            onBack={() => setCurrentStep('buses')}
          />
        )}
        {currentStep === 'passenger' && (
          <PassengerDetails
            seats={selectedSeats}
            passengers={passengers}
            onSubmit={handlePassengerSubmit}
            onBack={() => setCurrentStep('seats')}
          />
        )}
        {currentStep === 'payment' && selectedBus && (
          <PaymentGateway
            amount={selectedSeats.length * selectedBus.price}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={() => setCurrentStep('passenger')}
          />
        )}
        {currentStep === 'ticket' && bookingDetails && (
          <TicketDownload 
            booking={bookingDetails}
            onNewBooking={resetBooking}
          />
        )}
      </main>
    </div>
  );
}

export default App;