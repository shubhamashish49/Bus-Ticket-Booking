import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Building, Wallet, Shield, Check } from 'lucide-react';

interface PaymentGatewayProps {
  amount: number;
  onPaymentSuccess: () => void;
  onBack: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ amount, onPaymentSuccess, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Visa, Mastercard, Rupay'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: <Smartphone className="h-6 w-6" />,
      description: 'GPay, PhonePe, Paytm, BHIM'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <Building className="h-6 w-6" />,
      description: 'All major banks supported'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: <Wallet className="h-6 w-6" />,
      description: 'Paytm, Mobikwik, Amazon Pay'
    }
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setShowPaymentForm(true);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    onPaymentSuccess();
  };

  if (showPaymentForm) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowPaymentForm(false)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Complete Payment</h2>
              <p className="text-gray-600">Amount: ₹{amount}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="max-w-md mx-auto">
            {selectedMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {selectedMethod === 'upi' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    placeholder="user@paytm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Enter your UPI ID or scan QR code from your UPI app
                  </p>
                </div>
              </div>
            )}

            {selectedMethod === 'netbanking' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Bank
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                  </select>
                </div>
              </div>
            )}

            {selectedMethod === 'wallet' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {['Paytm', 'Mobikwik', 'Amazon Pay', 'Freecharge'].map(wallet => (
                    <button
                      key={wallet}
                      className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <div className="text-center">
                        <div className="font-medium">{wallet}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-xl font-bold text-gray-900">₹{amount}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-1" />
                  Secured by SSL encryption
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Pay ₹{amount}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <h2 className="text-xl font-semibold text-gray-900">Choose Payment Method</h2>
            <p className="text-gray-600">Amount to pay: ₹{amount}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.id)}
                className="p-6 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-blue-600">{method.icon}</div>
                  <div>
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Payment Security</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• All transactions are secured with 256-bit SSL encryption</li>
              <li>• Your payment information is never stored on our servers</li>
              <li>• Refunds are processed within 5-7 business days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;