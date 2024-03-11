import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManagerPage from "./pages/MangerPage";
import LoginPage from "./pages/LoginPage";
import SelectRoom from './pages/SelectRoom'
import EcgPage from './pages/EcgPage';
import ReceptionPage from './pages/ReceptionPage'
import DoctorPage from './pages/DoctorPage'
import TriagePage from './pages/TriagePage'
import TreatmentPage from './pages/TreatmentPage'
import PatientEnter from './PatientEnter/patientEnter'
import MonitorPage from './pages/MonitorPage'
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="manager" element={<ManagerPage />} />
        <Route path="selectRoom" element={<SelectRoom />} />
        <Route path="reception" element={<ReceptionPage />} />
        <Route path="doctor" element={<DoctorPage />} />
        <Route path="treatment" element={<TreatmentPage />} />
        <Route path="triage" element={<TriagePage />} />
        <Route path="ecg" element={<EcgPage />} />
        <Route path="patientEnter" element={<PatientEnter />} />
        <Route path="monitor" element={<MonitorPage />} />




      </Routes>
    </BrowserRouter>
  );
}
export default App;


