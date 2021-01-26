import React, { useContext, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { EmployeeContext } from "./EmployeeProvider"
import { LocationContext } from "../location/LocationProvider"

import { EmployeeCard } from "./EmployeeCard"
import "./employee.css"

export const EmployeeList = () => {
  // This state changes when `getEmployees()` is invoked below
  const { employees, getEmployees } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("EmployeeList: useEffect - getEmployees")
    getLocations()
    .then(getEmployees)

  }, [])


  const history = useHistory()

  return (
    <>

      <h2>Employees</h2>
        <button onClick={() => {history.push("/employees/create")}}>
          New Employee
        </button>
    
    <div className="employees">
      {console.log("EmployeeList: Render", employees)}
      {
        employees.map(employee => {
         
          return <EmployeeCard key={employee.id} employee={employee}  />
        })
      }
    </div>
    </>
  )
}