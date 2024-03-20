import React, { useState, useEffect } from "react";
import Overlay from "../../components/Overlay";
import { Container } from "./style";

export default function GeneresScreen() {
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
      <Overlay />
    </Container>
  );
}
