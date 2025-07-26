import React, { useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { Passenger } from '../types';

interface PassengerDetailsProps {
  seats: string[];
  passengers: Passenger[];
  onSubmit: (passengers: Passenger[]) => void;
  onBack: () => void;
}

const PassengerDetails: React.FC<PassengerDetailsProps> = ({ 
  seats, 
  passengers, 
  onSubmit, 
  onBack 
}) => {
  const [passengerData, setPassengerData] = useState<Passenger[]>(passengers);

  const updatePassenger = (index: number, field: keyof Passenger, value: string | number) => {
    setPassengerData(prev => 
      prev.map((passenger, i) => 
        i === index ? { ...passenger, [field]: value } : passenger
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = passengerData.every(p => p.name && p.gender && p.age > 0);
    if (isValid) {
      onSubmit(passengerData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Passenger Details</h2>
            <p className="text-gray-600">Enter details for {seats.length} passenger(s)</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {seats.map((seat, index) => (
            <div key={seat} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Passenger {index + 1} - Seat {seat}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={passengerData[index]?.name || ''}
                    onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    value={passengerData[index]?.gender || ''}
                    onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    value={passengerData[index]?.age || ''}
                    onChange={(e) => updatePassenger(index, 'age', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Age"
                    min="1"
                    max="120"
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Important Guidelines:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Please ensure passenger names match their ID proof</li>
              <li>• ID proof is mandatory for boarding</li>
              <li>• Age should be accurate for fare calculation</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PassengerDetails;