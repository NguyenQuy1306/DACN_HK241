import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationSelector = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
  };

  return (
    <div>
      <select
        className="form-select form-select-sm mb-3"
        id="city"
        value={selectedCity}
        onChange={handleCityChange}
        aria-label=".form-select-sm"
      >
        <option value="">Chọn tỉnh thành</option>
        {cities.map((city) => (
          <option key={city.Id} value={city.Id}>
            {city.Name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
