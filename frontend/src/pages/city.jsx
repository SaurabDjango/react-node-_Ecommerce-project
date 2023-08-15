import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
//import { removeCart, incrementQuantity } from '../redux/cartSlice'
import { useSelector } from "react-redux";

function CitySelector() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const cartCount = useSelector((state) => state.cart.incrementQuantity);
  console.log("=====",cartCount)

  useEffect(() => {
    console.log(selectedCountry);
    console.log(selectedCountry?.isoCode);
    console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);

  const handleSubmit = () => {
    // Prepare the data to be sent to the backend
    const data = {
      country: selectedCountry?.name,
      state: selectedState?.name,
      city: selectedCity?.name
    };
    console.log("======",data);

    // Make an HTTP request to the backend server (example using fetch)
    fetch('/api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        // Handle the response from the server if needed
        console.log(result);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  return (
    <>
      <div className="col-12">
        <Select
          options={Country.getAllCountries()}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          value={selectedCountry}
          onChange={(item) => setSelectedCountry(item)}
        />
      </div>

      <Select
        options={selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : []}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        value={selectedState}
        onChange={(item) => setSelectedState(item)}
      />
      <Select
        options={
          selectedState
            ? City.getCitiesOfState(selectedState.countryCode, selectedState.isoCode)
            : []
        }
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        value={selectedCity}
        onChange={(item) => setSelectedCity(item)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default CitySelector;
