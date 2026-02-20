import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Shield, Activity, Save, Edit2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Editable fields
  const [formData, setFormData] = useState({
    bloodGroup: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: '',
    },
    insuranceInfo: {
      provider: '',
      policyNumber: '',
      expiryDate: '',
    },
    allergies: [],
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/patient/profile');
      if (response.data.success) {
        const patient = response.data.data.patient;
        setProfileData(patient);
        setFormData({
          bloodGroup: patient.bloodGroup || '',
          emergencyContact: patient.emergencyContact || { name: '', phone: '', relationship: '' },
          insuranceInfo: patient.insuranceInfo || { provider: '', policyNumber: '', expiryDate: '' },
          allergies: patient.allergies || [],
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const response = await api.patch('/patient/profile', formData);
      if (response.data.success) {
        setProfileData(response.data.data.patient);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
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
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="relative h-32 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
        <div className="absolute -bottom-12 left-8 flex items-end space-x-6">
          <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-xl">
            <div className="h-full w-full rounded-xl bg-primary-100 flex items-center justify-center">
              <User className="h-12 w-12 text-primary-600" />
            </div>
          </div>
          <div className="pb-14 text-white">
            <h1 className="text-2xl font-bold">{user.profile?.name}</h1>
            <p className="opacity-90 flex items-center">
              <Shield className="h-3 w-3 mr-1" /> MediCore Member
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12">
        {/* Left Column: Basic Info */}
        <div className="space-y-6 lg:col-span-1">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <User className="h-5 w-5 mr-2 text-primary-600" /> Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                <div className="flex items-center mt-1 text-gray-700">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                <div className="flex items-center mt-1 text-gray-700">
                  <Phone className="h-4 w-4 mr-2" />
                  {user.profile?.phone || 'Not provided'}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Address</label>
                <div className="flex items-start mt-1 text-gray-700">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                  {user.profile?.address || 'No address set'}
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-primary-900 text-white">
            <h3 className="font-bold flex items-center">
              <Activity className="h-5 w-5 mr-2" /> Health Status
            </h3>
            <div className="mt-4 p-4 bg-white/10 rounded-xl">
              <p className="text-xs opacity-75">BLOOD GROUP</p>
              <p className="text-3xl font-black">{formData.bloodGroup || '--'}</p>
            </div>
            <p className="mt-4 text-xs opacity-60">
              Keep your medical details updated for better care in emergencies.
            </p>
          </div>
        </div>

        {/* Right Column: Editable Medical Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900">Medical Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 px-3 py-1.5 rounded-lg transition-all"
                >
                  <Edit2 className="h-4 w-4 mr-1.5" /> Edit Profile
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center btn-primary px-4 py-1.5 text-sm"
                  >
                    {saving ? 'Saving...' : <><Save className="h-4 w-4 mr-1.5" /> Save Changes</>}
                  </button>
                </div>
              )}
            </div>

            <form className="space-y-8">
              {/* Emergency Contact */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 ml-1">Contact Name</label>
                    <input
                      disabled={!isEditing}
                      type="text"
                      value={formData.emergencyContact.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, name: e.target.value }
                      })}
                      className="w-full p-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 ml-1">Phone Number</label>
                    <input
                      disabled={!isEditing}
                      type="text"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
                      })}
                      className="w-full p-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 outline-none"
                    />
                  </div>
                </div>
              </section>

              {/* Insurance Info */}
              <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Insurance Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 ml-1">Provider</label>
                    <input
                      disabled={!isEditing}
                      type="text"
                      value={formData.insuranceInfo.provider}
                      onChange={(e) => setFormData({
                        ...formData,
                        insuranceInfo: { ...formData.insuranceInfo, provider: e.target.value }
                      })}
                      className="w-full p-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 ml-1">Policy Number</label>
                    <input
                      disabled={!isEditing}
                      type="text"
                      value={formData.insuranceInfo.policyNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        insuranceInfo: { ...formData.insuranceInfo, policyNumber: e.target.value }
                      })}
                      className="w-full p-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 ml-1">Expiray Date</label>
                    <input
                      disabled={!isEditing}
                      type="date"
                      value={formData.insuranceInfo.expiryDate?.split('T')[0]}
                      onChange={(e) => setFormData({
                        ...formData,
                        insuranceInfo: { ...formData.insuranceInfo, expiryDate: e.target.value }
                      })}
                      className="w-full p-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 outline-none"
                    />
                  </div>
                </div>
              </section>

              {/* Blood Group & Allergies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Blood Group</h3>
                  <select
                    disabled={!isEditing}
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50 outline-none"
                  >
                    <option value="">Select Blood Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.allergies.map((allergy, idx) => (
                      <span key={idx} className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium border border-red-100 flex items-center">
                        {allergy}
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, allergies: formData.allergies.filter((_, i) => i !== idx) })}
                            className="ml-2 hover:text-red-800"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <input
                        type="text"
                        placeholder="+ Add allergy"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (e.target.value) {
                              setFormData({ ...formData, allergies: [...formData.allergies, e.target.value] });
                              e.target.value = '';
                            }
                          }
                        }}
                        className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full border border-primary-100 outline-none focus:ring-1 focus:ring-primary-300 w-24"
                      />
                    )}
                    {!isEditing && formData.allergies.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No allergies reported.</p>
                    )}
                  </div>
                </section>
              </div>
            </form>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">
              <span className="font-bold">Important:</span> Profile changes may take a few moments to reflect across all hospital records.
              Contact the front desk if you need to update your legal name or date of birth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
