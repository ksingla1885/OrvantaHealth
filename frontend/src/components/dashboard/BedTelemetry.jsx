import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BedDouble, Activity, Plus, Edit3, Save, X, Trash2, RefreshCw, Shield, Building2, ChevronRight, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../services/api';

import ConfirmModal from '../ConfirmModal';

const BedTelemetry = ({ standalone = false }) => {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDept, setEditingDept] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'danger',
    onConfirm: () => {}
  });

  const [newDeptData, setNewDeptData] = useState({
    department: '',
    totalBeds: 20,
    occupiedBeds: 5,
    icuBeds: 6,
    occupiedIcuBeds: 2
  });

  const DEPARTMENT_PRESETS = [
    'Cardiology', 'Emergency & Trauma', 'General Surgery',
    'Neurology', 'Pediatrics', 'Orthopedics', 'ICU Tier 1', 'Oncology'
  ];

  useEffect(() => {
    fetchBeds();
  }, []);

  const fetchBeds = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/beds');
      if (response.data.success) {
        setBeds(response.data.data.beds || []);
      }
    } catch (error) {
      console.error('Failed to fetch beds:', error);
      toast.error('Failed to load bed telemetry');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (dept) => {
    setEditingDept(dept);
    setFormData({
      totalBeds: dept.totalBeds,
      occupiedBeds: dept.occupiedBeds,
      icuBeds: dept.icuBeds,
      occupiedIcuBeds: dept.occupiedIcuBeds
    });
  };

  const handleSave = async (id) => {
    try {
      const response = await api.patch(`/admin/beds/${id}`, formData);
      if (response.data.success) {
        toast.success('Bed capacity updated successfully');
        setEditingDept(null);
        fetchBeds();
      }
    } catch (error) {
      console.error('Failed to update bed:', error);
      toast.error('Failed to update bed capacity');
    }
  };

  const handleCreateBed = async (e) => {
    e.preventDefault();
    if (!newDeptData.department.trim()) {
      return toast.error('Please select or enter a department name');
    }
    try {
      const response = await api.post('/admin/beds', newDeptData);
      if (response.data.success) {
        toast.success(`Bed telemetry registered for ${newDeptData.department}`);
        setShowAddModal(false);
        setNewDeptData({ department: '', totalBeds: 20, occupiedBeds: 5, icuBeds: 6, occupiedIcuBeds: 2 });
        fetchBeds();
      }
    } catch (error) {
      console.error('Failed to create bed allocation:', error);
      toast.error(error.response?.data?.message || 'Failed to add department bed capacity');
    }
  };

  const executeDeleteBed = async (id, department) => {
    try {
      const response = await api.delete(`/admin/beds/${id}`);
      if (response.data.success) {
        toast.success(`Removed bed allocation for ${department}`);
        fetchBeds();
      }
    } catch (error) {
      console.error('Failed to delete bed:', error);
      toast.error('Failed to remove bed entry');
    }
  };

  const handleDeleteBedClick = (id, department) => {
    setConfirmState({
      isOpen: true,
      title: 'Remove Department Bed Allocation?',
      message: `Are you sure you want to delete the bed telemetry record for ${department}? This action cannot be undone.`,
      confirmText: 'Delete Allocation',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: () => executeDeleteBed(id, department)
    });
  };

  const calculateOccupancyRatio = (occupied, total) => {
    if (!total) return 0;
    return Math.round((occupied / total) * 100);
  };

  const getOccupancyColor = (percentage) => {
    if (percentage > 85) return 'bg-rose-500 text-rose-500';
    if (percentage > 70) return 'bg-amber-500 text-amber-500';
    return 'bg-emerald-500 text-emerald-500';
  };

  // Render Portal Modal to avoid nested stacking context issues
  const renderModal = () => {
    if (!showAddModal) return null;

    const modalJSX = (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
        <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-10 max-w-xl w-full border border-slate-100 dark:border-slate-800 shadow-2xl space-y-6 overflow-hidden my-auto">
          {/* Subtle Glow Accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-teal/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"></div>

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-teal text-white rounded-2xl shadow-md">
                <BedDouble className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xl font-black text-brand-dark dark:text-white font-display leading-tight">Add Department Beds</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Real-time Capacity Telemetry Configurator</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(false)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleCreateBed} className="space-y-6">
            {/* Quick Department Presets & Custom Input */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-brand-dark dark:text-slate-300 tracking-wider">
                1. Select or Enter Department Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Cardiology, Emergency & Trauma, Orthopedics..."
                value={newDeptData.department}
                onChange={(e) => setNewDeptData({ ...newDeptData, department: e.target.value })}
                className="w-full p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:border-brand-teal transition-all"
              />

              {/* Department Quick Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {DEPARTMENT_PRESETS.map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => setNewDeptData({ ...newDeptData, department: preset })}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all ${
                      newDeptData.department === preset
                        ? 'bg-brand-teal text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* General Ward Capacity */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-dark dark:text-teal-300">
                <Building2 className="h-4 w-4 text-brand-teal" />
                <span>General Ward Capacity</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Total Ward Beds</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newDeptData.totalBeds}
                    onChange={(e) => setNewDeptData({ ...newDeptData, totalBeds: Number(e.target.value) })}
                    className="w-full mt-1 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-black text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Currently Occupied</label>
                  <input
                    type="number"
                    min="0"
                    max={newDeptData.totalBeds}
                    required
                    value={newDeptData.occupiedBeds}
                    onChange={(e) => setNewDeptData({ ...newDeptData, occupiedBeds: Number(e.target.value) })}
                    className="w-full mt-1 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-black text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* ICU Capacity */}
            <div className="p-5 bg-teal-50/50 dark:bg-teal-950/20 rounded-2xl border border-teal-100 dark:border-teal-900/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-teal">
                <Activity className="h-4 w-4 text-brand-teal" />
                <span>Critical Care (ICU) Capacity</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-teal-800 dark:text-teal-300 uppercase">Total ICU Beds</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newDeptData.icuBeds}
                    onChange={(e) => setNewDeptData({ ...newDeptData, icuBeds: Number(e.target.value) })}
                    className="w-full mt-1 p-3 bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 rounded-xl text-sm font-black text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-teal-800 dark:text-teal-300 uppercase">Occupied ICU Beds</label>
                  <input
                    type="number"
                    min="0"
                    max={newDeptData.icuBeds}
                    required
                    value={newDeptData.occupiedIcuBeds}
                    onChange={(e) => setNewDeptData({ ...newDeptData, occupiedIcuBeds: Number(e.target.value) })}
                    className="w-full mt-1 p-3 bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 rounded-xl text-sm font-black text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-1/2 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-bold text-xs uppercase transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-4 bg-brand-teal hover:bg-brand-dark text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-900/20 transition-all hover:scale-105 active:scale-95"
              >
                <Check className="h-4 w-4" /> Save Allocation
              </button>
            </div>
          </form>
        </div>
      </div>
    );

    return ReactDOM.createPortal(modalJSX, document.body);
  };

  return (
    <div className={`bg-white rounded-[3rem] p-8 border border-slate-100 shadow-premium ${standalone ? 'space-y-8 animate-fade-in' : ''}`}>
      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        onClose={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmState.onConfirm}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        type={confirmState.type}
      />

      {/* Portal Modal */}
      {renderModal()}

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-teal text-white rounded-2xl shadow-md">
            <BedDouble className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-brand-dark font-display">Live Ward & ICU Bed Telemetry</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Real-time Departmental Occupancy</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-teal hover:bg-brand-dark text-white rounded-xl text-xs font-black uppercase transition-all shadow-md hover:scale-105"
          >
            <Plus className="h-4 w-4" /> Add Department Beds
          </button>
          <button
            onClick={fetchBeds}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
            title="Refresh Telemetry"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <div className="w-8 h-8 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin mx-auto"></div>
        </div>
      ) : beds.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
          <BedDouble className="h-10 w-10 text-slate-300 mx-auto" />
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-700">No Department Bed Allocations Configured</h4>
            <p className="text-xs text-slate-400">Click "Add Department Beds" above to set up real bed telemetry for your hospital wings.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-xl font-black text-xs uppercase shadow-md hover:bg-brand-dark transition-all hover:scale-105"
          >
            <Plus className="h-4 w-4" /> Add First Department Bed Capacity
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beds.map((b) => {
            const wardPercent = calculateOccupancyRatio(b.occupiedBeds, b.totalBeds);
            const icuPercent = calculateOccupancyRatio(b.occupiedIcuBeds, b.icuBeds);
            const isEditing = editingDept?._id === b._id;

            return (
              <div key={b._id} className="relative group bg-slate-50/70 hover:bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm transition-all hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-black text-brand-dark font-display">{b.department}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => isEditing ? setEditingDept(null) : handleEditClick(b)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-brand-teal transition-colors"
                      title="Edit capacity"
                    >
                      {isEditing ? <X className="h-3.5 w-3.5" /> : <Edit3 className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDeleteBedClick(b._id, b.department)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[9px] font-bold uppercase text-slate-400">Total Ward Beds</label>
                        <input
                          type="number"
                          min="0"
                          value={formData.totalBeds}
                          onChange={(e) => setFormData({ ...formData, totalBeds: Number(e.target.value) })}
                          className="w-full p-2 bg-white border rounded-xl font-bold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase text-slate-400">Occupied Ward</label>
                        <input
                          type="number"
                          min="0"
                          value={formData.occupiedBeds}
                          onChange={(e) => setFormData({ ...formData, occupiedBeds: Number(e.target.value) })}
                          className="w-full p-2 bg-white border rounded-xl font-bold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase text-slate-400">Total ICU Beds</label>
                        <input
                          type="number"
                          min="0"
                          value={formData.icuBeds}
                          onChange={(e) => setFormData({ ...formData, icuBeds: Number(e.target.value) })}
                          className="w-full p-2 bg-white border rounded-xl font-bold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase text-slate-400">Occupied ICU</label>
                        <input
                          type="number"
                          min="0"
                          value={formData.occupiedIcuBeds}
                          onChange={(e) => setFormData({ ...formData, occupiedIcuBeds: Number(e.target.value) })}
                          className="w-full p-2 bg-white border rounded-xl font-bold text-slate-800"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => handleSave(b._id)}
                      className="w-full py-2.5 bg-brand-teal text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors"
                    >
                      <Save className="h-3.5 w-3.5" /> Save Changes
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* General Ward Progress */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-500">General Ward Beds</span>
                        <span className="text-slate-800">{b.occupiedBeds} / {b.totalBeds} ({wardPercent}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${getOccupancyColor(wardPercent).split(' ')[0]}`}
                          style={{ width: `${Math.min(wardPercent, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* ICU Progress */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-500">Critical ICU Beds</span>
                        <span className="text-slate-800">{b.occupiedIcuBeds} / {b.icuBeds} ({icuPercent}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${getOccupancyColor(icuPercent).split(' ')[0]}`}
                          style={{ width: `${Math.min(icuPercent, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BedTelemetry;
