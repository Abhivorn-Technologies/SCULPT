"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Save,
  Globe,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Eye,
  Edit3,
} from "lucide-react";
import { servicesData } from "@/lib/servicesData";

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || "");
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(initialData?.category || "Facial Aesthetics");
  const [author, setAuthor] = useState(initialData?.author || "Sculpt Team");
  const [publishDate, setPublishDate] = useState(
    initialData?.publishDate
      ? new Date(initialData.publishDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [status, setStatus] = useState<"Draft" | "Published">(initialData?.status || "Published");
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "");
  const [relatedService, setRelatedService] = useState(initialData?.relatedService || "");

  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const insertFormatting = (prefix: string, suffix: string, defaultText: string) => {
    const textarea = document.getElementById("blog-content-editor") as HTMLTextAreaElement | null;
    if (!textarea) {
      setContent((prev: string) => `${prev}\n${prefix}${defaultText}${suffix}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || defaultText;
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 50);
  };

  // Handle title change and auto-generate slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEdit || !slug) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      );
    }
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
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
        setFeaturedImage(data.url);
      } else {
        setError(data.error || "Failed to upload image");
      }
    } catch (err) {
      setError("An error occurred during file upload.");
    } finally {
      setUploading(false);
    }
  };

  // Submit Handler
  const handleSubmit = async (targetStatus?: "Draft" | "Published") => {
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Blog Title is required.");
      return;
    }

    if (!content.trim()) {
      setError("Blog Content is required.");
      return;
    }

    setSaving(true);
    const finalStatus = targetStatus || status;

    const payload = {
      title,
      slug,
      featuredImage,
      shortDescription,
      content,
      category,
      author,
      publishDate,
      status: finalStatus,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || shortDescription,
      relatedService,
    };

    try {
      const url = isEdit ? `/api/admin/blogs/${initialData._id}` : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(isEdit ? "Blog updated successfully!" : "Blog created successfully!");
        setTimeout(() => {
          router.push("/admin/blogs");
          router.refresh();
        }, 800);
      } else {
        setError(data.error || "Failed to save blog.");
      }
    } catch (err) {
      setError("An error occurred while saving the blog.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="p-2 rounded-xl bg-white border border-[#EFE8E0] text-[#555555] hover:text-[#151515] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#151515] font-serif">
              {isEdit ? "Edit Blog Article" : "Create New Blog Article"}
            </h1>
            <p className="text-[#555555] text-xs mt-0.5">
              Fill in all details, preview image, and manage status
            </p>
          </div>
        </div>

        {/* Header Save / Draft Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit("Draft")}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#EFE8E0] text-[#555555] hover:text-[#151515] text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit("Published")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E6663A] to-[#F28C28] text-white font-bold text-xs shadow-md shadow-[#E6663A]/20 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Publish Blog"}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-3">
          <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      {/* Main Form Fields Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Content Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                Blog Title <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Complete Guide to Rhinoplasty & Nose Reshaping"
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-3 text-sm font-semibold text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A]"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                URL Slug <span className="text-rose-600">*</span>
              </label>
              <div className="flex items-center gap-2 bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3.5 py-2.5">
                <span className="text-xs text-[#888888] font-mono select-none">/blog/</span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="rhinoplasty-guide"
                  className="w-full bg-transparent text-xs font-mono text-[#151515] focus:outline-none"
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1.5">
                Short Description / Summary
              </label>
              <textarea
                rows={3}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="A brief summary for category list view and social media cards..."
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-3 text-xs text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A]"
              />
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFE8E0] pb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#151515]">
                  Blog Content <span className="text-rose-600">*</span>
                </label>

                {/* Write / Live Preview Mode Toggle */}
                <div className="flex items-center gap-1 bg-[#F8F6F2] p-1 rounded-xl border border-[#EFE8E0] self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab("write")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "write"
                        ? "bg-[#E6663A] text-white shadow-xs"
                        : "text-[#555555] hover:text-[#151515]"
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Write</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === "preview"
                        ? "bg-[#E6663A] text-white shadow-xs"
                        : "text-[#555555] hover:text-[#151515]"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Article Preview</span>
                  </button>
                </div>
              </div>

              {activeTab === "write" ? (
                <div className="space-y-2">
                  {/* Visual Formatting Toolbar */}
                  <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] mr-1">
                      1-Click Formatting:
                    </span>
                    <button
                      type="button"
                      onClick={() => insertFormatting("<strong>", "</strong>", "bold text")}
                      title="Bold Text"
                      className="p-1.5 px-2.5 rounded-lg bg-white border border-[#EFE8E0] text-xs font-bold text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Bold className="w-3.5 h-3.5" /> Bold
                    </button>

                    <button
                      type="button"
                      onClick={() => insertFormatting("<em>", "</em>", "italic text")}
                      title="Italic Text"
                      className="p-1.5 px-2.5 rounded-lg bg-white border border-[#EFE8E0] text-xs font-bold italic text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Italic className="w-3.5 h-3.5" /> Italic
                    </button>

                    <button
                      type="button"
                      onClick={() => insertFormatting("\n<h2>", "</h2>\n", "Main Heading Title")}
                      title="Heading 2"
                      className="p-1.5 px-2.5 rounded-lg bg-white border border-[#EFE8E0] text-xs font-extrabold text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Heading1 className="w-3.5 h-3.5" /> Heading H2
                    </button>

                    <button
                      type="button"
                      onClick={() => insertFormatting("\n<h3>", "</h3>\n", "Subheading Title")}
                      title="Heading 3"
                      className="p-1.5 px-2.5 rounded-lg bg-white border border-[#EFE8E0] text-xs font-bold text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Heading2 className="w-3.5 h-3.5" /> Subheading H3
                    </button>

                    <button
                      type="button"
                      onClick={() => insertFormatting("\n<p>", "</p>\n", "Paragraph text here...")}
                      title="Paragraph"
                      className="p-1.5 px-2.5 rounded-lg bg-white border border-[#EFE8E0] text-xs font-semibold text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] transition-all cursor-pointer"
                    >
                      Paragraph
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          "\n<ul>\n  <li>",
                          "</li>\n  <li>Second key point</li>\n</ul>\n",
                          "First key point"
                        )
                      }
                      title="Bullet List"
                      className="p-1.5 px-2.5 rounded-lg bg-white border border-[#EFE8E0] text-xs font-bold text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] transition-all cursor-pointer flex items-center gap-1"
                    >
                      <List className="w-3.5 h-3.5" /> Bullet List
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          "\n<ol>\n  <li>",
                          "</li>\n  <li>Second step</li>\n</ol>\n",
                          "First step"
                        )
                      }
                      title="Numbered List"
                      className="p-1.5 px-2.5 rounded-lg bg-white border border-[#EFE8E0] text-xs font-bold text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] transition-all cursor-pointer flex items-center gap-1"
                    >
                      <ListOrdered className="w-3.5 h-3.5" /> Numbered List
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        insertFormatting(
                          "\n<blockquote>",
                          "</blockquote>\n",
                          "Important medical highlight quote..."
                        )
                      }
                      title="Quote Box"
                      className="p-1.5 px-2.5 rounded-lg bg-white border border-[#EFE8E0] text-xs font-bold text-[#151515] hover:border-[#E6663A] hover:text-[#E6663A] transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Quote className="w-3.5 h-3.5" /> Quote Box
                    </button>
                  </div>

                  <textarea
                    id="blog-content-editor"
                    rows={14}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type or paste your article text here... Click the 1-Click Formatting buttons above to easily add headings, bold text, or lists!"
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl p-4 text-xs text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A] leading-relaxed font-sans"
                  />
                </div>
              ) : (
                /* Live Article Preview Box */
                <div className="w-full bg-[#FDFBF7] border border-[#EFE8E0] rounded-2xl p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-[#333333] leading-relaxed min-h-[350px]">
                  <div className="border-b border-[#EFE8E0] pb-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E6663A]">
                      Live Public Website Article Preview
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#151515] mt-1">
                      {title || "Untitled Article Title"}
                    </h2>
                  </div>

                  <div
                    className="prose prose-sm sm:prose max-w-none text-[#333333] space-y-4 font-sans leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        content ||
                        "<p className='text-gray-400 italic'>No content typed yet. Switch back to Write mode to compose your article.</p>",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* SEO Metadata Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#E6663A]" /> SEO & Meta Data
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Search engine title tag..."
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2.5 text-xs text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Meta Description
              </label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Search engine description preview snippet..."
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2.5 text-xs text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A]"
              />
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Sidebar Settings & Featured Image */}
        <div className="space-y-6">
          {/* Featured Image Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#E6663A]" /> Featured Image
            </h3>

            {/* Preview Box */}
            <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#F8F6F2] border border-dashed border-[#EFE8E0] flex flex-col items-center justify-center">
              {featuredImage ? (
                <Image
                  src={featuredImage}
                  alt="Featured preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-center p-4 text-[#888888] space-y-2">
                  <ImageIcon className="w-8 h-8 mx-auto" />
                  <p className="text-xs">No image selected</p>
                </div>
              )}
            </div>

            {/* File Upload Button */}
            <div className="space-y-2">
              <label className="block">
                <span className="sr-only">Choose File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="block w-full text-xs text-[#555555] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E6663A] file:text-white hover:file:opacity-90 cursor-pointer"
                />
              </label>

              <div className="text-center text-[10px] text-[#888888] uppercase tracking-wider font-semibold">
                — OR —
              </div>

              {/* Direct Image URL input */}
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="Paste image URL..."
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3 py-2 text-xs text-[#151515] placeholder-[#888888] focus:outline-none focus:border-[#E6663A]"
              />
            </div>
          </div>

          {/* Publishing Settings Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#151515] font-serif">Publishing Settings</h3>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3.5 py-2.5 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
              >
                <option value="Published">Published (Live on Website)</option>
                <option value="Draft">Draft (Admin Only)</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3.5 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
              >
                <option value="Facial Aesthetics">Facial Aesthetics</option>
                <option value="Body Contouring">Body Contouring</option>
                <option value="Breast Surgery">Breast Surgery</option>
                <option value="Skin Rejuvenation">Skin Rejuvenation</option>
                <option value="Intimate Aesthetics">Intimate Aesthetics</option>
                <option value="Wellness">Wellness</option>
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Sculpt Team"
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3.5 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
              />
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Publish Date
              </label>
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3.5 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
              />
            </div>

            {/* Related Service */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Related Service (Optional)
              </label>
              <select
                value={relatedService}
                onChange={(e) => setRelatedService(e.target.value)}
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3.5 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
              >
                <option value="">-- None --</option>
                {servicesData.map((s: any) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
