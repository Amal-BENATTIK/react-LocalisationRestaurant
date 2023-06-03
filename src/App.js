import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect, useNavigate  } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import SpecialiteList from './components/Specialite/SpecialiteList';
import SpecialiteForm from './components/Specialite/SpecialiteForm';
import VilleList from './components/Ville/VilleList';
import VilleForm from './components/Ville/VilleForm';
import SerieForm from './components/Serie/SerieForm';
import SerieList from './components/Serie/SerieList';
import ZoneForm from './components/Zone/ZoneForm';
import ZoneList from './components/Zone/ZoneList';
import 'bootstrap/dist/css/bootstrap.min.css';
import RestaurantForm from './components/Restaurant/RestaurantForm';
import RestaurantList from './components/Restaurant/RestaurantList';
import Search from './components/Recherche/search';
import RestaurantEditForm from './components/Restaurant/RestaurantFormEdit';
import SerieEditForm from './components/Serie/SerieFormEdit';
import VilleEditForm from './components/Ville/VilleFormEdit';
import SpecialiteEditForm from './components/Specialite/SpecialiteFormEdit';
import ZoneEditForm from './components/Zone/ZoneFormEdit';
import LoginForm from './components/LoginForm';


function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setUserIsLoggedIn(false);
    window.location.replace("http://localhost:3000/");

  };
  return (
    <Router>
      <Header userIsLoggedIn={userIsLoggedIn} handleLogout={handleLogout} />
      <div className="main-wrapper">
        <Routes>
          {userIsLoggedIn ? (
            <>
              <Route path="/edit-restaurant/:id" element={<RestaurantEditForm />} />
              <Route path="/edit-serie/:id" element={<SerieEditForm />} />
              <Route path="/edit-ville/:id" element={<VilleEditForm />} />
              <Route path="/edit-specialite/:id" element={<SpecialiteEditForm />} />
              <Route path="/edit-zone/:id" element={<ZoneEditForm />} />

              <Route path="/Specialites" element={<SpecialiteList />} />
              <Route path="/create-Restaurant" element={<RestaurantForm />} />
              <Route path="/Restaurants" element={<RestaurantList />} />
              <Route path="/create-Specialite" element={<SpecialiteForm />} />
              <Route path="/Villes" element={<VilleList />} />
              <Route path="/create-Ville" element={<VilleForm />} />
              <Route path="/Series" element={<SerieList />} />
              <Route path="/create-Serie" element={<SerieForm />} />
              <Route path="/Zones" element={<ZoneList />} />
              <Route path="/create-Zone" element={<ZoneForm />} />
            </>
          ) : (
            <Route
              path="/Login"
              element={<LoginForm setUserIsLoggedIn={setUserIsLoggedIn} />}
            />
          )}
          <Route path="/" element={<Search />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
