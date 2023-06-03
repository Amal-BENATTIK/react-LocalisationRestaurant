import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ZoneForm = () => {
  const { id } = useParams();

  const [nom, setNom] = useState("");
  const [villeId, setVilleId] = useState("");
  const [data, setVilles] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    axios
    .get(`https://api-localisationrestaurant-production.up.railway.app/api/zones/get/${id}`)
    .then((response) => {

      const serieData = response.data;
      setNom(serieData.nom);
      setVilleId(serieData.ville.id_Ville);

      
    })
    .catch((error) => {
    });
}, []);

  useEffect(() => {
    fetch('https://api-localisationrestaurant-production.up.railway.app/api/villes')
      .then(response => response.json())
      .then(data => setVilles(data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`https://api-localisationrestaurant-production.up.railway.app/api/zones/${id}/${nom}/${villeId}`).then(() => {
    navigate("/Zones");
     })
      .catch(error => console.error(error));
  };

  

  return (
    <div className="container">
      <h2 className="mt-5">Create Zone</h2>
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
        <div className="form-group">
          <label htmlFor="ville">Ville:</label>
          <select
            className="form-control"
            id="ville"
            value={villeId}
            onChange={(event) => setVilleId(event.target.value)}
          >
            <option value="">Select a ville</option>
            {data.map((item) => (
              <option key={item.id_Ville} value={item.id_Ville} selected={item.id_Ville===villeId}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Edit
        </button>
      </form>
    </div>
  );
};

export default ZoneForm;
