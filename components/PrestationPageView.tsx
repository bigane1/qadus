import { getPrestationPage } from "@/lib/prestations";
import { getContentImages } from "@/lib/content-images";
import ServicePageLayout from "@/components/ServicePageLayout";

export default function PrestationPageView({ slug }: { slug: string }) {
  const page = getPrestationPage(slug);
  const images = getContentImages();

  const beforeAfter =
    slug === "chemisage"
      ? {
          title: "Avant / Après chemisage",
          before: {
            src: images.chemisageBefore.src,
            alt: images.chemisageBefore.alt,
            label: "Avant intervention",
          },
          after: {
            src: images.chemisageAfter.src,
            alt: images.chemisageAfter.alt,
            label: "Après intervention",
          },
        }
      : undefined;

  return (
    <ServicePageLayout
      badge={page.badge}
      title={page.title}
      subtitle={page.subtitle}
      description={page.description}
      heroImage={page.heroImage}
      heroImageAlt={page.heroImageAlt}
      beforeAfter={beforeAfter}
      benefits={page.benefits}
      steps={page.steps}
      faqs={page.faqs}
      relatedServices={page.relatedServices}
    />
  );
}
