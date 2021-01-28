import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./location.css"
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
    const { getLocationById } = useContext(LocationContext)

    const  [ location, setLocation ] = useState({})

    const {locationId} = useParams()
    
    useEffect(() => {
        getLocationById(locationId)
        .then((res) => {
            setLocation(res)
        })
    }, [])

    const history = useHistory()
    
    
    return (
        <section className="location">
            <h3 className="location__name">{location.name}</h3>
            
            <div className="location__location">{location.address}</div>
            <div className="location__employees">
                <h2>Employees: </h2>
                <ul>
                {
                    location.employees?.map((person) => {
                        return <li key={person.id}>{person.name}</li>
                    })
                }
                </ul>
                <h2>Animals: </h2>
                <ul>
                {
                    
                    location.animals?.map((pet) => {
                        return <li key={pet.id}>{pet.name}
                        <ul><li>Breed: {pet.breed}</li></ul>
                        </li>
                        
                    
                    })
                }
                </ul> 
              
            </div>
            <button onClick={() => {history.push(`/locations/edit/${location.id}`)}}>
                Edit
            </button>
            <button onClick={() => {history.push("/locations")}}>
                Back
            </button>
        </section>
    
    )
}