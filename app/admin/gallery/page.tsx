"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  RefreshCw,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  X,
  Upload,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { servicesData } from "@/lib/servicesData";

interface IGalleryResult {
  _id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  treatmentService: string;
  category?: string;
  shortDescription?: string;
  displayOrder: number;
  status: "Draft" | "Published";
  createdAt: string;
}

export default function AdminGalleryPage() {
  const [results, setResults] = useState<IGalleryResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal State for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<IGalleryResult | null>(null);

  // Form Fields State
  const [imageMode, setImageMode] = useState<"composite" | "separate">("separate");
  const [title, setTitle] = useState("");
  const [beforeImage, setBeforeImage] = useState("");
  const [afterImage, setAfterImage] = useState("");
  const [treatmentService, setTreatmentService] = useState("");
  const [category, setCategory] = useState<string>("FACE");
  const [shortDescription, setShortDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<"Draft" | "Published">("Published");

  const [uploadingField, setUploadingField] = useState<"before" | "after" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<IGalleryResult | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const fetchResults = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (searchTerm) query.set("search", searchTerm);
      if (statusFilter !== "All") query.set("status", statusFilter);

      const res = await fetch(`/api/admin/gallery?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.results || []);
      }
    } catch (e) {
      console.error("Error fetching gallery results:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchResults();
  }, [searchTerm, statusFilter]);

  const openAddModal = () => {
    setEditingResult(null);
    setImageMode("separate");
    setTitle("");
    setBeforeImage("");
    setAfterImage("");
    setTreatmentService("");
    setCategory("FACE");
    setShortDescription("");
    setDisplayOrder(results.length + 1);
    setStatus("Published");
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (item: IGalleryResult) => {
    setEditingResult(item);
    const isComp = item.beforeImage === item.afterImage;
    setImageMode(isComp ? "composite" : "separate");
    setTitle(item.title);
    setBeforeImage(item.beforeImage);
    setAfterImage(item.afterImage);
    setTreatmentService(item.treatmentService);

    const matchingService = servicesData.find(
      (s) => s.name.toLowerCase() === (item.treatmentService || "").toLowerCase()
    );
    setCategory((item.category || matchingService?.category || "FACE") as any);

    setShortDescription(item.shortDescription || "");
    setDisplayOrder(item.displayOrder || 0);
    setStatus(item.status);
    setError("");
    setIsModalOpen(true);
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "before" | "after"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(field);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        if (field === "before") setBeforeImage(data.url);
        if (field === "after") setAfterImage(data.url);
      } else {
        setError(data.error || "Failed to upload image.");
      }
    } catch (err) {
      setError("An error occurred during file upload.");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const finalBefore = beforeImage;
    const finalAfter = imageMode === "composite" ? beforeImage : afterImage;

    if (!title.trim() || !finalBefore || !finalAfter || !treatmentService) {
      setError(
        imageMode === "composite"
          ? "Title, Image, and Treatment Service are required."
          : "Title, Before Image, After Image, and Treatment Service are required."
      );
      return;
    }

    setSubmitting(true);

    const payload = {
      title,
      beforeImage: finalBefore,
      afterImage: finalAfter,
      treatmentService,
      category: (category || "FACE").trim().toUpperCase(),
      shortDescription,
      displayOrder: Number(displayOrder) || 0,
      status,
    };

    try {
      const url = editingResult
        ? `/api/admin/gallery/${editingResult._id}`
        : "/api/admin/gallery";
      const method = editingResult ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setIsModalOpen(false);
        fetchResults();
      } else {
        setError(data.error || "Failed to save gallery result.");
      }
    } catch (err) {
      setError("An error occurred while saving.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (item: IGalleryResult) => {
    const newStatus = item.status === "Published" ? "Draft" : "Published";
    try {
      const res = await fetch(`/api/admin/gallery/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setResults((prev) =>
          prev.map((r) => (r._id === item._id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (e) {
      console.error("Error toggling status:", e);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/gallery/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setResults((prev) => prev.filter((r) => r._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (e) {
      console.error("Failed to delete gallery result:", e);
    } finally {
      setDeleting(false);
    }
  };

  const defaultCategories = ["FACE", "BODY", "BREAST", "SKIN", "INTIMATE", "WELLNESS"];
  const dbCategories = Array.from(
    new Set(
      results
        .map((r) => (r.category || "").trim().toUpperCase())
        .filter(Boolean)
    )
  );
  const categoryOptions = Array.from(new Set([...defaultCategories, ...dbCategories]));

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#151515] tracking-tight font-serif">
            Gallery / Before & After Results
          </h1>
          <p className="text-[#555555] text-sm mt-0.5">
            Manage surgical and clinical before-and-after transformations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchResults}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white border border-[#EFE8E0] text-[#555555] hover:text-[#151515] text-xs font-semibold shadow-xs transition-all disabled:opacity-50"
            title="Refresh Results"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#E6663A]" : ""}`} />
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E6663A] to-[#F28C28] text-white font-bold text-xs shadow-md shadow-[#E6663A]/20 hover:opacity-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Result</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
          <input
            type="text"
            placeholder="Search by result title or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-4 py-2 text-xs text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#888888] shrink-0" />
          <span className="text-xs text-[#555555] font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Visual Cards Grid Layout */}
      {loading ? (
        <div className="p-16 text-center text-[#555555] space-y-3 bg-white border border-[#EFE8E0] rounded-2xl">
          <div className="inline-block w-8 h-8 border-3 border-[#E6663A] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold">Loading gallery results...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="p-16 text-center space-y-3 bg-white border border-[#EFE8E0] rounded-2xl">
          <Layers className="w-10 h-10 text-[#888888] mx-auto" />
          <p className="text-[#151515] font-bold text-sm">No gallery results found</p>
          <p className="text-[#666666] text-xs max-w-sm mx-auto">
            Click below to add your first Before & After transformation result.
          </p>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E6663A] text-white text-xs font-bold shadow-sm hover:opacity-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Gallery Result
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Visual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results
              .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-[#EFE8E0] rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    {/* Visual Side-by-Side Before & After Preview */}
                    <div className="relative p-3 bg-[#F8F6F2] border-b border-[#EFE8E0]">
                      <div className="grid grid-cols-2 gap-2">
                        {/* Before Image */}
                        <div className="space-y-1">
                          <div className="relative h-36 rounded-xl overflow-hidden bg-black/5 border border-[#EFE8E0]">
                            <Image
                              src={item.beforeImage}
                              alt={`${item.title} Before`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="block text-center text-[10px] font-bold text-[#E6663A] uppercase tracking-wider bg-white rounded-md py-0.5 border border-[#EFE8E0]">
                            BEFORE
                          </span>
                        </div>

                        {/* After Image */}
                        <div className="space-y-1">
                          <div className="relative h-36 rounded-xl overflow-hidden bg-black/5 border border-[#EFE8E0]">
                            <Image
                              src={item.afterImage}
                              alt={`${item.title} After`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="block text-center text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-white rounded-md py-0.5 border border-[#EFE8E0]">
                            AFTER
                          </span>
                        </div>
                      </div>

                      {/* Order Badge */}
                      <div className="absolute top-4 right-4 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                        Order #{item.displayOrder}
                      </div>
                    </div>

                    {/* Info Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#E6663A]/10 text-[#E6663A] text-[11px] font-bold border border-[#E6663A]/20">
                          {item.treatmentService}
                        </span>

                        <button
                          onClick={() => handleToggleStatus(item)}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                            item.status === "Published"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {item.status === "Published" ? (
                            <>
                              <CheckCircle className="w-3 h-3" /> Published
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" /> Draft
                            </>
                          )}
                        </button>
                      </div>

                      <h3 className="font-bold text-[#151515] text-base font-serif line-clamp-1">
                        {item.title}
                      </h3>

                      {item.shortDescription && (
                        <p className="text-xs text-[#555555] line-clamp-2 italic">
                          "{item.shortDescription}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="p-4 border-t border-[#EFE8E0] bg-[#F8F6F2]/50 flex items-center justify-between">
                    <span className="text-[10px] text-[#888888]">
                      Added {new Date(item.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-xl text-[#555555] hover:text-[#E6663A] hover:bg-white transition-colors border border-transparent hover:border-[#EFE8E0]"
                        title="Edit Result"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="p-2 rounded-xl text-[#555555] hover:text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200"
                        title="Delete Result"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Admin Gallery Pagination Bar */}
          {Math.ceil(results.length / ITEMS_PER_PAGE) > 1 && (
            <div className="p-4 bg-white border border-[#EFE8E0] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <span className="text-xs text-[#555555]">
                Showing <strong className="text-[#151515]">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</strong> - <strong className="text-[#151515]">{Math.min(currentPage * ITEMS_PER_PAGE, results.length)}</strong> of <strong className="text-[#E6663A]">{results.length}</strong> gallery results
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3.5 py-1.5 rounded-xl border border-[#EFE8E0] bg-[#F8F6F2] text-xs font-bold text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] transition-all disabled:opacity-40 disabled:pointer-events-none"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.ceil(results.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? "bg-[#E6663A] text-white shadow-xs"
                            : "bg-[#F8F6F2] text-[#555555] hover:text-[#151515] border border-[#EFE8E0]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>

                <button
                  disabled={currentPage === Math.ceil(results.length / ITEMS_PER_PAGE)}
                  onClick={() => setCurrentPage((p) => Math.min(Math.ceil(results.length / ITEMS_PER_PAGE), p + 1))}
                  className="px-3.5 py-1.5 rounded-xl border border-[#EFE8E0] bg-[#F8F6F2] text-xs font-bold text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] transition-all disabled:opacity-40 disabled:pointer-events-none"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Result Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EFE8E0] w-full max-w-2xl rounded-3xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#EFE8E0] pb-4">
              <h2 className="text-lg font-bold text-[#151515] font-serif">
                {editingResult ? "Edit Gallery Result" : "Add Before & After Result"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#777777] hover:text-[#151515]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Result Title */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#151515] mb-1">
                  Result Title <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Surgical Rhinoplasty Profile Reshaping"
                  className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                />
              </div>

              {/* Image Format Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                  Image Format & Badge Display Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 bg-[#F8F6F2] rounded-2xl border border-[#EFE8E0]">
                  <button
                    type="button"
                    onClick={() => setImageMode("separate")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      imageMode === "separate"
                        ? "bg-[#E6663A] text-white shadow-xs"
                        : "text-[#555555] hover:text-[#151515]"
                    }`}
                  >
                    🖼️ 2 Separate Images (Interactive Slider + BEFORE/AFTER badges)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageMode("composite");
                      if (beforeImage && !afterImage) setAfterImage(beforeImage);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      imageMode === "composite"
                        ? "bg-[#E6663A] text-white shadow-xs"
                        : "text-[#555555] hover:text-[#151515]"
                    }`}
                  >
                    📷 1 Single Composite Image (Top "BEFORE & AFTER" Badge)
                  </button>
                </div>
              </div>

              {/* Before & After Image Upload Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Before Image Box */}
                <div className="p-4 rounded-2xl bg-[#F8F6F2] border border-[#EFE8E0] space-y-3">
                  <label className="block text-xs font-bold uppercase text-[#E6663A]">
                    1. Before Image <span className="text-rose-600">*</span>
                  </label>

                  <div className="relative h-32 rounded-xl overflow-hidden bg-white border border-[#EFE8E0] flex items-center justify-center">
                    {beforeImage ? (
                      <Image
                        src={beforeImage}
                        alt="Before Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-xs text-[#888888]">No Before Image</span>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "before")}
                    disabled={uploadingField === "before"}
                    className="block w-full text-xs text-[#555555] file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E6663A] file:text-white cursor-pointer"
                  />

                  <input
                    type="text"
                    value={beforeImage}
                    onChange={(e) => setBeforeImage(e.target.value)}
                    placeholder="Or paste Before URL..."
                    className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3 py-1.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                  />
                </div>

                {/* After Image Box */}
                <div className="p-4 rounded-2xl bg-[#F8F6F2] border border-[#EFE8E0] space-y-3">
                  <label className="block text-xs font-bold uppercase text-emerald-600">
                    2. After Image <span className="text-rose-600">*</span>
                  </label>

                  <div className="relative h-32 rounded-xl overflow-hidden bg-white border border-[#EFE8E0] flex items-center justify-center">
                    {afterImage ? (
                      <Image
                        src={afterImage}
                        alt="After Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-xs text-[#888888]">No After Image</span>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "after")}
                    disabled={uploadingField === "after"}
                    className="block w-full text-xs text-[#555555] file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E6663A] file:text-white cursor-pointer"
                  />

                  <input
                    type="text"
                    value={afterImage}
                    onChange={(e) => setAfterImage(e.target.value)}
                    placeholder="Or paste After URL..."
                    className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3 py-1.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                  />
                </div>
              </div>

              {/* Treatment / Service & Filter Category & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#151515] mb-1">
                    Treatment / Service Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={treatmentService}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTreatmentService(val);
                      const match = servicesData.find(
                        (s) => s.name.toLowerCase() === val.toLowerCase()
                      );
                      if (match) setCategory(match.category as any);
                    }}
                    placeholder="e.g. Liposuction, Rhinoplasty, Body Sculpting..."
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3.5 py-2.5 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#151515] mb-1">
                    Filter Category <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value.replace(/[^a-zA-Z0-9 _-]/g, "").toUpperCase())
                    }
                    placeholder="e.g. FACE, BODY, HAIR, MEN..."
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3.5 py-2.5 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A] uppercase tracking-wider"
                  />

                  {/* Existing vs New Category Feedback Message */}
                  {category.trim() && (
                    <div className="mt-1">
                      {categoryOptions.includes(category.trim().toUpperCase()) ? (
                        <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          ✓ Category &quot;{category.trim().toUpperCase()}&quot; already exists (selected)
                        </p>
                      ) : (
                        <p className="text-[11px] text-[#E6663A] font-semibold flex items-center gap-1">
                          ✨ Will create new category: &quot;{category.trim().toUpperCase()}&quot;
                        </p>
                      )}
                    </div>
                  )}

                  {/* Quick Category Choice Chips */}
                  <div className="flex flex-wrap gap-1 mt-2 max-h-24 overflow-y-auto">
                    {categoryOptions.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                          category.trim().toUpperCase() === cat
                            ? "bg-[#E6663A] text-white shadow-xs"
                            : "bg-white border border-[#EFE8E0] text-[#555555] hover:border-[#E6663A]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#151515] mb-1">
                    Display Order Position
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    placeholder="1"
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2.5 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
                  />
                </div>
              </div>

              {/* Short Description & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-[#151515] mb-1">
                    Short Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="e.g. 6-week post-op transformation result..."
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#151515] mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3 py-2.5 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFE8E0]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#555555] hover:text-[#151515]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-[#E6663A] hover:bg-[#C94F2D] text-white font-bold text-xs shadow-md shadow-[#E6663A]/20 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Saving Result..." : editingResult ? "Update Result" : "Publish Result"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EFE8E0] rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 rounded-full bg-rose-50 border border-rose-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#151515] font-serif">Confirm Delete Result</h3>
            </div>

            <p className="text-xs text-[#555555] leading-relaxed">
              Are you sure you want to delete the gallery result <strong className="text-[#151515]">"{deleteTarget.title}"</strong>? This will remove the before & after transformation card.
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
                {deleting ? "Deleting..." : "Delete Result"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
