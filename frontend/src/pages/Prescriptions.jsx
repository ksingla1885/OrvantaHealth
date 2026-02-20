import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FileText, Download, User, Calendar, Pill, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await api.get('/patient/prescriptions');
      if (response.data.success) {
        setPrescriptions(response.data.data.prescriptions);
      }
    } catch (error) {
      console.error('Failed to fetch prescriptions:', error);
      toast.error('Failed to load prescriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await api.get(`/patient/download/prescription/${id}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `prescription_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download prescription');
    }
  };

  const filteredPrescriptions = prescriptions.filter(p =>
    p.doctorId?.userId?.profile?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Prescriptions</h1>
          <p className="text-gray-600">Access and download your medical prescriptions</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by doctor or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none w-full sm:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredPrescriptions.length > 0 ? (
          filteredPrescriptions.map((prescription) => (
            <div key={prescription._id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="bg-purple-100 p-3 rounded-full shrink-0">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="space-y-3 w-full">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Prescription for {prescription.diagnosis || 'General Checkup'}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500 space-x-4">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          Dr. {prescription.doctorId?.userId?.profile?.name || 'Unknown'}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(prescription.createdAt), 'PPP')}
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                        <Pill className="h-3 w-3 mr-1" /> Medications
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {prescription.medications?.map((med, idx) => (
                          <div key={idx} className="flex flex-col border-l-2 border-purple-200 pl-2">
                            <span className="text-sm font-medium text-gray-900">{med.name}</span>
                            <span className="text-xs text-gray-500">{med.dosage} - {med.frequency}</span>
                          </div>
                        ))}
                        {(!prescription.medications || prescription.medications.length === 0) && (
                          <p className="text-xs text-gray-500 italic">No medications listed.</p>
                        )}
                      </div>
                    </div>

                    {prescription.instructions && (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Notes:</span> {prescription.instructions}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 self-end md:self-start">
                  <button
                    onClick={() => handleDownload(prescription._id)}
                    className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <Download className="h-4 w-4 mr-2" /> Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card p-12 text-center border-dashed">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No prescriptions found</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              {searchTerm ? "Try searching with different keywords." : "You don't have any prescriptions yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;
