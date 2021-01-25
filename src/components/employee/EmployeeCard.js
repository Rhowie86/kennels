import React from "react"
import "./employee.css"

export const EmployeeCard = ({employee, location}) => (
    <section className="employee">
        <h3 className="employee__name">{employee.name}</h3>
        <div className="employee__kennel">{location.name}</div>
    </section>
)