import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Appointment from "@/lib/models/Appointment";

export const dynamic = "force-dynamic";

// GET /api/admin/contact-enquiries — Fetch all enquiries originating from the Contact page
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { enquiries: [], message: "MongoDB is not connected yet" },
        { status: 200 }
      );
    }

    await connectToDatabase();
    const enquiries = await Appointment.find({ source: "Contact Page" }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error("Error fetching contact enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact enquiries" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/contact-enquiries — Update enquiry status or notes
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status, notes } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Enquiry ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    const updated = await Appointment.findByIdAndUpdate(
      id,
      { ...(status && { status }), ...(notes !== undefined && { notes }) },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/contact-enquiries — Remove enquiry
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    await Appointment.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Enquiry deleted" });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return NextResponse.json(
      { error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
