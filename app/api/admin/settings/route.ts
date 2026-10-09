import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, newPassword } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      let user = await User.findOne({ email: session.user?.email || email });

      let updateData: any = { name, email };
      if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        updateData.passwordHash = await bcrypt.hash(newPassword, salt);
      }

      if (user) {
        await User.findByIdAndUpdate(user._id, updateData);
      } else {
        // Create user if initial env user is logging in
        const salt = await bcrypt.genSalt(10);
        const hash = newPassword ? await bcrypt.hash(newPassword, salt) : await bcrypt.hash("SculptAdmin2026!", salt);
        await User.create({
          name: name || "Sculpt Admin",
          email: email.toLowerCase().trim(),
          passwordHash: hash,
          role: "admin",
        });
      }
    }

    return NextResponse.json({ success: true, message: "Settings updated successfully" });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
