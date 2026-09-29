import { getSiteContent } from "@/lib/site-content";
import { getLogoFullUrl, getLogoMarkUrl } from "@/lib/logo";

export function getContentImages() {
  const { images } = getSiteContent();
  const logoFull = getLogoFullUrl(images.logo);
  const logoMark = getLogoMarkUrl(images.logo);
  return {
    hero: { src: images.hero, alt: images.heroAlt },
    chemisageBefore: { src: images.chemisageBefore, alt: images.chemisageBeforeAlt },
    chemisageAfter: { src: images.chemisageAfter, alt: images.chemisageAfterAlt },
    logo: logoFull,
    logoFull,
    logoMark,
  };
}
