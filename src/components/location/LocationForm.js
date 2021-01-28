import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { LocationContext } from "../location/LocationProvider";

import "./location.css";

export const LocationForm = () => {
  const { addLocation, getLocationById, updateLocation } = useContext(
    LocationContext
  );
  const { locations, getLocations } = useContext(LocationContext);

  /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

  const [location, setLocation] = useState({
    name: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const { locationId } = useParams();
  const history = useHistory();

  /*
   Reach out to the world and get customers state
   and locations state on initialization.
   */

  useEffect(() => {
    getLocations().then(() => {
      if (locationId) {
        getLocationById(locationId).then((place) => {
          setLocation(place);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  //when a field changes, update state. The return will re-render and display based on the values in state
  // NOTE! What's happening in this function can be very difficult to grasp. Read it over many times and ask a lot questions about it.
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
    const newLocation = { ...location };
    let selectedVal = event.target.value;
    // forms always provide values as strings. But we want to save the ids as numbers. This will cover both customer and location ids
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal);
    }
    /* Animal is an object with properties.
        Set the property to the new value
        using object bracket notation. */
    newLocation[event.target.id] = selectedVal;
    // update state
    setLocation(newLocation);
  };

  const handleClickSaveLocation = (event) => {
    const locationName = document.getElementById("name");
    const locationAddress = document.getElementById("address");

    if (locationName === "" || locationAddress === "") {
      window.alert("Please enter a location");
    } else {
      setIsLoading(true);

      if (locationId) {
        updateLocation({
          id: location.id,
          name: location.name,
          address: location.address,
        }).then(() => history.push(`/locations/detail/${location.id}`));
      } else {
        addLocation({
          id: location.id,
          name: location.name,
          address: location.address,
        });
      }
    }

    const locationId = parseInt(location.Id);

    if (locationId === 0) {
      window.alert("Please selet a location");
    } else {
      location.Id = locationId;

      //invoke addAnimal passing animal as an argument.
      //once complete, change the url and display the animal list
      addLocation(location).then(() => history.push("/locations"));
    }
  };

  return (
    <form className="locationForm">
      <h2 className="locationForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Location name:</label>
          <input
            type="text"
            id="name"
            onChange={handleControlledInputChange}
            required
            autoFocus
            className="form-control"
            placeholder="Location name"
            value={location.name}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="address">Location address:</label>
          <input
            type="text"
            id="address"
            onChange={handleControlledInputChange}
            required
            autoFocus
            className="form-control"
            placeholder="Location address"
            value={location.address}
          />
        </div>
      </fieldset>

      <button
        className="btn btn-primary"
        disabled={isLoading}
        onClick={(event) => {
          event.preventDefault();
          handleClickSaveLocation();
        }}
      >
        {locationId ? "Save Location" : "Add Location"}
      </button>
    </form>
  );
};
