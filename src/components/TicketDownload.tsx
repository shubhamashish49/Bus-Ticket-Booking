import React from 'react';
import { Download, CheckCircle, MapPin, Clock, User, QrCode } from 'lucide-react';
import { BookingDetails } from '../types';

interface TicketDownloadProps {
  booking: BookingDetails;
  onNewBooking: () => void;
}

const TicketDownload: React.FC<TicketDownloadProps> = ({ booking, onNewBooking }) => {
  const handleDownload = () => {
    // Create a printable ticket
    const ticketWindow = window.open('', '', 'width=800,height=600');
    if (ticketWindow) {
      ticketWindow.document.write(`
        <html>
          <head>
            <title>Bus Ticket - ${booking.id}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .ticket { border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; max-width: 600px; margin: 0 auto; }
              .header { text-align: center; border-bottom: 2px dashed #d1d5db; padding-bottom: 20px; margin-bottom: 20px; }
              .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
              .booking-id { font-size: 18px; font-weight: bold; color: #374151; }
              .details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
              .detail-group h4 { margin: 0 0 10px 0; color: #374151; font-size: 14px; font-weight: bold; }
              .detail-group p { margin: 0; color: #6b7280; }
              .seats { background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0; }
              .passenger { border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 15px; }
              .qr-placeholder { width: 80px; height: 80px; background: #f3f4f6; border: 2px dashed #d1d5db; display: flex; align-items: center; justify-content: center; margin: 20px auto; }
              .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="ticket">
              <div class="header">
                <div class="logo">🚌 BusBooker</div>
                <div class="booking-id">Booking ID: ${booking.id}</div>
                <p>E-Ticket</p>
              </div>
              
              <div class="details">
                <div class="detail-group">
                  <h4>Journey Details</h4>
                  <p><strong>From:</strong> ${booking.from}</p>
                  <p><strong>To:</strong> ${booking.to}</p>
                  <p><strong>Date:</strong> ${new Date(booking.travelDate).toLocaleDateString()}</p>
                  <p><strong>Departure:</strong> ${booking.bus.departureTime}</p>
                  <p><strong>Duration:</strong> ${booking.bus.duration}</p>
                </div>
                
                <div class="detail-group">
                  <h4>Bus Details</h4>
                  <p><strong>Bus:</strong> ${booking.bus.name}</p>
                  <p><strong>Type:</strong> ${booking.bus.type}</p>
                  <p><strong>Total Amount:</strong> ₹${booking.totalAmount}</p>
                  <p><strong>Booking Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div class="seats">
                <h4>Seat Details</h4>
                <p><strong>Seats:</strong> ${booking.seats.join(', ')}</p>
                ${booking.passengers.map((passenger, index) => `
                  <div class="passenger">
                    <p><strong>Passenger ${index + 1}:</strong> ${passenger.name} (${passenger.gender}, ${passenger.age} years) - Seat ${booking.seats[index]}</p>
                  </div>
                `).join('')}
              </div>
              
              <div class="qr-placeholder">
                <span style="font-size: 12px; color: #6b7280;">QR Code</span>
              </div>
              
              <div class="footer">
                <p>Please carry a valid ID proof for verification</p>
                <p>Report 30 minutes before departure time</p>
                <p>For support, contact: support@busbooker.com | 1800-123-4567</p>
              </div>
            </div>
          </body>
        </html>
      `);
      ticketWindow.document.close();
      ticketWindow.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h2>
        <p className="text-green-700">Your bus ticket has been booked successfully.</p>
        <p className="text-sm text-green-600 mt-2">Booking ID: <strong>{booking.id}</strong></p>
      </div>

      {/* Ticket Preview */}
      <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">🚌 BusBooker</h3>
              <p className="text-blue-100">E-Ticket</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{booking.id}</p>
              <p className="text-blue-100">Booking ID</p>
            </div>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Journey Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Journey Details
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">From:</span>
                  <span className="font-medium">{booking.from}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium">{booking.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(booking.travelDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Departure:</span>
                  <span className="font-medium">{booking.bus.departureTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{booking.bus.duration}</span>
                </div>
              </div>
            </div>

            {/* Bus Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Bus Details
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bus:</span>
                  <span className="font-medium">{booking.bus.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{booking.bus.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-green-600">₹{booking.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Date:</span>
                  <span className="font-medium">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Passenger Details
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium">Seats:</span>
                {booking.seats.map(seat => (
                  <span key={seat} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                    {seat}
                  </span>
                ))}
              </div>
              {booking.passengers.map((passenger, index) => (
                <div key={index} className="border-t pt-3 first:border-t-0 first:pt-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{passenger.name}</span>
                      <span className="text-gray-600 ml-2">({passenger.gender}, {passenger.age} years)</span>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                      Seat {booking.seats[index]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="text-center mb-6">
            <div className="inline-block border-2 border-dashed border-gray-300 p-8 rounded-lg">
              <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">QR Code for Verification</p>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-yellow-800 mb-2">Important Information:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Please carry a valid ID proof for verification</li>
              <li>• Report at the boarding point 30 minutes before departure</li>
              <li>• Keep this ticket handy during the journey</li>
              <li>• For any queries, contact support at 1800-123-4567</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Ticket
            </button>
            <button
              onClick={onNewBooking}
              className="flex items-center justify-center bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Book Another Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDownload;