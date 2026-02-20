import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Calendar, Clock, User, MessageSquare, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format, addDays, startOfToday } from 'date-fns';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(format(startOfToday(), 'yyyy-MM-dd'));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [consultationType, setConsultationType] = useState('in-person');
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchAvailability();
    }
  }, [selectedDoctor, selectedDate]);

  const fetchDoctors = async () => {
    try {
      const response = await api.get('/patient/doctors');
      if (response.data.success) {
        setDoctors(response.data.data.doctors);
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailability = async () => {
    try {
      const response = await api.get(`/patient/doctor/${selectedDoctor._id}/availability`);
      if (response.data.success) {
        // Filter booked slots for the selected date
        const booked = response.data.data.bookedSlots.filter(
          slot => format(new Date(slot.date), 'yyyy-MM-dd') === selectedDate
        ).map(slot => slot.timeSlot.start);
        setBookedSlots(booked);
      }
    } catch (error) {
      console.error('Failed to fetch availability:', error);
    }
  };

  const handleBook = async () => {
    if (!selectedSlot) {
      toast.error('Please select a time slot');
      return;
    }

    try {
      const response = await api.post('/appointments/book', {
        doctorId: selectedDoctor._id,
        date: selectedDate,
        timeSlot: selectedSlot,
        symptoms,
        consultationType
      });

      if (response.data.success) {
        toast.success('Appointment booked successfully!');
        navigate('/patient/appointments');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
        <p className="text-gray-600">Follow the steps to schedule your visit</p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between px-4 py-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${step >= s ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-300 text-gray-500'
              }`}>
              {step > s ? <CheckCircle className="h-5 w-5" /> : s}
            </div>
            {s < 3 && <div className={`w-12 sm:w-24 h-0.5 mx-2 ${step > s ? 'bg-primary-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Doctor */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Select a Doctor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => { setSelectedDoctor(doctor); nextStep(); }}
                className={`card p-4 cursor-pointer hover:border-primary-500 border-2 transition-all ${selectedDoctor?._id === doctor._id ? 'border-primary-500 bg-primary-50' : 'border-transparent'
                  }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Dr. {doctor.userId.profile.firstName} {doctor.userId.profile.lastName}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded">
                        ★ {doctor.rating.average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Select Date & Time</h2>
            <button onClick={prevStep} className="text-sm text-primary-600 flex items-center hover:underline">
              <ChevronLeft className="h-4 w-4 mr-1" /> Change Doctor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calendar Placeholder / Date Selection */}
            <div className="card p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary-600" /> Choose Date
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(8)].map((_, i) => {
                  const date = addDays(startOfToday(), i);
                  const isSelected = format(date, 'yyyy-MM-dd') === selectedDate;
                  const dayName = format(date, 'EEE');
                  const dayNum = format(date, 'd');

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(format(date, 'yyyy-MM-dd'))}
                      className={`flex flex-col items-center p-3 rounded-lg border transition-all ${isSelected
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : 'bg-white border-gray-200 text-gray-900 hover:border-primary-400'
                        }`}
                    >
                      <span className="text-xs uppercase opacity-75">{dayName}</span>
                      <span className="text-lg font-bold">{dayNum}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="card p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary-600" /> Available Slots
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedDoctor?.availability.timeSlots.map((slot, i) => {
                  const isBooked = bookedSlots.includes(slot.start);
                  const isSelected = selectedSlot?.start === slot.start;

                  return (
                    <button
                      key={i}
                      disabled={isBooked}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 text-sm rounded-lg border transition-all ${isSelected
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : isBooked
                          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-gray-200 text-gray-900 hover:border-primary-400'
                        }`}
                    >
                      {slot.start} - {slot.end}
                    </button>
                  );
                })}
              </div>
              {selectedDoctor?.availability.timeSlots.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No slots available for this day.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={nextStep}
              disabled={!selectedSlot}
              className="btn-primary flex items-center px-8"
            >
              Continue <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Details & Confirmation */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Final Details</h2>
            <button onClick={prevStep} className="text-sm text-primary-600 flex items-center hover:underline">
              <ChevronLeft className="h-4 w-4 mr-1" /> Change Schedule
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="card p-4 bg-gray-50 border-dashed">
                <h3 className="font-medium mb-3 flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" /> Booking Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="text-gray-500">Doctor:</span>
                    <span className="font-medium">Dr. {selectedDoctor?.userId.profile.firstName} {selectedDoctor?.userId.profile.lastName}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium">{format(new Date(selectedDate), 'MMMM do, yyyy')}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-500">Time:</span>
                    <span className="font-medium">{selectedSlot?.start} - {selectedSlot?.end}</span>
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setConsultationType('in-person')}
                    className={`p-3 text-sm rounded-lg border text-center transition-all ${consultationType === 'in-person' ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white'
                      }`}
                  >
                    In-Person
                  </button>
                  <button
                    onClick={() => setConsultationType('video')}
                    className={`p-3 text-sm rounded-lg border text-center transition-all ${consultationType === 'video' ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white'
                      }`}
                  >
                    Video Call
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="h-4 w-4 inline mr-1" /> Symptoms / Reason (Optional)
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe how you're feeling or the reason for your visit..."
                  rows={6}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleBook}
                  className="w-full py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all active:scale-[0.98]"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
