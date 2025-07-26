import React, { useState } from 'react';
import { ArrowLeft, User, X } from 'lucide-react';
import { Bus } from '../types';

interface SeatSelectionProps {
  bus: Bus;
  onSeatConfirm: (seats: string[]) => void;
  onBack: () => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ bus, onSeatConfirm, onBack }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const generateSeatLayout = () => {
    const seats = [];
    const { rows, seatsPerRow, aisleAfter } = bus.seatLayout;
    
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let seat = 0; seat < seatsPerRow; seat++) {
        const seatNumber = `${row}${String.fromCharCode(65 + seat)}`;
        rowSeats.push(seatNumber);
        
        if (seat + 1 === aisleAfter && seat + 1 < seatsPerRow) {
          rowSeats.push('aisle');
        }
      }
      seats.push(rowSeats);
    }
    return seats;
  };

  const seatLayout = generateSeatLayout();

  const toggleSeat = (seatNumber: string) => {
    if (bus.bookedSeats.includes(seatNumber)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatNumber)
        ? prev.filter(seat => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const getSeatStatus = (seatNumber: string) => {
    if (bus.bookedSeats.includes(seatNumber)) return 'booked';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'available';
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-red-500 text-white cursor-not-allowed';
      case 'selected': return 'bg-green-500 text-white cursor-pointer';
      case 'available': return 'bg-gray-200 text-gray-700 cursor-pointer hover:bg-gray-300';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{bus.name}</h2>
              <p className="text-gray-600">{bus.type}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">₹{bus.price}</div>
            <div className="text-sm text-gray-500">per seat</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Select Your Seats</h3>
              
              {/* Legend */}
              <div className="flex space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-200 rounded border"></div>
                  <span className="text-sm text-gray-600">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded border"></div>
                  <span className="text-sm text-gray-600">Selected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-500 rounded border"></div>
                  <span className="text-sm text-gray-600">Booked</span>
                </div>
              </div>

              {/* Bus Layout */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <div className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
                    Driver
                  </div>
                </div>
                
                <div className="space-y-2">
                  {seatLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center space-x-2">
                      {row.map((seat, seatIndex) => (
                        seat === 'aisle' ? (
                          <div key={seatIndex} className="w-8"></div>
                        ) : (
                          <button
                            key={seat}
                            onClick={() => toggleSeat(seat)}
                            className={`w-10 h-10 rounded border-2 text-xs font-medium transition-colors ${getSeatColor(getSeatStatus(seat))}`}
                            disabled={getSeatStatus(seat) === 'booked'}
                          >
                            {seat}
                          </button>
                        )
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Selection Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              
              {selectedSeats.length > 0 ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Selected Seats</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seat => (
                        <div key={seat} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          <User className="h-4 w-4 mr-1" />
                          {seat}
                          <button
                            onClick={() => toggleSeat(seat)}
                            className="ml-2 text-green-600 hover:text-green-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Seats ({selectedSeats.length})</span>
                      <span className="font-medium">₹{selectedSeats.length * bus.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total Amount</span>
                      <span>₹{selectedSeats.length * bus.price}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSeatConfirm(selectedSeats)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Continue to Passenger Details
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Select seats to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;