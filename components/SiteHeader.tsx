import Header from "./Header";
import { getContentImages } from "@/lib/content-images";

export default function SiteHeader() {
  const { logoMark } = getContentImages();
  return <Header logoSrc={logoMark} />;
}
