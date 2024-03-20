import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "../layout/Body";
import DailyScreen from "../screens/DailyScreen";
import GeneresScreen from "../screens/Generes";

export default function RouterRoot() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Body />} path="/">
          <Route element={<DailyScreen />} path="/" />
          <Route element={<GeneresScreen />} path="/generos" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
