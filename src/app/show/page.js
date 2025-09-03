"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SchoolCard from "../../components/SchoolCard";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch unique cities
  useEffect(() => {
axios.get("/api/schools")
      .then(res => {
        const uniqueCities = ["All", ...new Set(res.data.map(s => s.city))];
        setCities(uniqueCities);
      })
      .catch(err => console.error("Error fetching cities:", err));
  }, []);

  // Fetch schools when city or search changes
  useEffect(() => {
    let url = "/api/schools?";
    if (selectedCity !== "All") url += `city=${encodeURIComponent(selectedCity)}&`;
    if (searchTerm.trim() !== "") url += `search=${encodeURIComponent(searchTerm)}&`;

    axios.get(url)
      .then(res => setSchools(res.data))
      .catch(err => console.error("Error fetching schools:", err));
  }, [selectedCity, searchTerm]);

  return (
    <div className="page-container">
      <h1>Schools</h1>

      {/* Filters */}
      <div className="filters">
        <div>
          <label>City:</label>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search by school name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Schools Grid */}
      <div className="school-grid">
        {schools.length > 0 ? (
          schools.map(school => (
            <SchoolCard key={school.id} school={school} />
          ))
        ) : (
          <p>No schools found.</p>
        )}
      </div>
    </div>
  );
}
