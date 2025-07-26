import React from 'react';
import { Clock, Users, Star, Wifi, Zap, Coffee, MapPin } from 'lucide-react';
import { Bus, SearchParams } from '../types';

interface BusListProps {
  buses: Bus[];
  onBusSelect: (bus: Bus) => void;
  searchParams: SearchParams;
}

const BusList: React.FC<BusListProps> = ({ buses, onBusSelect, searchParams }) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'charging port': return <Zap className="h-4 w-4" />;
      case 'snacks': return <Coffee className="h-4 w-4" />;
      default: return <span className="text-xs">•</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="font-medium">{searchParams.from}</span>
              <span className="mx-2">→</span>
              <span className="font-medium">{searchParams.to}</span>
            </div>
            <div className="text-gray-500">
              {new Date(searchParams.date).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {buses.length} buses found
          </div>
        </div>
      </div>

      {/* Bus Cards */}
      <div className="space-y-4">
        {buses.map((bus) => (
          <div key={bus.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{bus.name}</h3>
                      <p className="text-gray-600">{bus.type}</p>
                    </div>
                    <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded">
                      <Star className="h-4 w-4 text-green-600 fill-current" />
                      <span className="text-sm font-medium text-green-600">{bus.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Departure */}
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-semibold text-gray-900">{bus.departureTime}</div>
                        <div className="text-sm text-gray-500">{searchParams.from}</div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="text-center">
                      <div className="text-sm text-gray-500">{bus.duration}</div>
                      <div className="w-full h-px bg-gray-300 my-1 relative">
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="flex items-center space-x-3 md:justify-end">
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{bus.arrivalTime}</div>
                        <div className="text-sm text-gray-500">{searchParams.to}</div>
                      </div>
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{bus.availableSeats} seats available</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {bus.amenities.slice(0, 3).map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-1 text-gray-600">
                          {getAmenityIcon(amenity)}
                          <span className="text-xs">{amenity}</span>
                        </div>
                      ))}
                      {bus.amenities.length > 3 && (
                        <span className="text-xs text-gray-500">+{bus.amenities.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{bus.price}
                      <span className="text-sm font-normal text-gray-500 ml-1">per seat</span>
                    </div>
                    <button
                      onClick={() => onBusSelect(bus)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Select Seats
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;