import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { DollarSign, FileText, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await api.get('/patient/bills');
      if (response.data.success) {
        setBills(response.data.data.bills);
      }
    } catch (error) {
      console.error('Failed to fetch bills:', error);
      toast.error('Failed to load bills');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (billId) => {
    try {
      const response = await api.get(`/patient/download/bill/${billId}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bill_${billId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download bill');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'unpaid': return 'bg-red-100 text-red-800';
      case 'partially_paid': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bills & Payments</h1>
        <p className="text-gray-600">View and manage your medical invoices</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {bills.length > 0 ? (
          bills.map((bill) => (
            <div key={bill._id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Invoice #{bill.billNumber || bill._id.slice(-6).toUpperCase()}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                        {bill.status.charAt(0).toUpperCase() + bill.status.slice(1).replace('_', ' ')}
                      </span>
                    </div>

                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-600">
                      <div className="flex items-center font-medium text-gray-900">
                        Total: ₹{bill.totalAmount}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Date: {format(new Date(bill.createdAt), 'PPP')}
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Items: {bill.items?.length || 0}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end md:self-center">
                  {bill.status !== 'paid' && (
                    <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
                      Pay Now
                    </button>
                  )}
                  <button
                    onClick={() => handleDownload(bill._id)}
                    className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                    title="Download PDF"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card p-12 text-center border-dashed">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No bills found</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              You don't have any medical bills at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Payment Information Card */}
      <div className="card bg-primary-50 border-primary-100 p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-primary-600" />
          <div>
            <h4 className="text-sm font-semibold text-primary-900">Payment Information</h4>
            <p className="text-sm text-primary-800 mt-1">
              All transactions are secure and encrypted. If you have any questions regarding your bill,
              please contact the hospital billing department at <span className="font-semibold">+1 (555) 000-1111</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;
