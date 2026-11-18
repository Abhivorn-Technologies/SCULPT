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
  MessageSquare,
  MessageCircle,
} from "lucide-react";
import AdminPagination from "@/components/admin/AdminPagination";

interface IContactEnquiry {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
  status: "New" | "Contacted" | "Scheduled" | "Completed" | "Cancelled";
  notes?: string;
  originalFee?: number;
  discountPercent?: number;
  amountPaid?: number;
  paymentStatus?: "Pending" | "Paid" | "Failed";
  razorpayPaymentId?: string;
  createdAt: string;
}

export default function AdminContactEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<IContactEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Custom Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<IContactEnquiry | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Expanded Message Modal State
  const [activeMessage, setActiveMessage] = useState<IContactEnquiry | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contact-enquiries");
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries || []);
      }
    } catch (e) {
      console.error("Error fetching contact enquiries:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/contact-enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
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
      const res = await fetch(`/api/admin/contact-enquiries?id=${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((item) => item._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
    } finally {
      setDeleting(false);
    }
  };

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Filter inquiries
  const filteredEnquiries = enquiries.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.fullName.toLowerCase().includes(term) ||
      item.phone.includes(term) ||
      item.service.toLowerCase().includes(term) ||
      (item.email && item.email.toLowerCase().includes(term)) ||
      (item.message && item.message.toLowerCase().includes(term));

    const matchesStatus = statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const paginatedEnquiries = filteredEnquiries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E6663A] text-xs font-bold uppercase tracking-widest mb-1">
            <MessageSquare className="w-4 h-4" /> Dedicated Contact Desk
          </div>
          <h1 className="text-2xl font-bold text-[#151515] tracking-tight font-serif">
            Contact Page Enquiries
          </h1>
          <p className="text-[#555555] text-sm mt-0.5">
            Manage incoming messages, patient queries, and consultation leads submitted via the Contact page.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          disabled={loading}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#EFE8E0] text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] text-xs font-semibold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#E6663A]" : ""}`} />
          <span>Refresh Enquiries</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
          <input
            type="text"
            placeholder="Search enquiries, name, phone, message..."
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
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

      {/* Enquiries Table */}
      <div className="rounded-2xl bg-white border border-[#EFE8E0] shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-[#555555] space-y-3">
            <div className="inline-block w-8 h-8 border-3 border-[#E6663A] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs">Fetching contact enquiries from database...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-[#888888] mx-auto" />
            <p className="text-[#151515] font-semibold text-sm">
              No contact enquiries found
            </p>
            <p className="text-[#666666] text-xs">
              Inquiries submitted through the Contact page will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#151515]">
              <thead className="bg-[#F8F6F2] uppercase tracking-wider text-[#555555] border-b border-[#EFE8E0]">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Sender Details</th>
                  <th className="px-5 py-3.5 font-semibold">Service</th>
                  <th className="px-5 py-3.5 font-semibold">Message / Query</th>
                  <th className="px-5 py-3.5 font-semibold">Payment Status</th>
                  <th className="px-5 py-3.5 font-semibold">Lead Status</th>
                  <th className="px-5 py-3.5 font-semibold">Received</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8E0]">
                {paginatedEnquiries.map((item) => (
                  <tr key={item._id} className="hover:bg-[#F8F6F2]/60 transition-colors">
                    {/* Sender Details */}
                    <td className="px-5 py-4">
                      <div className="font-bold text-[#151515] text-sm">
                        {item.fullName}
                      </div>
                      <div className="flex flex-col gap-1 text-[#555555] mt-1">
                        <a
                          href={`tel:${item.phone}`}
                          className="flex items-center gap-1 font-medium hover:text-[#E6663A] transition-colors"
                        >
                          <Phone className="w-3 h-3 text-[#E6663A]" />
                          {item.phone}
                        </a>
                        {item.email && (
                          <a
                            href={`mailto:${item.email}`}
                            className="flex items-center gap-1 hover:text-[#E6663A] transition-colors"
                          >
                            <Mail className="w-3 h-3 text-[#777777]" />
                            {item.email}
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-lg bg-[#F8F6F2] border border-[#EFE8E0] text-[#151515] font-bold">
                        {item.service}
                      </span>
                    </td>

                    {/* Message Preview */}
                    <td className="px-5 py-4 max-w-xs">
                      {item.message ? (
                        <div>
                          <p className="line-clamp-2 text-[#555555] leading-relaxed">
                            {item.message}
                          </p>
                          {item.message.length > 70 && (
                            <button
                              onClick={() => setActiveMessage(item)}
                              className="text-[11px] text-[#E6663A] font-semibold hover:underline mt-0.5 cursor-pointer"
                            >
                              View full message &rarr;
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-[#888888] italic text-[11px]">No message provided</span>
                      )}
                    </td>

                    {/* Payment Status */}
                    <td className="px-5 py-4">
                      {item.paymentStatus === "Paid" ? (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            PAID ₹{item.amountPaid}
                          </span>
                          {item.razorpayPaymentId && (
                            <div className="text-[10px] font-mono text-[#888888] truncate max-w-[130px]" title={item.razorpayPaymentId}>
                              ID: {item.razorpayPaymentId}
                            </div>
                          )}
                        </div>
                      ) : item.paymentStatus === "Failed" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          FAILED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                          PENDING {item.amountPaid ? `(₹${item.amountPaid})` : ""}
                        </span>
                      )}
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
                        <option value="New" className="bg-white text-rose-700">New</option>
                        <option value="Contacted" className="bg-white text-amber-800">Contacted</option>
                        <option value="Scheduled" className="bg-white text-sky-800">Scheduled</option>
                        <option value="Completed" className="bg-white text-emerald-800">Completed</option>
                        <option value="Cancelled" className="bg-white text-slate-700">Cancelled</option>
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
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/${item.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                            `Hello ${item.fullName}, thank you for contacting The Sculpt Aesthetics regarding ${item.service}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Open WhatsApp chat"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="p-2 rounded-lg text-[#777777] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && filteredEnquiries.length > 0 && (
        <AdminPagination
          currentPage={currentPage}
          totalItems={filteredEnquiries.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[10, 25, 50]}
          itemName="contact enquiries"
        />
      )}

      {/* Full Message View Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EFE8E0] rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE8E0] pb-3">
              <div>
                <h3 className="font-bold text-base text-[#151515] font-serif">
                  {activeMessage.fullName}
                </h3>
                <p className="text-xs text-[#666666]">{activeMessage.service}</p>
              </div>
              <span className="text-xs text-[#888888]">
                {new Date(activeMessage.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#888888]">
                Message Content:
              </label>
              <div className="p-4 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] text-xs text-[#151515] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {activeMessage.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3 text-xs">
                <a
                  href={`tel:${activeMessage.phone}`}
                  className="text-[#E6663A] hover:underline font-semibold"
                >
                  Call: {activeMessage.phone}
                </a>
              </div>
              <button
                onClick={() => setActiveMessage(null)}
                className="px-5 py-2 rounded-xl bg-[#151515] text-white text-xs font-bold hover:bg-black cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EFE8E0] rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 rounded-full bg-rose-50 border border-rose-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#151515] font-serif">Confirm Delete Enquiry</h3>
            </div>

            <p className="text-xs text-[#555555] leading-relaxed">
              Are you sure you want to delete this enquiry from <strong className="text-[#151515]">"{deleteTarget.fullName}"</strong>?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#555555] hover:bg-[#F8F6F2] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 disabled:opacity-50 cursor-pointer"
              >
                {deleting ? "Deleting..." : "Delete Enquiry"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
