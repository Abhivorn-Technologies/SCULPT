"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Sparkles,
  Globe,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Layers,
  HelpCircle,
  UserCheck,
  Activity,
  FileText,
  DollarSign,
  ShieldAlert,
} from "lucide-react";

interface ServiceFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ServiceForm({ initialData, isEdit = false }: ServiceFormProps) {
  const router = useRouter();

  // Basic Info
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "FACE");
  const [isPlasticSurgery, setIsPlasticSurgery] = useState(initialData?.isPlasticSurgery || false);
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [image, setImage] = useState(initialData?.image || "");
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || "");
  const [heroHeadline, setHeroHeadline] = useState(initialData?.heroHeadline || "");

  // Section 1 & 2: Intro & Understanding
  const [introHeadline, setIntroHeadline] = useState(initialData?.introHeadline || "");
  const [introParagraphs, setIntroParagraphs] = useState<string[]>(
    initialData?.introParagraphs && initialData.introParagraphs.length > 0
      ? initialData.introParagraphs
      : [""]
  );

  const [understandingHeadline, setUnderstandingHeadline] = useState(
    initialData?.understandingHeadline || ""
  );
  const [understandingParagraphs, setUnderstandingParagraphs] = useState<string[]>(
    initialData?.understandingParagraphs && initialData.understandingParagraphs.length > 0
      ? initialData.understandingParagraphs
      : [""]
  );

  // Section 3: Key Benefits
  const [benefits, setBenefits] = useState<string[]>(
    initialData?.benefits && initialData.benefits.length > 0 ? initialData.benefits : [""]
  );

  // Section 4: Ideal Candidate
  const [candidateIntro, setCandidateIntro] = useState(initialData?.candidateIntro || "");
  const [candidateItems, setCandidateItems] = useState<string[]>(
    initialData?.candidateItems && initialData.candidateItems.length > 0
      ? initialData.candidateItems
      : [""]
  );
  const [candidateSummary, setCandidateSummary] = useState(initialData?.candidateSummary || "");

  // Section 5: Procedure Steps
  const [procedureSteps, setProcedureSteps] = useState<
    { stepNumber: number; title: string; description: string }[]
  >(
    initialData?.procedureSteps && initialData.procedureSteps.length > 0
      ? initialData.procedureSteps
      : [{ stepNumber: 1, title: "", description: "" }]
  );

  // Section 6, 7, 8: Recovery, Scars, Pricing, Safety
  const [approachParagraphs, setApproachParagraphs] = useState<string[]>(
    initialData?.approachParagraphs && initialData.approachParagraphs.length > 0
      ? initialData.approachParagraphs
      : [""]
  );
  const [approachSubSections, setApproachSubSections] = useState<
    { title: string; content: string }[]
  >(
    initialData?.approachSubSections && initialData.approachSubSections.length > 0
      ? initialData.approachSubSections
      : []
  );

  const [recoveryParagraphs, setRecoveryParagraphs] = useState<string[]>(
    initialData?.recoveryParagraphs && initialData.recoveryParagraphs.length > 0
      ? initialData.recoveryParagraphs
      : [""]
  );
  const [pricingText, setPricingText] = useState(initialData?.pricingText || "");
  const [scarsText, setScarsText] = useState(initialData?.scarsText || "");
  const [safetyText, setSafetyText] = useState(initialData?.safetyText || "");

  // Section 9: Before & After Results & Videos
  const [beforeAfterResults, setBeforeAfterResults] = useState<
    {
      id?: string;
      title: string;
      beforeImage: string;
      afterImage?: string;
      description?: string;
      tag?: string;
      isIllustrative?: boolean;
    }[]
  >(initialData?.beforeAfterResults || []);

  const [videos, setVideos] = useState<
    {
      id?: string;
      youtubeId: string;
      title: string;
      duration?: string;
      description?: string;
    }[]
  >(initialData?.videos || []);

  const [isEmpty, setIsEmpty] = useState<boolean>(initialData?.isEmpty || false);

  // Section 10: FAQs
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(
    initialData?.faqs && initialData.faqs.length > 0
      ? initialData.faqs
      : [{ question: "", answer: "" }]
  );

  // Status & SEO
  const [displayOrder, setDisplayOrder] = useState<number>(initialData?.displayOrder || 1);
  const [status, setStatus] = useState<"Draft" | "Published">(initialData?.status || "Published");
  const [metaTitle, setMetaTitle] = useState(initialData?.seo?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(
    initialData?.seo?.metaDescription || ""
  );
  const [focusKeywords, setFocusKeywords] = useState(initialData?.seo?.focusKeywords || "");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
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
        setImage(data.url);
      } else {
        setError(data.error || "Failed to upload image");
      }
    } catch (err) {
      setError("An error occurred during file upload.");
    } finally {
      setUploading(false);
    }
  };

  // Helper functions for dynamic lists
  const handleStringArrayChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    val: string
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = val;
      return updated;
    });
  };

  const addStringArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const removeStringArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  // FAQ Handlers
  const handleFaqChange = (index: number, field: "question" | "answer", value: string) => {
    setFaqs((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };
  const addFaq = () => setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  const removeFaq = (index: number) => setFaqs((prev) => prev.filter((_, i) => i !== index));

  // Procedure Step Handlers
  const handleStepChange = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    setProcedureSteps((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };
  const addProcedureStep = () =>
    setProcedureSteps((prev) => [
      ...prev,
      { stepNumber: prev.length + 1, title: "", description: "" },
    ]);
  const removeProcedureStep = (index: number) =>
    setProcedureSteps((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((step, idx) => ({ ...step, stepNumber: idx + 1 }))
    );

  // Approach SubSection Handlers
  const handleSubSectionChange = (index: number, field: "title" | "content", val: string) => {
    setApproachSubSections((prev) => {
      const updated = [...prev];
      updated[index][field] = val;
      return updated;
    });
  };
  const addSubSection = () =>
    setApproachSubSections((prev) => [...prev, { title: "", content: "" }]);
  const removeSubSection = (index: number) =>
    setApproachSubSections((prev) => prev.filter((_, i) => i !== index));

  // Before & After Handlers
  const handleBeforeAfterChange = (index: number, field: string, val: any) => {
    setBeforeAfterResults((prev) => {
      const updated = [...prev];
      (updated[index] as any)[field] = val;
      return updated;
    });
  };
  const addBeforeAfter = () =>
    setBeforeAfterResults((prev) => [
      ...prev,
      {
        id: `ba-${Date.now()}`,
        title: "",
        beforeImage: "",
        afterImage: "",
        description: "",
        tag: "Real Patient Outcome",
        isIllustrative: false,
      },
    ]);
  const removeBeforeAfter = (index: number) =>
    setBeforeAfterResults((prev) => prev.filter((_, i) => i !== index));

  const handleBeforeAfterImageUpload = async (
    index: number,
    field: "beforeImage" | "afterImage",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        handleBeforeAfterChange(index, field, data.url);
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  // Video Handlers
  /** Extract YouTube video ID from full URL or plain ID */
  const extractYouTubeId = (input: string): string => {
    const trimmed = input.trim();
    // Try to parse as URL
    try {
      const url = new URL(trimmed);
      // https://www.youtube.com/watch?v=VIDEO_ID
      if (url.searchParams.has("v")) return url.searchParams.get("v")!;
      // https://youtu.be/VIDEO_ID
      if (url.hostname === "youtu.be") return url.pathname.slice(1);
      // https://www.youtube.com/embed/VIDEO_ID
      const embedMatch = url.pathname.match(/\/embed\/([^/?&]+)/);
      if (embedMatch) return embedMatch[1];
      // https://www.youtube.com/shorts/VIDEO_ID
      const shortsMatch = url.pathname.match(/\/shorts\/([^/?&]+)/);
      if (shortsMatch) return shortsMatch[1];
    } catch {
      // Not a URL — treat as raw ID
    }
    return trimmed;
  };

  const handleVideoChange = (index: number, field: string, val: string) => {
    const processedVal = field === "youtubeId" ? extractYouTubeId(val) : val;
    setVideos((prev) => {
      const updated = [...prev];
      (updated[index] as any)[field] = processedVal;
      return updated;
    });
  };
  const addVideo = () =>
    setVideos((prev) => [
      ...prev,
      { id: `vid-${Date.now()}`, youtubeId: "", title: "", duration: "", description: "" },
    ]);
  const removeVideo = (index: number) =>
    setVideos((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (targetStatus?: "Draft" | "Published") => {
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Service Name is required.");
      return;
    }

    if (!category.trim()) {
      setError("Category is required.");
      return;
    }

    setSaving(true);
    const finalStatus = targetStatus || status;

    const payload = {
      name,
      slug,
      category: category.toUpperCase().trim(),
      isPlasticSurgery,
      featured,
      image,
      shortDescription,
      heroHeadline: heroHeadline || name,
      introHeadline,
      introParagraphs: introParagraphs.filter((p) => p.trim()),
      understandingHeadline,
      understandingParagraphs: understandingParagraphs.filter((p) => p.trim()),
      benefits: benefits.filter((b) => b.trim()),
      candidateIntro,
      candidateItems: candidateItems.filter((c) => c.trim()),
      candidateSummary,
      procedureSteps: procedureSteps.filter((s) => s.title.trim() || s.description.trim()),
      approachParagraphs: approachParagraphs.filter((p) => p.trim()),
      approachSubSections: approachSubSections.filter((s) => s.title.trim() || s.content.trim()),
      recoveryParagraphs: recoveryParagraphs.filter((r) => r.trim()),
      pricingText,
      scarsText,
      safetyText,
      faqs: faqs.filter((f) => f.question.trim() && f.answer.trim()),
      beforeAfterResults: beforeAfterResults.filter((r) => r.title.trim() || r.beforeImage.trim()),
      videos: videos.filter((v) => v.youtubeId.trim() || v.title.trim()),
      isEmpty,
      seo: {
        metaTitle: metaTitle || `${name} in Hyderabad — Sculpt Aesthetics`,
        metaDescription: metaDescription || shortDescription || name,
        focusKeywords,
      },
      displayOrder: Number(displayOrder) || 1,
      status: finalStatus,
    };

    try {
      const url = isEdit ? `/api/admin/services/${initialData._id}` : "/api/admin/services";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(isEdit ? "Service updated successfully!" : "Service created successfully!");
        setTimeout(() => {
          router.push("/admin/services");
          router.refresh();
        }, 800);
      } else {
        setError(data.error || "Failed to save service.");
      }
    } catch (err) {
      setError("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const defaultCategories = ["FACE", "BODY", "BREAST", "SKIN", "INTIMATE", "WELLNESS"];

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-20">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/services"
            className="p-2.5 rounded-xl bg-white border border-[#EFE8E0] text-[#555555] hover:text-[#E6663A] hover:border-[#E6663A] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#151515] font-serif tracking-tight">
              {isEdit ? `Edit Service: ${initialData?.name}` : "Add New Clinical Service"}
            </h1>
            <p className="text-xs text-[#555555] mt-0.5">
              Fill in procedure details, intro, advantages, candidate criteria, steps, recovery & FAQs.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSubmit("Draft")}
            disabled={saving}
            className="px-4 py-2.5 rounded-xl border border-[#EFE8E0] bg-white text-[#555555] hover:text-[#151515] hover:border-[#E6663A] text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("Published")}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E6663A] hover:bg-[#d05328] text-white text-xs font-bold shadow-md shadow-[#E6663A]/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : isEdit ? "Update Service" : "Publish Service"}</span>
          </button>
        </div>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): All Clinical Content Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: General Info */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2 pb-2 border-b border-[#EFE8E0]">
              <Sparkles className="w-4 h-4 text-[#E6663A]" /> 1. General & Header Info
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                  Service Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  placeholder="e.g. Liposuction, Rhinoplasty..."
                  className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2.5 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                  URL Slug <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2 text-xs text-[#151515] font-mono focus:outline-none focus:border-[#E6663A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Category <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value.toUpperCase())}
                placeholder="e.g. FACE, BODY, BREAST, SKIN..."
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2.5 text-xs text-[#151515] font-bold uppercase focus:outline-none focus:border-[#E6663A]"
              />
              <div className="flex flex-wrap gap-1 mt-1.5">
                {defaultCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                      category.toUpperCase() === cat
                        ? "bg-[#E6663A] text-white"
                        : "bg-white border border-[#EFE8E0] text-[#555555] hover:border-[#E6663A]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Short Overview / Card Description
              </label>
              <textarea
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief summary displayed on category grid cards..."
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Hero Headline (Title Banner)
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                placeholder="e.g. Advanced Liposuction & Body Contouring in Hyderabad"
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2.5 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
              />
            </div>
          </div>

          {/* Card 2: Clinical Intro & Understanding */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2 pb-2 border-b border-[#EFE8E0]">
              <FileText className="w-4 h-4 text-[#E6663A]" /> 2. Introductory & Clinical Overview
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Intro Section Headline
              </label>
              <input
                type="text"
                value={introHeadline}
                onChange={(e) => setIntroHeadline(e.target.value)}
                placeholder="e.g. Transform Your Silhouette with Precision Liposuction"
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
              />
            </div>

            {/* Intro Paragraphs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#151515]">
                  Introductory Paragraphs
                </label>
                <button
                  type="button"
                  onClick={() => addStringArrayItem(setIntroParagraphs)}
                  className="text-xs text-[#E6663A] font-bold hover:underline cursor-pointer"
                >
                  + Add Paragraph
                </button>
              </div>

              {introParagraphs.map((para, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <textarea
                    rows={3}
                    value={para}
                    onChange={(e) =>
                      handleStringArrayChange(setIntroParagraphs, idx, e.target.value)
                    }
                    placeholder={`Introductory paragraph #${idx + 1}...`}
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                  />
                  {introParagraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStringArrayItem(setIntroParagraphs, idx)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Clinical Advantages & Benefits */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE8E0] pb-2">
              <div>
                <h2 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#E6663A]" /> 3. Key Clinical Advantages &amp; Benefits
                </h2>
                <p className="text-[10px] text-[#888888] mt-0.5">Each entry = one benefit card on the public page. Keep each short (1–2 lines).</p>
              </div>
              <button
                type="button"
                onClick={() => addStringArrayItem(setBenefits)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E6663A]/10 text-[#E6663A] hover:bg-[#E6663A] hover:text-white text-xs font-bold transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Add Benefit
              </button>
            </div>

            <div className="space-y-2.5">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  {/* Number badge */}
                  <span className="mt-2 w-6 h-6 rounded-full bg-[#E6663A]/10 text-[#E6663A] text-[10px] font-extrabold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) =>
                      handleStringArrayChange(setBenefits, idx, e.target.value)
                    }
                    placeholder={`e.g. Removes stubborn fat resistant to diet & exercise`}
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                  />
                  {benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStringArrayItem(setBenefits, idx)}
                      className="mt-1 p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {benefits.length === 0 && (
              <p className="text-xs text-[#888888] italic text-center py-3">
                No benefits added yet. Click &quot;Add Benefit&quot; to start.
              </p>
            )}
          </div>


          {/* Card 4: Ideal Candidate Section */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2 pb-2 border-b border-[#EFE8E0]">
              <UserCheck className="w-4 h-4 text-[#E6663A]" /> 4. Ideal Candidate Criteria
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Candidate Intro Text
              </label>
              <input
                type="text"
                value={candidateIntro}
                onChange={(e) => setCandidateIntro(e.target.value)}
                placeholder="e.g. You may be an ideal candidate for Liposuction if you meet the following criteria:"
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#151515]">
                  Candidate Criteria Items
                </label>
                <button
                  type="button"
                  onClick={() => addStringArrayItem(setCandidateItems)}
                  className="text-xs text-[#E6663A] font-bold hover:underline cursor-pointer"
                >
                  + Add Criteria
                </button>
              </div>

              {candidateItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleStringArrayChange(setCandidateItems, idx, e.target.value)
                    }
                    placeholder={`Criteria item #${idx + 1}...`}
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                  />
                  {candidateItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStringArrayItem(setCandidateItems, idx)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 5: Procedure Steps */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE8E0] pb-2">
              <h2 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#E6663A]" /> 5. Procedure Steps & Timeline
              </h2>
              <button
                type="button"
                onClick={addProcedureStep}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#E6663A]/10 text-[#E6663A] hover:bg-[#E6663A] hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>

            <div className="space-y-4">
              {procedureSteps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E6663A]">Step #{step.stepNumber}</span>
                    {procedureSteps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProcedureStep(idx)}
                        className="text-rose-600 text-xs font-bold hover:underline"
                      >
                        Remove Step
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleStepChange(idx, "title", e.target.value)}
                    placeholder="Step Title (e.g. Tumescent Fluid Infiltration)"
                    className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3.5 py-2 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
                  />
                  <textarea
                    rows={2}
                    value={step.description}
                    onChange={(e) => handleStepChange(idx, "description", e.target.value)}
                    placeholder="Step description..."
                    className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3.5 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card 6: Our Approach & Techniques */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2 pb-2 border-b border-[#EFE8E0]">
              <Sparkles className="w-4 h-4 text-[#E6663A]" /> 6. Our Approach & Special Techniques
            </h2>

            {/* Approach Paragraphs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#151515]">
                  Approach Overview Paragraphs
                </label>
                <button
                  type="button"
                  onClick={() => addStringArrayItem(setApproachParagraphs)}
                  className="text-xs text-[#E6663A] font-bold hover:underline cursor-pointer"
                >
                  + Add Paragraph
                </button>
              </div>

              {approachParagraphs.map((para, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <textarea
                    rows={2}
                    value={para}
                    onChange={(e) =>
                      handleStringArrayChange(setApproachParagraphs, idx, e.target.value)
                    }
                    placeholder={`Approach paragraph #${idx + 1}...`}
                    className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                  />
                  {approachParagraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStringArrayItem(setApproachParagraphs, idx)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Approach Sub-Sections */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-t border-[#EFE8E0] pt-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#151515]">
                  Specialized Sub-Sections & Cards (e.g. Areas We Treat, BMI, Techniques)
                </label>
                <button
                  type="button"
                  onClick={addSubSection}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#E6663A]/10 text-[#E6663A] hover:bg-[#E6663A] hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Sub-Section
                </button>
              </div>

              {approachSubSections.map((sub, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E6663A]">Sub-Section #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeSubSection(idx)}
                      className="text-rose-600 text-xs font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={sub.title}
                    onChange={(e) => handleSubSectionChange(idx, "title", e.target.value)}
                    placeholder="Title (e.g. Ultrasound-Assisted Liposuction)"
                    className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3.5 py-2 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
                  />
                  <textarea
                    rows={2}
                    value={sub.content}
                    onChange={(e) => handleSubSectionChange(idx, "content", e.target.value)}
                    placeholder="Detailed explanation content..."
                    className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3.5 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card 7: Recovery, Scars, Safety & Pricing */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2 pb-2 border-b border-[#EFE8E0]">
              <ShieldAlert className="w-4 h-4 text-[#E6663A]" /> 7. Recovery, Scars, Safety & Pricing
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Scars & Marks Information
              </label>
              <textarea
                rows={2}
                value={scarsText}
                onChange={(e) => setScarsText(e.target.value)}
                placeholder="Details about incision locations and scar healing..."
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Safety & Considerations
              </label>
              <textarea
                rows={2}
                value={safetyText}
                onChange={(e) => setSafetyText(e.target.value)}
                placeholder="Safety protocols, pre-op guidelines..."
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Pricing & Fee Guidance
              </label>
              <textarea
                rows={2}
                value={pricingText}
                onChange={(e) => setPricingText(e.target.value)}
                placeholder="Pricing guidance text..."
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
              />
            </div>
          </div>

          {/* Card 8: Before & After Transformation Cards */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE8E0] pb-2">
              <h2 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#E6663A]" /> 8. Before & After Transformation Cards
              </h2>
              <button
                type="button"
                onClick={addBeforeAfter}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#E6663A]/10 text-[#E6663A] hover:bg-[#E6663A] hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Result Card
              </button>
            </div>

            {beforeAfterResults.length === 0 ? (
              <p className="text-xs text-[#888888] italic">No before & after cards added yet.</p>
            ) : (
              <div className="space-y-4">
                {beforeAfterResults.map((ba, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#E6663A]">Result Card #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeBeforeAfter(idx)}
                        className="text-rose-600 text-xs font-bold hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#555555] mb-1">
                          Card Title
                        </label>
                        <input
                          type="text"
                          value={ba.title}
                          onChange={(e) => handleBeforeAfterChange(idx, "title", e.target.value)}
                          placeholder="e.g. Abdominal Liposuction & Flanks"
                          className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3 py-1.5 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#555555] mb-1">
                          Tag / Badge Text
                        </label>
                        <input
                          type="text"
                          value={ba.tag || ""}
                          onChange={(e) => handleBeforeAfterChange(idx, "tag", e.target.value)}
                          placeholder="e.g. Real Patient Outcome"
                          className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3 py-1.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#555555] mb-1">
                          Before Image (URL or Upload)
                        </label>
                        <input
                          type="text"
                          value={ba.beforeImage}
                          onChange={(e) => handleBeforeAfterChange(idx, "beforeImage", e.target.value)}
                          placeholder="Image URL..."
                          className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3 py-1.5 text-xs text-[#151515] mb-1 focus:outline-none focus:border-[#E6663A]"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleBeforeAfterImageUpload(idx, "beforeImage", e)}
                          className="block w-full text-[10px] text-[#555555] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#E6663A] file:text-white cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#555555] mb-1">
                          After Image (Optional if combined)
                        </label>
                        <input
                          type="text"
                          value={ba.afterImage || ""}
                          onChange={(e) => handleBeforeAfterChange(idx, "afterImage", e.target.value)}
                          placeholder="Image URL..."
                          className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3 py-1.5 text-xs text-[#151515] mb-1 focus:outline-none focus:border-[#E6663A]"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleBeforeAfterImageUpload(idx, "afterImage", e)}
                          className="block w-full text-[10px] text-[#555555] file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#E6663A] file:text-white cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#555555] mb-1">
                        Result Note / Description
                      </label>
                      <input
                        type="text"
                        value={ba.description || ""}
                        onChange={(e) => handleBeforeAfterChange(idx, "description", e.target.value)}
                        placeholder="e.g. 3 months post-op result following high-definition liposuction."
                        className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3 py-1.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Card 9: Watch & Learn Procedural Videos */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE8E0] pb-2">
              <h2 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#E6663A]" /> 9. Procedural Insight Videos (YouTube)
              </h2>
              <button
                type="button"
                onClick={addVideo}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#E6663A]/10 text-[#E6663A] hover:bg-[#E6663A] hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Video
              </button>
            </div>

            {videos.length === 0 ? (
              <p className="text-xs text-[#888888] italic">No YouTube videos added yet.</p>
            ) : (
              <div className="space-y-4">
                {videos.map((vid, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#E6663A]">Video #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeVideo(idx)}
                        className="text-rose-600 text-xs font-bold hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#555555] mb-1">
                          YouTube Video URL or ID
                        </label>
                        <input
                          type="text"
                          value={vid.youtubeId}
                          onChange={(e) => handleVideoChange(idx, "youtubeId", e.target.value)}
                          placeholder="Paste full URL or ID (e.g. dQw4w9WgXcQ)"
                          className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3 py-1.5 text-xs text-[#151515] font-mono focus:outline-none focus:border-[#E6663A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#555555] mb-1">
                          Duration (Optional)
                        </label>
                        <input
                          type="text"
                          value={vid.duration || ""}
                          onChange={(e) => handleVideoChange(idx, "duration", e.target.value)}
                          placeholder="e.g. 4:15"
                          className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3 py-1.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#555555] mb-1">
                        Video Title
                      </label>
                      <input
                        type="text"
                        value={vid.title}
                        onChange={(e) => handleVideoChange(idx, "title", e.target.value)}
                        placeholder="Video Title..."
                        className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3 py-1.5 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#555555] mb-1">
                        Video Description
                      </label>
                      <textarea
                        rows={2}
                        value={vid.description || ""}
                        onChange={(e) => handleVideoChange(idx, "description", e.target.value)}
                        placeholder="Brief summary of video content..."
                        className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3 py-1.5 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Card 7: Frequently Asked Questions */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE8E0] pb-2">
              <h2 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#E6663A]" /> 7. Frequently Asked Questions
              </h2>
              <button
                type="button"
                onClick={addFaq}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#E6663A]/10 text-[#E6663A] hover:bg-[#E6663A] hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add FAQ
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F8F6F2] border border-[#EFE8E0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E6663A]">FAQ #{idx + 1}</span>
                    {faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFaq(idx)}
                        className="text-rose-600 text-xs font-bold hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                    placeholder="Question (e.g. Is this procedure permanent?)"
                    className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3.5 py-2 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
                  />
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                    placeholder="Detailed clinical answer..."
                    className="w-full bg-white border border-[#EFE8E0] rounded-xl px-3.5 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Sidebar Settings & Featured Image */}
        <div className="space-y-6">
          {/* Hero Image Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2 border-b border-[#EFE8E0] pb-2">
              <ImageIcon className="w-4 h-4 text-[#E6663A]" /> Hero / Service Image
            </h3>

            <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#F8F6F2] border border-dashed border-[#EFE8E0] flex flex-col items-center justify-center">
              {image ? (
                <Image src={image} alt="Service preview" fill className="object-cover" />
              ) : (
                <div className="text-center p-4 text-[#888888] space-y-2">
                  <ImageIcon className="w-8 h-8 mx-auto" />
                  <p className="text-xs">No image selected</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="block w-full text-xs text-[#555555] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E6663A] file:text-white cursor-pointer"
              />
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Or paste Cloudinary URL..."
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
              />
            </div>
          </div>

          {/* Publishing Controls Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#151515] font-serif border-b border-[#EFE8E0] pb-2">
              Publishing Options
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3 py-2.5 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
              >
                <option value="Published">Published (Public)</option>
                <option value="Draft">Draft (Hidden)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Display Order Position
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-4 py-2 text-xs text-[#151515] font-bold focus:outline-none focus:border-[#E6663A]"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isPlasticSurgery"
                checked={isPlasticSurgery}
                onChange={(e) => setIsPlasticSurgery(e.target.checked)}
                className="w-4 h-4 text-[#E6663A] rounded border-[#EFE8E0] accent-[#E6663A]"
              />
              <label htmlFor="isPlasticSurgery" className="text-xs font-semibold text-[#151515] cursor-pointer">
                Plastic Surgery Department
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-[#E6663A] rounded border-[#EFE8E0] accent-[#E6663A]"
              />
              <label htmlFor="featured" className="text-xs font-semibold text-[#151515] cursor-pointer">
                Feature on Homepage Grid
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isEmpty"
                checked={isEmpty}
                onChange={(e) => setIsEmpty(e.target.checked)}
                className="w-4 h-4 text-[#E6663A] rounded border-[#EFE8E0] accent-[#E6663A]"
              />
              <label htmlFor="isEmpty" className="text-xs font-semibold text-[#151515] cursor-pointer">
                Mark as 'Protocols Being Finalized' Placeholder
              </label>
            </div>
          </div>

          {/* SEO Metadata Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#151515] font-serif flex items-center gap-2 border-b border-[#EFE8E0] pb-2">
              <Globe className="w-4 h-4 text-[#E6663A]" /> SEO & Metadata
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Search engine title..."
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
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
                placeholder="Search engine snippet..."
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#151515] mb-1">
                Focus Keywords
              </label>
              <input
                type="text"
                value={focusKeywords}
                onChange={(e) => setFocusKeywords(e.target.value)}
                placeholder="e.g. liposuction hyderabad, tummy tuck cost"
                className="w-full bg-[#F8F6F2] border border-[#EFE8E0] rounded-xl px-3 py-2 text-xs text-[#151515] focus:outline-none focus:border-[#E6663A]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
