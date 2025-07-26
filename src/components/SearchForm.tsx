import React, { useState } from 'react';
import { MapPin, Calendar, Search, ArrowRightLeft } from 'lucide-react';
import { cities } from '../data/mockData';

interface SearchFormProps {
  onSearch: (from: string, to: string, date: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && date) {
      onSearch(from, to, date);
    }
  };

  const swapCities = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-orange-500 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Book Your Bus Tickets</h1>
          <p className="text-xl text-blue-100">Travel comfortably across India</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* From City */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => {
                      setFrom(e.target.value);
                      setShowFromDropdown(true);
                    }}
                    onFocus={() => setShowFromDropdown(true)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter departure city"
                    required
                  />
                  {showFromDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {cities
                        .filter(city => city.toLowerCase().includes(from.toLowerCase()))
                        .map(city => (
                          <div
                            key={city}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setFrom(city);
                              setShowFromDropdown(false);
                            }}
                          >
                            {city}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex items-end justify-center">
                <button
                  type="button"
                  onClick={swapCities}
                  className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <ArrowRightLeft className="h-5 w-5" />
                </button>
              </div>

              {/* To City */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);
                      setShowToDropdown(true);
                    }}
                    onFocus={() => setShowToDropdown(true)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter destination city"
                    required
                  />
                  {showToDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {cities
                        .filter(city => city.toLowerCase().includes(to.toLowerCase()) && city !== from)
                        .map(city => (
                          <div
                            key={city}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setTo(city);
                              setShowToDropdown(false);
                            }}
                          >
                            {city}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={getTomorrowDate()}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center mx-auto"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Buses
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;