import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioPage from "./pages/PortfolioPage";
import PropertyPage from "./pages/PropertyPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/:propertyId" element={<PropertyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
