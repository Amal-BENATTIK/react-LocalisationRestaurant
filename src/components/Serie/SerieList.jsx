import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SerieList = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8082/api/series").then((response) => {
        setSeries(response.data);
    })
    
    .catch(error => {
        console.log(error.message);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this serie?")) {
      axios.delete(`http://localhost:8082/api/series/${id}`).then(() => {
        setSeries(series.filter((serie) => serie.id_Serie !== id));
      });
    }
  };

  

  return (
    <div className="table-responsive">
    <div className="container mt-4">
      <h2 > Serie List</h2>
      <Link to="/create-serie" className="btn btn-primary mt-2 mb-3">
        Create  Serie
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
          {series.map((serie) => (
            <tr key={ serie.id_Serie}>
              <td>{ serie.id_Serie}</td>
              <td>{ serie.nom}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete( serie.id_Serie)}>
                  Delete
                </button>
                <Link to={`/edit-serie/${serie.id_Serie}`} className="btn btn-primary">
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

export default  SerieList;
