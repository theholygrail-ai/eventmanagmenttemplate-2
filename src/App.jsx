import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import HomePage from "./pages/HomePage";
import ProgramsPage from "./pages/ProgramsPage";
import ResultsPage from "./pages/ResultsPage";
import ApplyPage from "./pages/ApplyPage";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/apply" element={<ApplyPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
