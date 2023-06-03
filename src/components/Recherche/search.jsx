import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RestaurantList from './List/list';
import RestaurantMap from './Map/map';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 


const RestaurantSearch = () => {
  const [routes, setRoutes] = useState([]);

  const [restaurants, setRestaurants] = useState([]);
  const [nom, setNom] = useState("");
  const [serieId, setSerieId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [villeId, setVilleId] = useState("");
  const [datav, setVilles] = useState([]);
  const [dataz, setZones] = useState([]);
  const [datas, setSeries] = useState([]);




  useEffect(() => {
    fetch('https://api-localisationrestaurant-production.up.railway.app/api/villes')
      .then(response => response.json())
      .then(data => setVilles(data))
      .catch(error => console.error(error));
  }, []);
  
  useEffect(() => {
    fetch('https://api-localisationrestaurant-production.up.railway.app/api/series')
      .then(response => response.json())
      .then(data => setSeries(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    axios.get('https://api-localisationrestaurant-production.up.railway.app/api/restaurants')
      .then(response => setRestaurants(response.data))
      .catch(error => console.log(error));
  }, []);


  const chargeZoneByVille = (event) => {
    const selectedValue = event.target.value;
    setVilleId(selectedValue);

    fetch(`https://api-localisationrestaurant-production.up.railway.app/api/zones/${selectedValue}`)
        .then(response => response.json())
        .then(data => setZones(data))
        .catch(error => console.error(error));
    
  };


  

  const filteredRestaurants = restaurants.filter(r =>

    (nom === '' || r.nom.toLowerCase().includes(nom.toLowerCase())) &&
    (zoneId === '' || r.zone.id_Zone === parseInt(zoneId)) &&
    (serieId === '' || r.serie.id_Serie === parseInt(serieId)) &&
    (villeId === '' || r.zone.ville.id_Ville === parseInt(villeId))
  );

  const handleRouteData = (data) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        // Access restaurant's latitude and longitude
        const { latitude: restaurantLat, longitude: restaurantLng } = data;
        // Calculate the route or perform other necessary actions
        // Here's an example using the Mapbox Directions API to get the route
        const accessToken = 'pk.eyJ1IjoiemFrYXJpYWUzOCIsImEiOiJjbGhkdm9yb3gwbHBwM2VtaHc0enN6MGN5In0.uxB11aod30dsqUyYwAqLWQ';
        const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLng},${userLat};${restaurantLng},${restaurantLat}?alternatives=false&geometries=geojson&overview=full&steps=false&access_token=${accessToken}`;
  
        // Send a request to the Directions API
        axios
          .get(apiUrl)
          .then((response) => {
            const routeData = response.data;
            console.log(routeData);
            console.log(routeData.routes[0].geometry.coordinates);

            const randomNumber = Math.floor(Math.random() * 99999);
            
            
            const routeCoordinates = routeData.routes[0].geometry.coordinates;
              const lineString = {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: routeCoordinates,
                },
                properties: {},
              };

              
              const mapLayers = map.current.getStyle().layers;
              
                // Iterate through each layer and remove if it's of type "line"
                mapLayers.forEach((layer) => {
                  if (layer.type === 'line' && layer.id!=randomNumber+"") {
                    map.current.removeLayer(layer.id);
                  }
                });
                map.current.addLayer({
                  id: randomNumber+"loc",
                  type: 'circle',
                  source: {
                    type: 'geojson',
                    data: {
                      type: 'FeatureCollection',
                      features: [
                        {
                          type: 'Feature',
                          geometry: {
                            type: 'Point',
                            coordinates: [userLng, userLat],
                          },
                          
                        },
                      ],
                    },
                  },
                  paint: {
                    'circle-radius': 7,
                    'circle-color': '#0074D9',
                  },
                });
              // Add the route to the map
              map.current.addLayer({
                id: randomNumber+"",
                type: 'line',
                source: {
                  type: 'geojson',
                  data: lineString,
                },
                paint: {
                  'line-color': '#0074D9',
                  'line-width': 4,
                },
              });

              // clean up on unmount
    


          })
          .catch((error) => {
            console.log('Error fetching route:', error);
          });
      },
      (error) => {
        // Handle error case
        console.log('Error getting user location:', error.message);
      }
    );

  };






  ///////////////////////////////////////////////////////////////////

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiemFrYXJpYWUzOCIsImEiOiJjbGhkdm9yb3gwbHBwM2VtaHc0enN6MGN5In0.uxB11aod30dsqUyYwAqLWQ';

    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-8.019517, 31.656066], // set the initial map center
      zoom: 10, // set the initial map zoom level
    });

    const markerElement = document.createElement('div');
      markerElement.className = 'marker';
    // add restaurant markers to the map
    
    map.current.on('load', () => {
      restaurants.forEach((restaurant) => {
        // create a DOM element for the marker
        
        map.current.addLayer({
          id: restaurant.nom,
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [restaurant.longitude, restaurant.latitude],
                  },
                  properties: {
                    title: restaurant.nom,
                    description: restaurant.adresse,
                  },
                },
              ],
            },
          },
          paint: {
            'circle-radius': '#0074D9',
            'circle-color': '#f00',
          },
        });

      });

    
      
      
      
    });

    // clean up on unmount
    return () => {
      map.current.remove();
      map.current = null;
    };
  }, [[restaurants]]);


  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
        <div className="form-group">
          <label htmlFor="adresse">Nom Restaurant:</label>
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
            onChange={chargeZoneByVille}
          >
            <option value="">Select a ville</option>
            {datav.map((item) => (
              <option key={item.id_Ville} value={item.id_Ville}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="zoneId">Zone:</label>
          <select
            className="form-control"
            id="zoneId"
            value={zoneId}
            onChange={(event) => setZoneId(event.target.value)}
          >
            <option value="">Select a zone</option>
            {dataz.map((item) => (
              <option key={item.id_Zone} value={item.id_Zone}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="serieId">Serie:</label>
          <select
            className="form-control"
            id="serieId"
            value={serieId}
            onChange={(event) => setSerieId(event.target.value)}
          >
            <option value="">Select a serie</option>
            {datas.map((item) => (
              <option key={item.id_Serie} value={item.id_Serie}>
                {item.nom}
              </option>
            ))}
          </select> 
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4 col-sm-12' >
          <RestaurantList restaurants={filteredRestaurants} selectedRestaurant={handleRouteData}/>
        </div>
        <div className='col-md-8 col-sm-12'>
          {/* <RestaurantMap  restaurants={filteredRestaurants} routes={routes} />  */}
          <div ref={mapContainer} style={{height:'70vh'}} className="map-container" />;
        </div>
      </div>
    </div>
  );
};

export default RestaurantSearch;
