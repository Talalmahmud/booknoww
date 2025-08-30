import FeaturedProperties from "@/components/shared/feature-properties";
import Header from "@/components/shared/header";
import Hero from "@/components/shared/hero";
import WeeklyDeals from "@/components/shared/offer";
import WelcomePack from "@/components/shared/welcome-pak";

export default function Home() {
  return (
    <div className=" w-full">
      <Header />
      <Hero />
      <WeeklyDeals />
      <WelcomePack />

      <FeaturedProperties />
    </div>
  );
}
