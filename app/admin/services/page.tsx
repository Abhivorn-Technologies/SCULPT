"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  RefreshCw,
  Edit,
  Trash2,
  Sparkles,
  Eye,
  AlertTriangle,
  Layers,
} from "lucide-react";

interface IService {
  _id: string;
  name: string;
  slug: string;
  category: string;
  isPlasticSurgery?: boolean;
  featured?: boolean;
  image?: string;
  shortDescription?: string;
  displayOrder: number;
  status: "Draft" | "Published";
  createdAt: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Deletion modal state
  const [deleteTarget, setDeleteTarget] = useState<IService | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const fetchServices = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (searchTerm) query.set("search", searchTerm);
      if (categoryFilter !== "All") query.set("category", categoryFilter);
      if (statusFilter !== "All") query.set("status", statusFilter);

      const res = await fetch(`/api/admin/services?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setServices(data.services || []);
      }
    } catch (e) {
      console.error("Error fetching services:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchServices();
  }, [searchTerm, categoryFilter, statusFilter]);

  const handleToggleStatus = async (item: IService) => {
    const newStatus = item.status === "Published" ? "Draft" : "Published";
    try {
      const res = await fetch(`/api/admin/services/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) =>
          prev.map((s) => (s._id === item._id ? { ...s, status: newStatus } : s))
        );
      }
    } catch (e) {
      console.error("Failed to toggle status:", e);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/services/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => prev.filter((s) => s._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (e) {
      console.error("Failed to delete service:", e);
    } finally {
      setDeleting(false);
    }
  };

  const defaultCategories = ["All", "FACE", "BODY", "BREAST", "SKIN", "INTIMATE", "WELLNESS"];
  const dbCategories = Array.from(
    new Set(services.map((s) => (s.category || "").trim().toUpperCase()).filter(Boolean))
  );
  const categoryOptions = Array.from(new Set([...defaultCategories, ...dbCategories]));

  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
  const paginatedServices = services.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#151515] tracking-tight font-serif flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E6663A]" /> Clinical Services Manager
          </h1>
          <p className="text-[#555555] text-sm mt-0.5">
            Manage public treatment procedures, descriptions, images, and FAQs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchServices}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#EFE8E0] text-[#151515] hover:border-[#E6663A] text-xs font-semibold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#E6663A]" : ""}`} />
            <span>Refresh</span>
          </button>
          <Link
            href="/admin/services/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E6663A] hover:bg-[#d05328] text-white text-xs font-bold shadow-md shadow-[#E6663A]/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
          <input
            type="text"
            placeholder="Search procedure name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A] transition-all"
          />
        </div>

        {/* Category & Status Selectors */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#555555]">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3 py-2 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#555555]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3 py-2 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-[#EFE8E0]">
          <RefreshCw className="w-8 h-8 text-[#E6663A] animate-spin mx-auto mb-3" />
          <p className="text-xs text-[#555555]">Loading clinical services...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-[#EFE8E0] space-y-3">
          <Sparkles className="w-10 h-10 text-[#888888] mx-auto" />
          <h3 className="font-bold text-[#151515]">No Services Found</h3>
          <p className="text-xs text-[#555555] max-w-sm mx-auto">
            No procedure matches your search filters. Try resetting search or add a new service.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedServices.map((item) => (
            <div
              key={item._id}
              className="p-5 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4 hover:border-[#E6663A]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#E6663A]/10 text-[#E6663A] text-[10px] font-extrabold uppercase tracking-wider">
                    {item.category}
                  </span>

                  <button
                    onClick={() => handleToggleStatus(item)}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border cursor-pointer transition-colors ${
                      item.status === "Published"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200"
                        : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                    }`}
                  >
                    {item.status}
                  </button>
                </div>

                {/* Service Hero Image */}
                <div className="relative h-40 rounded-xl overflow-hidden bg-[#F8F6F2] border border-[#EFE8E0]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-[#888888] text-xs font-bold">
                      No Image Provided
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-[#151515] leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#555555] line-clamp-2 mt-1">
                    {item.shortDescription || "No overview description provided."}
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-[#EFE8E0] flex items-center justify-between gap-2">
                <span className="text-[10px] text-[#888888] font-mono">/services/{item.slug}</span>

                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/services/${item.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg text-[#555555] hover:text-[#151515] hover:bg-[#F8F6F2] transition-colors"
                    title="View on Public Site"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/admin/services/${item._id}`}
                    className="p-2 rounded-lg text-[#555555] hover:text-[#E6663A] hover:bg-[#F8F6F2] transition-colors"
                    title="Edit Service"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#EFE8E0]">
          <p className="text-xs text-[#555555]">
            Showing{" "}
            <strong className="text-[#151515]">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, services.length)}
            </strong>{" "}
            of <strong className="text-[#151515]">{services.length}</strong> services
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#EFE8E0] bg-white text-xs font-bold text-[#151515] disabled:opacity-40 hover:border-[#E6663A] hover:text-[#E6663A] transition-all cursor-pointer"
            >
              ‹ Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce<(number | "...")[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-1.5 text-[#888888] text-xs">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p as number)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currentPage === p
                        ? "bg-[#E6663A] text-white shadow-md"
                        : "bg-white border border-[#EFE8E0] text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A]"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#EFE8E0] bg-white text-xs font-bold text-[#151515] disabled:opacity-40 hover:border-[#E6663A] hover:text-[#E6663A] transition-all cursor-pointer"
            >
              Next ›
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-white max-w-md w-full shadow-2xl border border-[#EFE8E0] space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 rounded-full bg-rose-50 border border-rose-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#151515] font-serif">Confirm Delete Service</h3>
            </div>

            <p className="text-xs text-[#555555] leading-relaxed">
              Are you sure you want to delete the procedure <strong className="text-[#151515]">"{deleteTarget.name}"</strong>? This will remove the service landing page from the public website.
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
                {deleting ? "Deleting..." : "Delete Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
