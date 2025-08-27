import FeaturedProperties from "@/components/shared/feature-properties";
import Hero from "@/components/shared/hero";
import WeeklyDeals from "@/components/shared/offer";
import WelcomePack from "@/components/shared/welcome-pak";

export default function Home() {
  return (
    <div className=" w-full">
      <Hero />
      <WeeklyDeals />
      <WelcomePack />

      <FeaturedProperties />
    </div>
  );
}
