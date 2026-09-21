"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  FileText,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface IBlog {
  _id: string;
  title: string;
  slug: string;
  featuredImage?: string;
  shortDescription?: string;
  category: string;
  author: string;
  publishDate: string;
  status: "Draft" | "Published";
  createdAt: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Confirmation modal state for deletion
  const [deleteTarget, setDeleteTarget] = useState<IBlog | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (searchTerm) query.set("search", searchTerm);
      if (categoryFilter !== "All") query.set("category", categoryFilter);
      if (statusFilter !== "All") query.set("status", statusFilter);

      const res = await fetch(`/api/admin/blogs?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs || []);
      }
    } catch (e) {
      console.error("Error fetching blogs:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, categoryFilter, statusFilter]);

  const handleToggleStatus = async (blog: IBlog) => {
    const newStatus = blog.status === "Published" ? "Draft" : "Published";
    try {
      const res = await fetch(`/api/admin/blogs/${blog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) =>
          prev.map((b) => (b._id === blog._id ? { ...b, status: newStatus } : b))
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
      const res = await fetch(`/api/admin/blogs/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBlogs((prev) => prev.filter((b) => b._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (e) {
      console.error("Failed to delete blog:", e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#151515] tracking-tight font-serif">
            Blogs Management
          </h1>
          <p className="text-[#555555] text-sm mt-0.5">
            Create, edit, publish, and manage website articles
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBlogs}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white border border-[#EFE8E0] text-[#555555] hover:text-[#151515] text-xs font-semibold shadow-xs transition-all disabled:opacity-50"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#E6663A]" : ""}`} />
          </button>

          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E6663A] to-[#F28C28] text-white font-bold text-xs shadow-md shadow-[#E6663A]/20 hover:opacity-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Blog</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
          <input
            type="text"
            placeholder="Search blogs by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl pl-10 pr-4 py-2 text-xs text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#555555] font-semibold hidden lg:inline">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
            >
              <option value="All">All Categories</option>
              <option value="Facial Aesthetics">Facial Aesthetics</option>
              <option value="Body Contouring">Body Contouring</option>
              <option value="Breast Surgery">Breast Surgery</option>
              <option value="Skin Rejuvenation">Skin Rejuvenation</option>
              <option value="Intimate Aesthetics">Intimate Aesthetics</option>
              <option value="Wellness">Wellness</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#555555] font-semibold hidden lg:inline">Status:</span>
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
      </div>

      {/* Blogs List Table */}
      <div className="rounded-2xl bg-white border border-[#EFE8E0] shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-[#555555] space-y-3">
            <div className="inline-block w-8 h-8 border-3 border-[#E6663A] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold">Loading blogs from database...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <FileText className="w-10 h-10 text-[#888888] mx-auto" />
            <p className="text-[#151515] font-bold text-sm">No blogs found</p>
            <p className="text-[#666666] text-xs max-w-sm mx-auto">
              No blogs match your filter criteria. Click below to write your first article.
            </p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E6663A] text-white text-xs font-bold shadow-sm hover:opacity-95"
            >
              <Plus className="w-4 h-4" /> Add Blog Post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#151515]">
              <thead className="bg-[#F8F6F2] uppercase tracking-wider text-[#555555] border-b border-[#EFE8E0]">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Featured Image</th>
                  <th className="px-5 py-3.5 font-semibold">Title & Slug</th>
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold">Publish Date</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8E0]">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-[#F8F6F2]/60 transition-colors">
                    {/* Featured Image Thumbnail */}
                    <td className="px-5 py-3.5">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-[#EFE8E0] border border-[#EFE8E0]">
                        {blog.featuredImage ? (
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#888888]">
                            <FileText className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title & Slug */}
                    <td className="px-5 py-3.5 max-w-xs">
                      <div className="font-bold text-[#151515] text-sm line-clamp-1">
                        {blog.title}
                      </div>
                      <div className="text-[11px] text-[#666666] font-mono mt-0.5 truncate">
                        /{blog.slug}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-md bg-[#F8F6F2] border border-[#EFE8E0] font-bold text-[#151515]">
                        {blog.category}
                      </span>
                    </td>

                    {/* Status Toggle Badge */}
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => handleToggleStatus(blog)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer border transition-all ${
                          blog.status === "Published"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        }`}
                        title="Click to toggle status"
                      >
                        {blog.status === "Published" ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" /> Published
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Draft
                          </>
                        )}
                      </button>
                    </td>

                    {/* Publish Date */}
                    <td className="px-5 py-3.5 text-[#555555]">
                      {new Date(blog.publishDate || blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg text-[#555555] hover:text-[#E6663A] hover:bg-[#F8F6F2] transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/blogs/${blog._id}`}
                          className="p-2 rounded-lg text-[#555555] hover:text-[#E6663A] hover:bg-[#F8F6F2] transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(blog)}
                          className="p-2 rounded-lg text-[#555555] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete"
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

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#EFE8E0] rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 rounded-full bg-rose-50 border border-rose-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#151515] font-serif">Confirm Delete</h3>
            </div>

            <p className="text-xs text-[#555555] leading-relaxed">
              Are you sure you want to delete the blog post <strong className="text-[#151515]">"{deleteTarget.title}"</strong>? This action cannot be undone.
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
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Blog"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
