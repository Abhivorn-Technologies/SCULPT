import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicesData, getServiceBySlug, getRelatedServices } from "@/lib/servicesData";
import ServiceDetailClient from "./ServiceDetailClient";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

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

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.relatedServiceSlugs);

  return <ServiceDetailClient service={service} relatedServices={relatedServices} />;
}
