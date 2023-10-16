import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MoviesDetails } from "./pages/MoviesDetails";
import { CategoryWiseList } from "./pages/CategoryWiseList";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Wishlist } from "./pages/Wishlist";
import { Subscription } from "./pages/Subscription";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/moviesdetails/:id" element={<MoviesDetails />} />
        <Route path="/category/:id/:catname" element={<CategoryWiseList />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </>
  );
}

export default App;
