import React, { useState , useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SpecialiteForm = () => {
  const [nom, setNom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("https://api-localisationrestaurant-production.up.railway.app/api/villes", { nom }).then(() => {
      navigate("/Villes");
    });
  };

  return (
    <div className="container">
      <h2 className="mt-5" >Create Ville </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default SpecialiteForm;
