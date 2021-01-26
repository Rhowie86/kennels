import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./employee.css"
import { useParams, useHistory } from "react-router-dom"

export const EmployeeDetail = () => {
    const { getEmployeeById } = useContext(EmployeeContext)

    const  [ employee, setEmployee ] = useState({})

    const {employeeId} = useParams()
    
    useEffect(() => {
        getEmployeeById(employeeId)
        .then((res) => {
            setEmployee(res)
        })
    }, [])

    
    return (
        <section className="employee">
            <h3 className="employee__name">{employee.name}</h3>
            
            <div className="employee__location">{employee.location?.name}</div>
        </section>
    
    )
}
