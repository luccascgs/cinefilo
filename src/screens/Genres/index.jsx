import React, { useState, useEffect, useCallback } from "react";
import { Container, SwiperContainer } from "./style";
import { GenreCard } from "../../components/GenreCard";
import { Pagination, Mousewheel } from "swiper/modules";
import { register } from "swiper/element/bundle";
import {
  ActionIcon,
  AdamIcon,
  CartoonIcon,
  ComedyIcon,
  DramaIcon,
  GeneralIcon,
  HorrorIcon,
  ScifiIcon,
  SeriesIcon,
} from "../../assets/svg/genres";
register();

export default function GenresScreen() {
  const [height, setHeight] = useState(window.innerHeight - 50);
  const [width, setWidth] = useState(window.innerWidth);
  const [slidesPerView, setSlidesPerView] = useState(4.3);

  const handleSlidesPerView = useCallback(() => {
    if (width < 800) {
      setSlidesPerView(1.3);
    } else if (width < 1100) {
      setSlidesPerView(2.3);
    } else if (width < 1300) {
      setSlidesPerView(3.3);
    } else {
      setSlidesPerView(4.3);
    }
  }, [width]);

  const handleResize = useCallback(() => {
    setHeight(window.innerHeight - 50);
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    handleSlidesPerView();

    document.title = "Cinéfilo: Gêneros";

    window.addEventListener("resize", handleResize);
  }, [handleSlidesPerView, handleResize]);

  return (
    <Container style={{ height: height }}>
      <SwiperContainer
        slides-per-view={slidesPerView}
        space-between={32}
        centered-slides={true}
        rewind={true}
        mousewheel={true}
        keyboard="true"
        grab-cursor={true}
        pagination={true}
        modules={[Mousewheel, Pagination]}
      >
        <GenreCard
          title="Geral"
          link="/geral"
          icon={GeneralIcon}
          color1="rgb(168, 255, 55)"
          color2="rgb(79, 121, 24)"
        />
        <GenreCard
          title="Terror"
          link="/"
          icon={HorrorIcon}
          color1="#C50C00"
          color2="#2D0300"
        />
        <GenreCard
          title="Séries"
          link="/"
          icon={SeriesIcon}
          color1="#6200DE"
          color2="#0d011e"
        />
        <GenreCard
          title="Adam Sandler"
          link="/"
          icon={AdamIcon}
          color1="#FBE200"
          color2="#262200"
        />
        <GenreCard
          title="Ação"
          link="/"
          icon={ActionIcon}
          color1="#C87539"
          color2="#2D1A0D"
        />
        <GenreCard
          title="Ação"
          link="/"
          icon={ComedyIcon}
          color1="#00DE81"
          color2="#001f12"
        />
        <GenreCard
          title="Animação"
          link="/"
          icon={CartoonIcon}
          color1="#dbb300"
          color2="#442200"
        />
        <GenreCard
          title="Ficção"
          link="/"
          icon={ScifiIcon}
          color1="#3000de"
          color2="#0e0041"
        />
        <GenreCard
          title="Drama"
          link="/"
          icon={DramaIcon}
          color1="#DC2626"
          color2="#2D0300"
        />
      </SwiperContainer>
    </Container>
  );
}
