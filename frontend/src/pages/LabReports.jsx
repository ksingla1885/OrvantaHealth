import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TestTube, Download, Calendar, Activity, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

const LabReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get('/patient/lab-reports');
      if (response.data.success) {
        setReports(response.data.data.labReports);
      }
    } catch (error) {
      console.error('Failed to fetch lab reports:', error);
      toast.error('Failed to load lab reports');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await api.get(`/patient/download/lab-report/${id}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `lab_report_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download report');
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
        <h1 className="text-2xl font-bold text-gray-900">Lab Reports</h1>
        <p className="text-gray-600">View and track your laboratory test results</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.length > 0 ? (
          reports.map((report) => (
            <div key={report._id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-xl shrink-0">
                  <TestTube className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {report.testName}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center ${report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {report.status === 'completed' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>

                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date: {format(new Date(report.reportDate), 'PPP')}
                    </div>
                    {report.doctorName && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Activity className="h-4 w-4 mr-2" />
                        Ref. by: {report.doctorName}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      ID: {report._id.slice(-8).toUpperCase()}
                    </p>
                    <button
                      onClick={() => handleDownload(report._id)}
                      className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-1" /> Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full card p-12 text-center border-dashed">
            <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No lab reports found</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              Your test results will appear here once they are available from the laboratory.
            </p>
          </div>
        )}
      </div>

      {/* Note Card */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-1 flex items-center">
          <Activity className="h-4 w-4 mr-2" /> Medical Note
        </h4>
        <p className="text-sm text-blue-800 opacity-80">
          Always consult with your physician to discuss the interpretation of your laboratory results.
          Normal ranges can vary between different clinical labs.
        </p>
      </div>
    </div>
  );
};

export default LabReports;
