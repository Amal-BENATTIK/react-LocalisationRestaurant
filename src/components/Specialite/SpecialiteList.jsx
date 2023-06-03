import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SpecialiteList = () => {
  const [specialites, setSpecialites] = useState([]);

  useEffect(() => {
    axios.get("https://api-localisationrestaurant-production.up.railway.app/api/specialites").then((response) => {
        setSpecialites(response.data);
    })
    
    .catch(error => {
        console.log(error.message);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this speciality?")) {
      axios.delete(`https://api-localisationrestaurant-production.up.railway.app/api/specialites/${id}`).then(() => {
        setSpecialites(specialites.filter((specialite) => specialite.id_Specialite !== id));
      });
    }
  };

  

  return (
    <div className="table-responsive">
    <div className="container mt-4">
      <h2 > specialite List</h2>
      <Link to="/create-specialite" className="btn btn-primary mt-2 mb-3">
        Create  specialite
      </Link>
      <table className="table w-auto">
        <thead>
          <tr className="">
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {specialites.map((specialite) => (
            <tr key={ specialite.id_Specialite}>
              <td>{ specialite.id_Specialite}</td>
              <td>{ specialite.nom}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete( specialite.id_Specialite)}>
                  Delete
                </button>
                <Link to={`/edit-specialite/${specialite.id_Specialite}`} className="btn btn-primary">
                Edit
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </div>
  );
};

export default  SpecialiteList;
