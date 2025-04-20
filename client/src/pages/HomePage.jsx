import VideoHero from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import TopDestinations from "../components/TopDestinations";

const HomePage = () => {
  return (
    <div>
      <VideoHero />
      <CategorySection />
      <TopDestinations /> {/* 👈 Add here */}
    </div>
  );
};

export default HomePage;
