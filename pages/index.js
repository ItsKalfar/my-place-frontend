import { Toaster } from "react-hot-toast";
import BrowseByCategories from "../components/BrowseByCategories";
import CreateNft from "../components/CreateNft";
import HeroSection from "../components/HeroSection";
import LatestNft from "../components/LatestNft";

export default function Home() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <HeroSection />
      <LatestNft />
      <CreateNft />
      <section className="container mx-auto p-6">
        <h1>get the best prices</h1>
      </section>
      <BrowseByCategories />
    </div>
  );
}
