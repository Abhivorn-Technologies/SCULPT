import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Admin Dashboard — SCULPT Aesthetics",
  description: "Manage lead inquiries, appointments, and website content",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <NextAuthProvider>
      <AdminLayoutClient session={session}>
        {children}
      </AdminLayoutClient>
    </NextAuthProvider>
  );
}
