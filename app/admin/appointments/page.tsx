"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Phone,
  Mail,
  Trash2,
  AlertCircle,
  AlertTriangle,
  FileText,
  Download,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  MessageCircle,
  Copy,
  Check,
  Calendar,
  Sparkles,
  Eye,
  X,
  UserCheck,
} from "lucide-react";
import AdminPagination from "@/components/admin/AdminPagination";

interface IAppointment {
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
  currency?: string;
  paymentStatus?: "Pending" | "Paid" | "Failed";
  source?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [paymentFilter, setPaymentFilter] = useState<string>("All");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modals
  const [deleteTarget, setDeleteTarget] = useState<IAppointment | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [viewTarget, setViewTarget] = useState<IAppointment | null>(null);

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
        setAppointments((prev) =>
          prev.filter((item) => item._id !== deleteTarget._id)
        );
        setDeleteTarget(null);
      }
    } catch (err) {
      console.error("Failed to delete booking:", err);
    } finally {
      setDeleting(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, paymentFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = appointments.length;
    const paid = appointments.filter((a) => a.paymentStatus === "Paid");
    const paidCount = paid.length;
    const totalRevenue = paid.reduce((sum, a) => sum + (Number(a.amountPaid) || 0), 0);
    const pendingPayment = appointments.filter((a) => a.paymentStatus !== "Paid" && a.paymentStatus !== "Failed").length;
    const newBookings = appointments.filter((a) => a.status === "New").length;
    return { total, paidCount, totalRevenue, pendingPayment, newBookings };
  }, [appointments]);

  // Filtering
  const filteredAppointments = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return appointments.filter((item) => {
      const matchesSearch =
        !q ||
        item.fullName.toLowerCase().includes(q) ||
        item.phone.includes(q) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        item.service.toLowerCase().includes(q) ||
        (item.razorpayPaymentId && item.razorpayPaymentId.toLowerCase().includes(q)) ||
        (item.razorpayOrderId && item.razorpayOrderId.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All"
          ? true
          : paymentFilter === "Paid"
          ? item.paymentStatus === "Paid"
          : paymentFilter === "Pending"
          ? item.paymentStatus !== "Paid" && item.paymentStatus !== "Failed"
          : item.paymentStatus === "Failed";

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [appointments, searchTerm, statusFilter, paymentFilter]);

  const paginatedAppointments = useMemo(() => {
    return filteredAppointments.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [filteredAppointments, currentPage, pageSize]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#151515] tracking-tight font-serif">
              Consultation Bookings
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E6663A]/10 text-[#E6663A]">
              {appointments.length} Total
            </span>
          </div>
          <p className="text-[#555555] text-xs sm:text-sm mt-0.5">
            Manage clinical consultation bookings, verify payments, and download patient invoices.
          </p>
        </div>

        <button
          onClick={fetchAppointments}
          disabled={loading}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#EFE8E0] text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] text-xs font-semibold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#E6663A]" : ""}`} />
          <span>Refresh Bookings</span>
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#EFE8E0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#777777]">Total Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-[#F8F6F2] flex items-center justify-center text-[#555555]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#151515] mt-2 font-serif">{stats.total}</p>
          <span className="text-[11px] text-[#888888]">Across all channels</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-xs bg-gradient-to-br from-white via-white to-emerald-50/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-800">Paid Online</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-2xl font-bold text-emerald-700 font-serif">{stats.paidCount}</p>
            <span className="text-xs font-bold text-emerald-800">
              (₹{stats.totalRevenue.toLocaleString("en-IN")})
            </span>
          </div>
          <span className="text-[11px] text-emerald-700/80">Razorpay verified fee</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs bg-gradient-to-br from-white via-white to-amber-50/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800">Pending Payment</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-amber-800 mt-2 font-serif">{stats.pendingPayment}</p>
          <span className="text-[11px] text-amber-700/80">Awaiting checkout</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6663A]/20 shadow-xs bg-gradient-to-br from-white via-white to-[#E6663A]/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#E6663A]">New & Uncontacted</span>
            <div className="w-8 h-8 rounded-lg bg-[#E6663A]/10 text-[#E6663A] flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#E6663A] mt-2 font-serif">{stats.newBookings}</p>
          <span className="text-[11px] text-[#777777]">Requires staff callback</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
            <input
              type="text"
              placeholder="Search by patient name, phone, email, service, or payment ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A] transition-all"
            />
          </div>

          {/* Payment Status Quick Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider mr-1 shrink-0">
              Payment:
            </span>
            {[
              { key: "All", label: "All" },
              { key: "Paid", label: "Paid Only" },
              { key: "Pending", label: "Pending" },
              { key: "Failed", label: "Failed" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setPaymentFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  paymentFilter === tab.key
                    ? tab.key === "Paid"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-[#151515] text-white shadow-xs"
                    : "bg-[#F8F6F2] text-[#666666] hover:text-[#151515] border border-[#EFE8E0]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lead Status Filter */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#EFE8E0]/70 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-[#777777] shrink-0" />
          <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider mr-1">
            Booking Status:
          </span>
          {["All", "New", "Contacted", "Scheduled", "Completed", "Cancelled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === status
                    ? "bg-[#E6663A] text-white shadow-xs"
                    : "bg-[#F8F6F2] text-[#555555] hover:text-[#151515] border border-[#EFE8E0]"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl bg-white border border-[#EFE8E0] shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-[#555555] space-y-3">
            <div className="inline-block w-8 h-8 border-3 border-[#E6663A] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs">Fetching bookings from MongoDB...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-[#888888] mx-auto" />
            <p className="text-[#151515] font-semibold text-sm">
              No consultation bookings found
            </p>
            <p className="text-[#666666] text-xs">
              Try adjusting your search query, status, or payment filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#151515]">
              <thead className="bg-[#FAF8F5] uppercase tracking-wider text-[#666666] border-b border-[#EFE8E0] text-[11px]">
                <tr>
                  <th className="px-5 py-4 font-bold">Patient Details</th>
                  <th className="px-5 py-4 font-bold">Procedure / Service</th>
                  <th className="px-5 py-4 font-bold">Payment & Financials</th>
                  <th className="px-5 py-4 font-bold">Patient Note</th>
                  <th className="px-5 py-4 font-bold">Booking Status</th>
                  <th className="px-5 py-4 font-bold">Date & Time</th>
                  <th className="px-5 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8E0]">
                {paginatedAppointments.map((item) => {
                  const createdDate = new Date(item.createdAt);
                  const isPaid = item.paymentStatus === "Paid";
                  const cleanPhoneDigits = item.phone.replace(/\D/g, "");

                  return (
                    <tr
                      key={item._id}
                      className={`hover:bg-[#FAF8F5]/80 transition-colors ${
                        isPaid ? "bg-emerald-50/15" : ""
                      }`}
                    >
                      {/* Patient Details */}
                      <td className="px-5 py-4 align-top min-w-[200px]">
                        <div className="font-bold text-[#151515] text-sm">
                          {item.fullName}
                        </div>

                        <div className="flex flex-col gap-1.5 mt-2">
                          {/* Phone + Call + WhatsApp */}
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${item.phone}`}
                              className="font-medium text-[#151515] hover:text-[#E6663A] transition-colors flex items-center gap-1.5"
                              title="Click to Call"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#E6663A] shrink-0" />
                              <span>{item.phone}</span>
                            </a>

                            {cleanPhoneDigits.length >= 10 && (
                              <a
                                href={`https://wa.me/${cleanPhoneDigits.startsWith("91") ? cleanPhoneDigits : `91${cleanPhoneDigits}`}?text=${encodeURIComponent(
                                  `Hello ${item.fullName}, thank you for contacting Sculpt Aesthetics regarding your consultation for ${item.service}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>

                          {/* Email */}
                          {item.email && (
                            <a
                              href={`mailto:${item.email}`}
                              className="text-[#666666] hover:text-[#E6663A] transition-colors flex items-center gap-1.5 truncate max-w-[200px]"
                              title={item.email}
                            >
                              <Mail className="w-3.5 h-3.5 text-[#888888] shrink-0" />
                              <span className="truncate">{item.email}</span>
                            </a>
                          )}
                        </div>

                        {/* Source Badge */}
                        {item.source && (
                          <div className="pt-2">
                            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#F8F6F2] text-[#666666] border border-[#EFE8E0]">
                              {item.source}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Procedure / Service */}
                      <td className="px-5 py-4 align-top min-w-[170px]">
                        <span className="inline-block px-3 py-1.5 rounded-xl bg-white border border-[#EFE8E0] text-[#151515] font-bold text-xs shadow-2xs">
                          {item.service}
                        </span>
                      </td>

                      {/* Payment & Financials */}
                      <td className="px-5 py-4 align-top min-w-[210px]">
                        {isPaid ? (
                          <div className="space-y-2">
                            {/* Paid Badge */}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-2xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>PAID ₹{item.amountPaid?.toLocaleString("en-IN")}</span>
                            </div>

                            {/* Discount breakdown */}
                            {item.originalFee && item.originalFee > (item.amountPaid || 0) && (
                              <div className="text-[11px] text-[#666666] flex items-center gap-1">
                                <span className="font-bold text-emerald-700">
                                  {item.discountPercent}% OFF
                                </span>
                                <span className="line-through text-[#999999]">
                                  ₹{item.originalFee.toLocaleString("en-IN")}
                                </span>
                              </div>
                            )}

                            {/* Razorpay Payment ID */}
                            {item.razorpayPaymentId && (
                              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#666666] bg-[#F8F6F2] px-2 py-1 rounded-md border border-[#EFE8E0] w-fit">
                                <span className="text-[#888888]">ID:</span>
                                <span className="font-semibold text-[#151515]">
                                  {item.razorpayPaymentId}
                                </span>
                                <button
                                  onClick={() =>
                                    copyToClipboard(item.razorpayPaymentId!, item._id)
                                  }
                                  className="text-[#888888] hover:text-[#151515] ml-0.5 cursor-pointer"
                                  title="Copy Razorpay Payment ID"
                                >
                                  {copiedId === item._id ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            )}

                            {/* Invoice Receipt & Direct Download Links */}
                            <div className="flex flex-col gap-1.5 pt-1">
                              <a
                                href={`/receipt/${item._id}?download=true`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold transition-all w-fit shadow-2xs"
                                title="Download official PDF invoice file directly"
                              >
                                <Download className="w-3 h-3 text-emerald-600" />
                                <span>Download PDF</span>
                              </a>
                              <a
                                href={`/receipt/${item._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E6663A] hover:underline"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>View & Print &rarr;</span>
                              </a>
                            </div>
                          </div>
                        ) : item.paymentStatus === "Failed" ? (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-300">
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              <span>PAYMENT FAILED</span>
                            </span>
                            <p className="text-[10px] text-rose-600/80">
                              Patient attempted but transaction failed
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-300">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span>PENDING PAYMENT</span>
                            </span>
                            <p className="text-[10px] text-[#777777]">
                              Payable: ₹{item.amountPaid || 500}
                            </p>
                          </div>
                        )}
                      </td>

                      {/* Patient Note */}
                      <td className="px-5 py-4 align-top max-w-xs">
                        {item.message ? (
                          <div className="space-y-1">
                            <p className="line-clamp-2 text-[#555555] leading-relaxed">
                              {item.message}
                            </p>
                            <button
                              onClick={() => setViewTarget(item)}
                              className="text-[11px] text-[#E6663A] font-semibold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                            >
                              <span>Read full note</span>
                              <Eye className="w-3 h-3 ml-0.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[#999999] italic text-[11px]">
                            No specific note provided
                          </span>
                        )}
                      </td>

                      {/* Booking Status Dropdown */}
                      <td className="px-5 py-4 align-top">
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

                      {/* Date & Time */}
                      <td className="px-5 py-4 align-top whitespace-nowrap">
                        <div className="font-semibold text-[#151515]">
                          {createdDate.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                        <div className="text-[11px] text-[#777777] mt-0.5">
                          {createdDate.toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 align-top text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View details */}
                          <button
                            onClick={() => setViewTarget(item)}
                            className="p-2 rounded-lg text-[#666666] hover:text-[#151515] hover:bg-[#F8F6F2] transition-colors cursor-pointer"
                            title="View Full Booking Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Direct Download Invoice PDF */}
                          {isPaid && (
                            <a
                              href={`/receipt/${item._id}?download=true`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors inline-flex items-center"
                              title="Direct Download Invoice PDF"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}

                          {/* Print Invoice */}
                          {isPaid && (
                            <a
                              href={`/receipt/${item._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-[#555555] hover:text-[#151515] hover:bg-[#F8F6F2] transition-colors inline-flex items-center"
                              title="View & Print Official Receipt"
                            >
                              <FileText className="w-4 h-4" />
                            </a>
                          )}

                          {/* Delete Lead */}
                          <button
                            onClick={() => setDeleteTarget(item)}
                            className="p-2 rounded-lg text-[#888888] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && filteredAppointments.length > 0 && (
        <AdminPagination
          currentPage={currentPage}
          totalItems={filteredAppointments.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[10, 25, 50]}
          itemName="consultation bookings"
        />
      )}

      {/* Full Patient Details Modal */}
      {viewTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EFE8E0] rounded-3xl p-6 sm:p-8 w-full max-w-xl shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#EFE8E0] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#E6663A] uppercase tracking-wider bg-[#E6663A]/10 px-2.5 py-1 rounded-full">
                  Consultation Booking Record
                </span>
                <h3 className="text-xl font-bold font-serif text-[#151515] mt-2">
                  {viewTarget.fullName}
                </h3>
                <p className="text-xs text-[#777777]">
                  Submitted on{" "}
                  {new Date(viewTarget.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <button
                onClick={() => setViewTarget(null)}
                className="p-2 rounded-full hover:bg-[#F8F6F2] text-[#888888] hover:text-[#151515] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${viewTarget.phone}`}
                className="flex items-center gap-2 p-3 rounded-xl bg-[#F8F6F2] hover:bg-[#EFE8E0] border border-[#EFE8E0] text-xs font-semibold text-[#151515] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#E6663A]" />
                <span>Call: {viewTarget.phone}</span>
              </a>

              {viewTarget.email && (
                <a
                  href={`mailto:${viewTarget.email}`}
                  className="flex items-center gap-2 p-3 rounded-xl bg-[#F8F6F2] hover:bg-[#EFE8E0] border border-[#EFE8E0] text-xs font-semibold text-[#151515] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#777777]" />
                  <span className="truncate">Email: {viewTarget.email}</span>
                </a>
              )}
            </div>

            {/* Service & Financial Card */}
            <div className="p-4 rounded-2xl bg-[#F8F6F2] border border-[#EFE8E0] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#666666]">Interested Service:</span>
                <span className="font-bold text-xs text-[#151515] bg-white px-3 py-1 rounded-lg border border-[#EFE8E0]">
                  {viewTarget.service}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-[#EFE8E0] pt-2">
                <span className="text-xs text-[#666666]">Payment Status:</span>
                {viewTarget.paymentStatus === "Paid" ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    Paid ₹{viewTarget.amountPaid?.toLocaleString("en-IN")}
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {viewTarget.paymentStatus || "Pending"}
                  </span>
                )}
              </div>

              {viewTarget.razorpayPaymentId && (
                <div className="flex items-center justify-between border-t border-[#EFE8E0] pt-2">
                  <span className="text-xs text-[#666666]">Razorpay Payment ID:</span>
                  <span className="font-mono text-xs font-semibold text-[#151515]">
                    {viewTarget.razorpayPaymentId}
                  </span>
                </div>
              )}

              {viewTarget.source && (
                <div className="flex items-center justify-between border-t border-[#EFE8E0] pt-2">
                  <span className="text-xs text-[#666666]">Booking Origin:</span>
                  <span className="text-xs font-medium text-[#151515]">
                    {viewTarget.source}
                  </span>
                </div>
              )}
            </div>

            {/* Full Patient Message */}
            <div>
              <h4 className="text-xs font-bold text-[#151515] uppercase tracking-wider mb-2">
                Patient Consultation Goals / Message:
              </h4>
              <div className="p-4 rounded-2xl bg-white border border-[#EFE8E0] text-xs text-[#555555] leading-relaxed whitespace-pre-wrap">
                {viewTarget.message || "No specific consultation note was provided."}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-[#EFE8E0] pt-4">
              {viewTarget.paymentStatus === "Paid" ? (
                <div className="flex items-center gap-2">
                  <a
                    href={`/receipt/${viewTarget._id}?download=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                  <a
                    href={`/receipt/${viewTarget._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#EFE8E0] hover:border-[#151515] text-[#151515] font-bold text-xs shadow-2xs transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View / Print</span>
                  </a>
                </div>
              ) : (
                <div />
              )}

              <button
                onClick={() => setViewTarget(null)}
                className="px-5 py-2 rounded-xl bg-[#151515] text-white font-bold text-xs hover:bg-[#333333] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EFE8E0] rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 rounded-full bg-rose-50 border border-rose-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#151515] font-serif">
                Confirm Delete Booking
              </h3>
            </div>

            <p className="text-xs text-[#555555] leading-relaxed">
              Are you sure you want to delete the booking for{" "}
              <strong className="text-[#151515]">"{deleteTarget.fullName}"</strong> (
              {deleteTarget.service})?
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
                {deleting ? "Deleting..." : "Delete Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
