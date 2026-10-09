import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import ServiceForm from "@/components/admin/ServiceForm";
import {
  servicesData,
  getServiceBeforeAfterResults,
  getServiceVideos,
} from "@/lib/servicesData";

interface EditServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;

  if (!process.env.MONGODB_URI) {
    notFound();
  }

  await connectToDatabase();
  const service = await Service.findById(id).lean();

  if (!service) {
    notFound();
  }

  const formattedData = JSON.parse(JSON.stringify(service)) as any;

  // If this service exists in static data and DB fields are empty,
  // fall back to static data so the edit form shows existing content
  const staticEntry = servicesData.find((s) => s.slug === formattedData.slug);

  if (staticEntry) {
    // Before & After: use static if DB has none
    if (!formattedData.beforeAfterResults || formattedData.beforeAfterResults.length === 0) {
      const staticBeforeAfter = getServiceBeforeAfterResults(formattedData.slug);
      if (staticBeforeAfter.length > 0) {
        formattedData.beforeAfterResults = staticBeforeAfter;
      }
    }

    // Videos: use static if DB has none
    if (!formattedData.videos || formattedData.videos.length === 0) {
      const staticVideos = getServiceVideos(formattedData.slug);
      if (staticVideos.length > 0) {
        formattedData.videos = staticVideos;
      }
    }

    // Also fill other empty text fields from static data
    if (!formattedData.introParagraphs || formattedData.introParagraphs.length === 0) {
      formattedData.introParagraphs = staticEntry.introParagraphs || [];
    }
    if (!formattedData.benefits || formattedData.benefits.length === 0) {
      formattedData.benefits = staticEntry.benefits || [];
    }
    if (!formattedData.faqs || formattedData.faqs.length === 0) {
      formattedData.faqs = staticEntry.faqs || [];
    }
    if (!formattedData.procedureSteps || formattedData.procedureSteps.length === 0) {
      formattedData.procedureSteps = staticEntry.procedureSteps || [];
    }
    if (!formattedData.candidateItems || formattedData.candidateItems.length === 0) {
      formattedData.candidateItems = staticEntry.candidateItems || [];
    }
    if (!formattedData.recoveryParagraphs || formattedData.recoveryParagraphs.length === 0) {
      formattedData.recoveryParagraphs = staticEntry.recoveryParagraphs || [];
    }
    if (!formattedData.understandingParagraphs || formattedData.understandingParagraphs.length === 0) {
      formattedData.understandingParagraphs = staticEntry.understandingParagraphs || [];
    }
    if (!formattedData.approachParagraphs || formattedData.approachParagraphs.length === 0) {
      formattedData.approachParagraphs = staticEntry.approachParagraphs || [];
    }
  }

  return <ServiceForm initialData={formattedData} isEdit={true} />;
}
