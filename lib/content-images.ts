import { getSiteContent } from "@/lib/site-content";

export function getContentImages() {
  const { images } = getSiteContent();
  return {
    hero: { src: images.hero, alt: images.heroAlt },
    chemisageBefore: { src: images.chemisageBefore, alt: images.chemisageBeforeAlt },
    chemisageAfter: { src: images.chemisageAfter, alt: images.chemisageAfterAlt },
    logo: images.logo,
  };
}
