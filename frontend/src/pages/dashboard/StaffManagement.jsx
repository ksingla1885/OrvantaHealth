import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Search, Filter, MoreVertical, Eye, Edit, Trash2, UserCheck, UserX, Mail, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';
import ConfirmModal from '../../components/ConfirmModal';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('receptionist');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'archive'

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await api.get('/admin/staff');
      if (response.data.success) {
        setStaff(response.data.data.staff);
      }
    } catch (error) {
      toast.error('Failed to fetch staff data');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const response = await api.patch(`/admin/user/${userId}/status`, {
        isActive: !currentStatus
      });

      if (response.data.success) {
        toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
        fetchStaff();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user status');
    }
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.profile.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const isReceptionist = member.role === 'receptionist';
    const matchesTab = activeTab === 'active' ? member.isActive : !member.isActive;
    return matchesSearch && isReceptionist && matchesTab;
  });

  const deleteStaff = async (id) => {
    try {
      const response = await api.delete(`/admin/staff/${id}`);
      if (response.data.success) {
        toast.success('Staff credentials removed. Record archived.');
        fetchStaff();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove staff member');
    }
  };

  const handleDeleteClick = (id) => {
    setStaffToDelete(id);
    setShowConfirmModal(true);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'receptionist': return 'bg-green-100 text-green-800';
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
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-dark mb-4 border border-brand-dark/5">
            <Users className="h-3.5 w-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">HR & Operations</span>
          </div>
          <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight font-display mb-2">Reception Management</h1>
          <p className="text-slate-500 font-medium text-lg">Manage active and past receptionists</p>
        </div>
        <button
          onClick={() => window.location.href = '/dashboard/create-staff'}
          className="btn btn-primary flex items-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <UserPlus className="h-5 w-5 mr-3" />
          Add Staff Member
        </button>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'active' ? 'bg-white text-brand-dark shadow-sm' : 'text-slate-400 hover:text-brand-dark'}`}
          >
            Active Staff
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'archive' ? 'bg-white text-brand-dark shadow-sm' : 'text-slate-400 hover:text-brand-dark'}`}
          >
            Past Staff (Archive)
          </button>
        </div>

        <div className="card-dark group">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-hover:text-brand-teal transition-colors" />
              <input
                type="text"
                placeholder="Search staff by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input bg-white/10 border-white/10 text-white placeholder:text-white/40 pl-12 focus:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStaff.length === 0 ? (
          <div className="col-span-full py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center gap-4">
            <Users className="h-16 w-16 text-slate-200" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
              {searchTerm ? 'No staff matched your search' : `No ${activeTab} staff members found`}
            </p>
          </div>
        ) : (
          filteredStaff.map((member) => (
            <div key={member._id} className="card group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light rounded-full -mr-16 -mt-16 group-hover:bg-brand-teal/10 transition-colors"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-brand-dark flex items-center justify-center text-white text-xl font-black shadow-lg shadow-brand-dark/20 transform group-hover:rotate-6 transition-transform">
                    {member.profile.firstName[0]}{member.profile.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-black font-display text-brand-dark leading-tight truncate">
                        {member.profile.firstName} {member.profile.lastName}
                      </h3>
                        {member.isOffboarded ? (
                          <div className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-500 text-[8px] font-black uppercase tracking-widest border border-rose-100 flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-rose-500"></div>
                            Left Institution
                          </div>
                        ) : !member.isActive ? (
                          <div className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-500 text-[8px] font-black uppercase tracking-widest border border-amber-100 flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                            Deactivated
                          </div>
                        ) : null}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal mt-1">{member.role} Unit</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                    <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-brand-light transition-colors">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                    <span className="truncate">{member.email?.toLowerCase()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                    <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-brand-light transition-colors">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                    <span>{member.profile.phone || 'Contact not set'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Session</span>
                    <span className="text-sm font-black text-brand-dark">
                      {member.lastLogin ? new Date(member.lastLogin).toLocaleDateString() : 'New Joining'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleUserStatus(member._id, member.isActive)}
                      className={`p-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all bg-white border border-slate-100 ${member.isActive ? 'text-rose-400 hover:text-rose-600' : 'text-emerald-400 hover:text-emerald-600'}`}
                      title={member.isActive ? 'Deactivate User' : 'Activate User'}
                    >
                      {member.isActive ? <UserX className="h-5 w-5" /> : <UserCheck className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(member._id)}
                      className="p-3 bg-white rounded-xl text-rose-500 border border-slate-100 shadow-lg hover:bg-rose-50 transition-all"
                      title="Remove Credentials Permanently"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(member);
                        setShowUserModal(true);
                      }}
                      className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-brand-dark hover:bg-brand-light transition-all"
                      title="View Profile"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => window.location.href = `/dashboard/create-staff?edit=${member._id}`}
                      className="p-3 bg-brand-dark rounded-xl text-white shadow-lg hover:shadow-brand-dark/30 hover:scale-105 active:scale-95 transition-all"
                      title="Edit Staff"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* User Details Modal - Stylized */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md animate-fade-in" onClick={() => setShowUserModal(false)}></div>
          <div className="bg-white rounded-[2.5rem] shadow-premium w-full max-w-lg relative animate-slide-up overflow-hidden border border-slate-100">
            <div className="h-32 bg-brand-dark relative">
              <div className="absolute -bottom-10 left-10 h-24 w-24 rounded-[2rem] bg-brand-teal shadow-2xl flex items-center justify-center text-white text-3xl font-black">
                {selectedUser.profile.firstName[0]}
              </div>
            </div>
            <div className="px-10 pt-16 pb-10">
              <div className="mb-8">
                <h2 className="text-3xl font-black font-display text-brand-dark leading-none mb-2">
                  {selectedUser.profile.firstName} {selectedUser.profile.lastName}
                </h2>
                <p className="text-slate-400 font-bold tracking-widest text-xs">{selectedUser.role} • {selectedUser.email?.toLowerCase()}</p>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone</p>
                  <p className="font-bold text-brand-dark">{selectedUser.profile.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${selectedUser.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    <p className="font-bold text-brand-dark uppercase text-xs">{selectedUser.isActive ? 'Authorized' : 'Restricted'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Member Since</p>
                  <p className="font-bold text-brand-dark">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <button
                onClick={() => setShowUserModal(false)}
                className="btn btn-primary w-full shadow-xl"
              >
                Close Archive
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Confirm Deletion Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => deleteStaff(staffToDelete)}
        title="Remove Staff Credentials?"
        message="Are you sure you want to remove this staff member? Their credentials will be disabled, but their records will be preserved in the archive for legal and verification purposes."
        confirmText="Remove Credentials"
        type="danger"
      />
    </div>
  );
};

export default StaffManagement;
