import VideoHero from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import TopDestinations from "../components/TopDestinations";
import HomeReviewSection from "../components/HomeReviewSection"


<HomeReviewSection />


const HomePage = () => {
  return (
    <div>
      <VideoHero />
      <CategorySection />
      <TopDestinations /> {/* 👈 Add here */}
      <HomeReviewSection />
    </div>
  );
};

export default HomePage;
