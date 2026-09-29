import Header from "./Header";
import { getContentImages } from "@/lib/content-images";

export default function SiteHeader() {
  const { logoFull } = getContentImages();
  return <Header logoSrc={logoFull} />;
}
