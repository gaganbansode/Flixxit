import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MoviesDetails } from "./pages/MoviesDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/moviesdetails/:id" element={<MoviesDetails />} />
      </Routes>
    </>
  );
}

export default App;
