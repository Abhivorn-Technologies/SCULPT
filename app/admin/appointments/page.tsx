"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Phone,
  Mail,
  Trash2,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

interface IAppointment {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
  status: "New" | "Contacted" | "Scheduled" | "Completed" | "Cancelled";
  notes?: string;
  createdAt: string;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Custom Delete Modal State (No browser alert)
  const [deleteTarget, setDeleteTarget] = useState<IAppointment | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/appointments");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments || []);
      }
    } catch (e) {
      console.error("Error fetching appointments:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status: newStatus as any } : item
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/appointments?id=${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setAppointments((prev) => prev.filter((item) => item._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Failed to delete appointment:", err);
    } finally {
      setDeleting(false);
    }
  };

  // Filtering
  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#151515] tracking-tight font-serif">
            Lead Inquiries & Appointments
          </h1>
          <p className="text-[#555555] text-sm mt-0.5">
            Manage incoming client inquiries, update statuses, and follow up.
          </p>
        </div>

        <button
          onClick={fetchAppointments}
          disabled={loading}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#EFE8E0] text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] text-xs font-semibold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#E6663A]" : ""}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
          <input
            type="text"
            placeholder="Search by name, phone, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A] transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#777777] shrink-0" />
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {["All", "New", "Contacted", "Scheduled", "Completed", "Cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    statusFilter === status
                      ? "bg-[#E6663A] text-white shadow-md shadow-[#E6663A]/20"
                      : "bg-[#F8F6F2] text-[#555555] hover:text-[#151515] border border-[#EFE8E0]"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl bg-white border border-[#EFE8E0] shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-[#555555] space-y-3">
            <div className="inline-block w-8 h-8 border-3 border-[#E6663A] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs">Fetching leads from MongoDB...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-[#888888] mx-auto" />
            <p className="text-[#151515] font-semibold text-sm">
              No appointments found matching filter
            </p>
            <p className="text-[#666666] text-xs">
              Try adjusting your search query or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#151515]">
              <thead className="bg-[#F8F6F2] uppercase tracking-wider text-[#555555] border-b border-[#EFE8E0]">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Client Info</th>
                  <th className="px-5 py-3.5 font-semibold">Service Requested</th>
                  <th className="px-5 py-3.5 font-semibold">Message</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold">Submitted</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8E0]">
                {filteredAppointments.map((item) => (
                  <tr key={item._id} className="hover:bg-[#F8F6F2]/60 transition-colors">
                    {/* Client Info */}
                    <td className="px-5 py-4">
                      <div className="font-bold text-[#151515] text-sm">
                        {item.fullName}
                      </div>
                      <div className="flex items-center gap-3 text-[#555555] mt-1">
                        <span className="flex items-center gap-1 font-medium">
                          <Phone className="w-3 h-3 text-[#E6663A]" />
                          {item.phone}
                        </span>
                        {item.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-[#777777]" />
                            {item.email}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-[#F8F6F2] border border-[#EFE8E0] text-[#151515] font-bold">
                        {item.service}
                      </span>
                    </td>

                    {/* Message */}
                    <td className="px-5 py-4 max-w-xs">
                      <p className="line-clamp-2 text-[#555555] italic">
                        {item.message || "No notes provided"}
                      </p>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-5 py-4">
                      <select
                        value={item.status}
                        disabled={updatingId === item._id}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs border focus:outline-none transition-all cursor-pointer ${
                          item.status === "New"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : item.status === "Contacted"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : item.status === "Scheduled"
                            ? "bg-sky-50 text-sky-800 border-sky-200"
                            : item.status === "Completed"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <option value="New" className="bg-white text-rose-700">
                          New
                        </option>
                        <option value="Contacted" className="bg-white text-amber-800">
                          Contacted
                        </option>
                        <option value="Scheduled" className="bg-white text-sky-800">
                          Scheduled
                        </option>
                        <option value="Completed" className="bg-white text-emerald-800">
                          Completed
                        </option>
                        <option value="Cancelled" className="bg-white text-slate-700">
                          Cancelled
                        </option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-[#777777] whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="p-2 rounded-lg text-[#777777] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Custom Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EFE8E0] rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 rounded-full bg-rose-50 border border-rose-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#151515] font-serif">Confirm Delete Lead</h3>
            </div>

            <p className="text-xs text-[#555555] leading-relaxed">
              Are you sure you want to delete the lead inquiry for <strong className="text-[#151515]">"{deleteTarget.fullName}"</strong> ({deleteTarget.service})?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#555555] hover:bg-[#F8F6F2]"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 disabled:opacity-50 cursor-pointer"
              >
                {deleting ? "Deleting..." : "Delete Lead"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
