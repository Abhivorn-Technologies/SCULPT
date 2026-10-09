import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import GalleryResult from "@/lib/models/Gallery";

// PUT /api/admin/gallery/[id] — Update gallery result
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    await connectToDatabase();
    const updated = await GalleryResult.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ error: "Gallery result not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, result: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update gallery result" }, { status: 500 });
  }
}

// DELETE /api/admin/gallery/[id] — Delete gallery result
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    await GalleryResult.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Gallery result deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete gallery result" }, { status: 500 });
  }
}
