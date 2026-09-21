import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicesData, getServiceBySlug, getRelatedServices, type ServiceItem } from "@/lib/servicesData";
import ServiceDetailClient from "./ServiceDetailClient";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/lib/models/Service";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

async function getService(slug: string): Promise<ServiceItem | null> {
  if (process.env.MONGODB_URI) {
    try {
      await connectToDatabase();
      const dbService = await Service.findOne({ slug, status: "Published" }).lean();
      if (dbService) {
        const rawObj = {
          id: String(dbService._id),
          slug: dbService.slug,
          name: dbService.name,
          category: dbService.category as any,
          isPlasticSurgery: dbService.isPlasticSurgery || false,
          featured: dbService.featured || false,
          image: dbService.image || "",
          shortDescription: dbService.shortDescription || "",
          heroHeadline: dbService.heroHeadline || dbService.name,
          introHeadline: dbService.introHeadline || "",
          introParagraphs: dbService.introParagraphs || [],
          understandingHeadline: dbService.understandingHeadline || "",
          understandingParagraphs: dbService.understandingParagraphs || [],
          benefits: dbService.benefits || [],
          candidateIntro: dbService.candidateIntro || "",
          candidateItems: dbService.candidateItems || [],
          candidateSummary: dbService.candidateSummary || "",
          procedureSteps: (dbService.procedureSteps || []).map((step: any) => ({
            stepNumber: step.stepNumber,
            title: step.title || "",
            description: step.description || "",
          })),
          approachParagraphs: dbService.approachParagraphs || [],
          approachSubSections: (dbService.approachSubSections || []).map((sub: any) => ({
            title: sub.title || "",
            content: sub.content || "",
          })),
          recoveryParagraphs: dbService.recoveryParagraphs || [],
          pricingText: dbService.pricingText || "",
          scarsText: dbService.scarsText || "",
          safetyText: dbService.safetyText || "",
          faqs: (dbService.faqs || []).map((faq: any) => ({
            question: faq.question || "",
            answer: faq.answer || "",
          })),
          beforeAfterResults: (dbService.beforeAfterResults || []).map((ba: any) => ({
            id: String(ba.id || ba._id || ""),
            title: ba.title || "",
            beforeImage: ba.beforeImage || "",
            afterImage: ba.afterImage || "",
            description: ba.description || "",
            tag: ba.tag || "",
            isIllustrative: Boolean(ba.isIllustrative),
          })),
          videos: (dbService.videos || []).map((v: any) => ({
            id: String(v.id || v._id || ""),
            youtubeId: v.youtubeId || "",
            title: v.title || "",
            duration: v.duration || "",
            description: v.description || "",
          })),
          isEmpty: dbService.isEmpty || false,
          filterCategories: dbService.filterCategories || [dbService.category],
          relatedServiceSlugs: dbService.relatedServiceSlugs || [],
          seo: dbService.seo || {
            metaTitle: `${dbService.name} in Hyderabad | The Sculpt Aesthetics`,
            metaDescription: dbService.shortDescription || dbService.name,
          },
        };

        return JSON.parse(JSON.stringify(rawObj));
      }
    } catch (e) {
      console.error("Error fetching DB service:", e);
    }
  }

  return getServiceBySlug(slug) || null;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: "Service Not Found | The Sculpt Aesthetics",
    };
  }

  const title = service.seo?.metaTitle || `${service.name} in Hyderabad | The Sculpt Aesthetics`;
  const description =
    service.seo?.metaDescription ||
    service.shortDescription ||
    `Expert ${service.name} by board-certified plastic surgeons at The Sculpt Aesthetics in Madhapur, Hyderabad.`;

  const canonical = service.seo?.canonicalUrl || `https://thesculptaesthetics.com/services/${service.slug}`;

  return {
    title,
    description,
    keywords: service.seo?.focusKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "The Sculpt Aesthetics",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 900,
          alt: service.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.relatedServiceSlugs);

  return <ServiceDetailClient service={service} relatedServices={relatedServices} />;
}
