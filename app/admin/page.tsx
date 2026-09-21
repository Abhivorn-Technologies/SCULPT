import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";
import Blog from "@/lib/models/Blog";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  FileText,
  ArrowRight,
  Database,
  Sparkles,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  let totalAppointments = 0;
  let newAppointments = 0;
  let completedAppointments = 0;
  let totalBlogs = 0;
  let recentAppointments: any[] = [];
  let dbConnected = false;

  if (process.env.MONGODB_URI) {
    try {
      await connectToDatabase();
      dbConnected = true;

      totalAppointments = await Appointment.countDocuments();
      newAppointments = await Appointment.countDocuments({ status: "New" });
      completedAppointments = await Appointment.countDocuments({ status: "Completed" });
      totalBlogs = await Blog.countDocuments();

      recentAppointments = await Appointment.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();
    } catch (e) {
      console.error("Dashboard DB fetch error:", e);
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#E6663A]/10 via-white to-white border border-[#E6663A]/20 p-6 md:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#E6663A] text-xs font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-4 h-4" /> Welcome Back
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#151515] tracking-tight font-serif">
              {session?.user?.name || "Admin"} Dashboard
            </h1>
            <p className="text-[#555555] text-xs md:text-sm mt-1 max-w-xl">
              Overview of lead requests, client inquiries, and website health for SCULPT Aesthetics.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                dbConnected
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-amber-50 border-amber-200 text-amber-700"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>
                {dbConnected ? "MongoDB Connected" : "Connecting MongoDB..."}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#555555]">
              Total Leads
            </span>
            <div className="p-2.5 rounded-xl bg-[#E6663A]/10 text-[#E6663A] border border-[#E6663A]/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#151515]">{totalAppointments}</div>
          <p className="text-xs text-[#777777]">All appointment requests submitted</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#555555]">
              New Leads
            </span>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-rose-600">{newAppointments}</div>
          <p className="text-xs text-[#777777]">Requires follow-up by clinic staff</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#555555]">
              Completed
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">
            {completedAppointments}
          </div>
          <p className="text-xs text-[#777777]">Successful consults & treatments</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EFE8E0] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#555555]">
              Blog Articles
            </span>
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-200">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#151515]">{totalBlogs}</div>
          <p className="text-xs text-[#777777]">Published articles in CMS</p>
        </div>
      </div>

      {/* Recent Appointments Section */}
      <div className="rounded-2xl bg-white border border-[#EFE8E0] shadow-sm overflow-hidden p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#151515] tracking-tight font-serif">
              Recent Lead Inquiries
            </h3>
            <p className="text-xs text-[#555555] mt-0.5">
              Latest client requests from appointment form
            </p>
          </div>
          <Link
            href="/admin/appointments"
            className="flex items-center gap-1.5 text-xs font-bold text-[#E6663A] hover:underline transition-all"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentAppointments.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[#EFE8E0] rounded-xl bg-[#F8F6F2]/50">
            <Calendar className="w-10 h-10 text-[#888888] mx-auto mb-3" />
            <p className="text-[#151515] text-sm font-semibold">
              No appointment inquiries found in MongoDB yet
            </p>
            <p className="text-[#666666] text-xs mt-1">
              Submit a test form on the website to see inquiries appear here
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#151515]">
              <thead className="bg-[#F8F6F2] text-xs uppercase tracking-wider text-[#555555] border-b border-[#EFE8E0]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Client Name</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8E0]">
                {recentAppointments.map((item: any) => (
                  <tr key={String(item._id)} className="hover:bg-[#F8F6F2]/60 transition-colors">
                    <td className="px-4 py-3 font-bold text-[#151515]">
                      {item.fullName}
                    </td>
                    <td className="px-4 py-3 text-[#555555]">{item.phone}</td>
                    <td className="px-4 py-3 text-[#555555]">{item.service}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          item.status === "New"
                            ? "bg-rose-50 text-rose-600 border border-rose-200"
                            : item.status === "Contacted"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : item.status === "Scheduled"
                            ? "bg-sky-50 text-sky-700 border border-sky-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-[#777777]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
