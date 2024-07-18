import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import "./searchbar.css"

interface City {
  latitude: number;
  longitude: number;
  name: string;
  countryCode: string;
}

interface SearchData {
  value: string;
  label: string;
}

interface SearchProps {
  onSearchChange: (searchData: SearchData) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<SearchData | null>(null);

  const loadOptions = (inputValue: string) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city: City) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData: SearchData | null) => {
    setSearch(searchData);
    if (searchData) {
      onSearchChange(searchData);
    }
  };

  return (
    <AsyncPaginate 
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
