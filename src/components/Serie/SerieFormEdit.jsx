import React, { useState, useEffect } from "react";
import { useNavigate , useParams} from "react-router-dom";
import axios from "axios";

const SerieForm = () => {
    const { id } = useParams();
  const [nom, setNom] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
      axios
      .get(`http://localhost:8082/api/series/${id}`)
      .then((response) => {

        const serieData = response.data;
        setNom(serieData.nom);

        
      })
      .catch((error) => {
      });
  }, []);


  

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post(`http://localhost:8082/api/series/${id}/${nom}`).then(() => {
      navigate("/Series");
     })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h2 className="mt-5" >Edit Series </h2>
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
          Edit
        </button>
      </form>
    </div>
  );
};

export default SerieForm;
