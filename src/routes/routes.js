import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "../layout/Body";
import DailyScreen from "../screens/DailyScreen";
import GenresScreen from "../screens/Genres";
import AdminScreen from "../screens/AdminScreen";
import FormScreen from "../screens/FormScreen";
import LoginScreen from "../screens/LoginScreen";
import AdminBody from "../layout/AdminBody";

export default function RouterRoot() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Body />} path="/">
          <Route element={<DailyScreen />} path="/" />
          <Route element={<LoginScreen />} path="/login" />
          <Route element={<GenresScreen />} path="/generos" />
        </Route>
        <Route element={<AdminBody />} path="/admin">
          <Route element={<AdminScreen />} path="/admin" />
          <Route element={<FormScreen />} path="/admin/form" />
          <Route element={<FormScreen />} path="/admin/form/:id" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
