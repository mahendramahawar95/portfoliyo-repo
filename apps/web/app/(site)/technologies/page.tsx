import SiteGallery from "../../../components/sites/SiteGallery";
import { sites } from "../../data/sites";

export default function Page() {
  return <SiteGallery sites={sites} />;
}