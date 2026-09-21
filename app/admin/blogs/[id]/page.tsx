import BlogForm from "@/components/admin/BlogForm";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { notFound } from "next/navigation";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectToDatabase();

  const blog = await Blog.findById(id).lean();

  if (!blog) {
    notFound();
  }

  // Convert MongoDB ObjectId and Date to serializable JSON
  const serializedBlog = JSON.parse(JSON.stringify(blog));

  return <BlogForm initialData={serializedBlog} isEdit={true} />;
}
