import React, { useState, useEffect } from "react";
import { Container, SwiperContainer } from "./style";
import { GenreCard } from "../../components/GenreCard";
import { Pagination } from "swiper/modules";
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
  useEffect(() => {
    document.title = "Cinéfilo: Gêneros";
    const handleResize = () => {
      setHeight(window.innerHeight - 50);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container style={{ height: height }}>
      <SwiperContainer
        slides-per-view="1.3"
        space-between={32}
        centered-slides={true}
        rewind={true}
        mousewheel-force-to-axis={true}
        keyboard="true"
        grab-cursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        <GenreCard
          title="Geral"
          link="/"
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
