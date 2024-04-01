import React, { useState, useEffect } from "react";
import { Container, SwiperContainer } from "./style";
import { GenreCard } from "../../components/GenreCard";
import { Pagination } from "swiper/modules";
import { register } from "swiper/element/bundle";
import { GeneralIcon, HorrorIcon } from "../../assets/svg/genres";
register();

export default function GenresScreen() {
  const [height, setHeight] = useState(window.innerHeight - 50);
  useEffect(() => {
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
        slidesPerView={1.3}
        spaceBetween={32}
        centeredSlides={true}
        rewind={true}
        breackpoints={{
          600: {
            slidesPerView: 4.3,
          },
        }}
        mousewheel-invert={false}
        keyboard={{
          enabled: true,
          onlyInViewport: false,
        }}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        <GenreCard title="GERAL" link="/" icon={GeneralIcon} />
        <GenreCard title="TERROR" link="/" icon={HorrorIcon} />
      </SwiperContainer>
    </Container>
  );
}
