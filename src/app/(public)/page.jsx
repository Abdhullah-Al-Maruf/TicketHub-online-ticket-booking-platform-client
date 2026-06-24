import BannerSlider from "@/components/Home/BannerSlider";
import BenefitsSection from "@/components/Home/BenefitsSection";
import Faq from "@/components/Home/Faq";


import PopularRoutesSection from "@/components/Home/PopularRoutesSection";

export default function Home() {
  return (
    <div>
      <BannerSlider />
      {/* <FeaturedTicketsSection/> */}
      <PopularRoutesSection />
      <BenefitsSection />
     <Faq/>
    </div>
  );
}
