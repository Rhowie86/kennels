import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "./EmployeeProvider"
import "./employee.css"

export const EmployeeForm = () => {
    const { addEmployee } = useContext(EmployeeContext)
    
    const { locations, getLocations } = useContext(LocationContext)
    

      /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

    const [employee, setEmployee] = useState({
        name:"",
        locationId: 0,
    });

    
    const history = useHistory();
    
    /*
   Reach out to the world and get customers state
   and locations state on initialization.
   */

    useEffect(() => {
        getLocations()
    }, [])


      //when a field changes, update state. The return will re-render and display based on the values in state
        // NOTE! What's happening in this function can be very difficult to grasp. Read it over many times and ask a lot questions about it.
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newEmployee = { ...employee }
        let selectedVal = event.target.value
        // forms always provide values as strings. But we want to save the ids as numbers. This will cover both customer and location ids
        if (event.target.id.includes("Id")) {
          selectedVal = parseInt(selectedVal)
        }
        /* Animal is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newEmployee[event.target.id] = selectedVal
        // update state
        setEmployee(newEmployee)
      }

    const handleClickSaveEmployee = (event) => {
        event.preventDefault() //Prevents the browser from submitting the form

        const locationId = parseInt(employee.locationId)
        

        if (locationId === 0){
            window.alert("Please selet a location")
        } else {
            employee.locationId = locationId
            
            //invoke addAnimal passing animal as an argument.
            //once complete, change the url and display the animal list
            addEmployee(employee)
            .then(() => history.push("/employees"))
        }
            
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Employee name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name}/>
                </div>
            </fieldset>
           
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select defaultValue={employee.locationId}  onChange={handleControlledInputChange} name="locationId" id="locationId" className="form-control">
                        <option value="0">Select a location</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
           
            <button className="btn btn-primary"
                onClick={handleClickSaveEmployee}>
                    Save Employee
                </button>
        </form>
    )
}

                        
     