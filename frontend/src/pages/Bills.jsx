import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { DollarSign, FileText, Download, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Bills = () => {
  const { user: currentUser } = useAuth();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const endpoint = currentUser.role === 'patient' ? '/patient/bills' : '/receptionist/bills';
      const response = await api.get(endpoint);
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
      const response = await api.get(`/documents/download/bill/${billId}`, {
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

  const handleMarkAsPaid = async (billId) => {
    try {
      const response = await api.patch(`/receptionist/bill/${billId}/mark-paid`);
      if (response.data.success) {
        toast.success('Bill marked as paid');
        fetchBills();
      }
    } catch (error) {
      console.error('Error marking as paid:', error);
      toast.error('Failed to update bill status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border border-green-200';
      case 'unpaid': return 'bg-rose-100 text-rose-800 border border-rose-200';
      case 'overdue': return 'bg-red-100 text-red-800 border border-red-200';
      case 'partially_paid': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'draft': return 'bg-slate-100 text-slate-800 border border-slate-200';
      case 'sent': return 'bg-blue-100 text-blue-800 border border-blue-200';
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Bills & Payments</h1>
          <p className="text-gray-600 font-medium tracking-tight">View and manage medical invoices</p>
        </div>
        {currentUser?.role === 'receptionist' && (
          <Link
            to="/dashboard/patients"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-brand-teal/20 hover:bg-brand-teal/90 transition-all font-display"
          >
            <Plus className="h-4 w-4" />
            Create New Bill
          </Link>
        )}
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
                        Total: ₹{bill.total}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Date: {format(new Date(bill.createdAt), 'PPP')}
                      </div>
                      <div className="flex items-center font-bold text-brand-teal">
                        <FileText className="h-4 w-4 mr-2" />
                        Status: {bill.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end md:self-center">
                  {bill.status !== 'paid' && currentUser?.role === 'patient' && (
                    <button className="px-6 py-2 bg-brand-teal text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-brand-teal/90 transition-all shadow-lg shadow-brand-teal/20">
                      Pay Now
                    </button>
                  )}

                  {bill.status !== 'paid' && currentUser?.role === 'receptionist' && (
                    <button
                      onClick={() => handleMarkAsPaid(bill._id)}
                      className="px-6 py-2 bg-brand-dark text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all shadow-lg"
                    >
                      Mark as Paid
                    </button>
                  )}

                  <button
                    onClick={() => handleDownload(bill._id)}
                    className="p-3 text-slate-400 hover:text-brand-teal hover:bg-brand-teal/5 rounded-xl transition-all"
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
