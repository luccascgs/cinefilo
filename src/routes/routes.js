import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "../layout/Body";
import DailyScreen from "../screens/DailyScreen";
import GenresScreen from "../screens/Genres";

export default function RouterRoot() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Body />} path="/">
          <Route element={<DailyScreen />} path="/" />
          <Route element={<GenresScreen />} path="/generos" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
