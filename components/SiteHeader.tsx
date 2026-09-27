import Header from "./Header";
import { getContentImages } from "@/lib/content-images";

export default function SiteHeader() {
  const { logo } = getContentImages();
  return <Header logoSrc={logo || "/logo-round.png"} />;
}
