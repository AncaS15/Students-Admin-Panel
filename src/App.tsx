import './App.css'
import Studenti from './routes/views/vizualizari/studenti';
import Teme from './routes/views/vizualizari/teme';
import Predari from './routes/views/vizualizari/predari';
import InserareStudenti from './routes/views/inserare/inserare_studenti';
import InserareTeme from './routes/views/inserare/inserare_teme';
import InserarePredari from './routes/views/inserare/inserare_predari';
import Home from './routes/views/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/vizualizari/studenti" element={<Studenti />} />
          <Route path="/vizualizari/teme" element={<Teme />} />
          <Route path="/vizualizari/predari" element={<Predari />} />
          <Route path="/inserare/inserare_studenti" element={<InserareStudenti />}/>
          <Route path="/inserare/inserare_teme" element={<InserareTeme />}/>
          <Route path="/inserare/inserare_predari" element={<InserarePredari />}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App