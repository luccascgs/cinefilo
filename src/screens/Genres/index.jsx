import React, { useState, useEffect } from "react";
import { Container } from "./style";
import { register } from "swiper/element/bundle";
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
      <swiper-container>
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
      </swiper-container>
    </Container>
  );
}
