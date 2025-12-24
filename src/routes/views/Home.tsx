import React from "react";
import { Users, FolderPlus, FileText } from "lucide-react";

import StudentiTable from "./../views/vizualizari/studenti";
import TemeTable from "./../views/vizualizari/teme";
import PredariTable from "./../views/vizualizari/predari";

import InserareStudeti from "./../views/inserare/inserare_studenti";
import InserareTeme from "./../views/inserare/inserare_teme";
import InserarePredari from "./../views/inserare/inserare_predari";

import PredariDetaliateTable from "./../views/predari_detaliate";

const Home = () => {
  const [active, setActive] = React.useState("studentiv");

  return (
    <div className="flex h-screen bg-white">
      <aside className="w-64 border-r border-pink-500 flex flex-col">
        <div className="bg-pink-100 px-6 py-5 text-xl font-bold text-pink-600 border-b">
          Studenți/Teme
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 text-sm">
          <p className="px-3 pt-2 text-xs font-semibold text-gray-400 uppercase">
            Vizualizare
          </p>

          <button
            onClick={() => setActive("predarij")}
            className={`sidebar-btn ${
              active === "predarij" && "active"
            }`}>
            <FileText size={18} />
            Predări detaliate
          </button>


          <button
            onClick={() => setActive("studentiv")}
            className={`sidebar-btn ${
              active === "studentiv" && "active"
            }`}
          >
            <Users size={18} />
            Studenți
          </button>

          <button
            onClick={() => setActive("proiectev")}
            className={`sidebar-btn ${
              active === "proiectev" && "active"
            }`}
          >
            <FolderPlus size={18} />
            Teme
          </button>

          <button
            onClick={() => setActive("inscrieriv")}
            className={`sidebar-btn ${
              active === "inscrieriv" && "active"
            }`}>
            <Users size={18} />
            Predări
          </button>

          <p className="px-3 pt-6 text-xs font-semibold text-gray-400 uppercase">
            Inserare
          </p>

          <button
            onClick={() => setActive("studentii")}
            className={`sidebar-btn ${
              active === "studentii" && "active"
            }`}>
            <Users size={18} />
            Student
          </button>

          <button
            onClick={() => setActive("proiectei")}
            className={`sidebar-btn ${
              active === "proiectei" && "active"
            }`}>
            <FolderPlus size={18} />
            Temă
          </button>

          <button
            onClick={() => setActive("inscrierii")}
            className={`sidebar-btn ${
              active === "inscrierii" && "active"
            }`}>
            <Users size={18} />
            Predare
          </button>
        </nav>
      </aside>

      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="max-w-1xl mx-auto p-6">
          {active === "studentiv" && <StudentiTable />}
          {active === "proiectev" && <TemeTable />}
          {active === "inscrieriv" && <PredariTable />}
          {active === "studentii" && <InserareStudeti />}
          {active === "proiectei" && <InserareTeme />}
          {active === "inscrierii" && <InserarePredari />}
          {active === "predarij" && <PredariDetaliateTable />}
          </div>
      </div>
    </div>
  );
};

export default Home;
