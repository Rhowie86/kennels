import React, { useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalCard } from "./AnimalCard"
import "./Animal.css"


export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals } = useContext(AnimalContext)
  const { locations, getLocations} = useContext(LocationContext)
  const { customers, getCustomers } = useContext(CustomerContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("AnimalList: useEffect - getAnimals")
    getLocations()
    .then(getCustomers)
    .then(getAnimals)

  }, [])




  const history = useHistory()

  return (
      <>
            <h2>Animals</h2>
                <button onClick={() => {history.push("/animals/create")}}>
                    Add Animal
                </button>

                <div className="animals">
                {
        animals.map(animal => {
            const owner = customers.find(c => c.id ===animal.customerId)
            const clinic = locations.find(l => l.id === animal.locationId)
          return <AnimalCard key={animal.id} 
                    animal={animal}
                    customer={owner}
                    location={clinic}
                     />
        })
      }

                </div>
    </>
 )
}