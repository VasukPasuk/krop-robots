import React from 'react';
import './style.scss';
import {
  CarouselBlock,
  IntroductionBlock,
  LetsViewMoreAboutSumoBlock,
  MembersBlock,
  SanctionsBlock,
  SumoIntroductionBlock,
  SumoStagesBlock,
  SumoZonesBlock,
  TimeToRepair
} from "@/custom-components/ui/MainPageBlocks";
import Header from "@/custom-components/ui/Header/Header";
import Footer from "@/custom-components/ui/Footer/Footer";


function Page() {
  return (
    <>
      <Header/>
      <IntroductionBlock/>
      <CarouselBlock/>
      <MembersBlock/>
      <SumoIntroductionBlock/>
      <SumoZonesBlock/>
      <SumoStagesBlock/>
      <SanctionsBlock/>
      <TimeToRepair/>
      <LetsViewMoreAboutSumoBlock/>
      <Footer/>
    </>
  );
}

export default Page;