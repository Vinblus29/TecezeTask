import "./App.css";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PriceForm from "./components/PriceForm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quote" element={<PriceForm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
