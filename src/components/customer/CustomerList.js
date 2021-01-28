import React, { useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import { CustomerCard } from "./CustomerCard"
import { useHistory } from "react-router-dom"
import "./customer.css"

export const CustomerList = () => {
  // This state changes when `getCustomers()` is invoked below
  const { customers, getCustomers } = useContext(CustomerContext)

  const history = useHistory()
  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("CustomerList: useEffect - getCustomers")
    getCustomers()

  }, [])


  return (
    <div className="customers">
      {console.log("CustomerList: Render", customers)}
      {
        customers.map(person => {
          return <CustomerCard key={person.id} customer={person} />
        })
      }
       <button onClick={() => {history.push("/")}}>
                Back
            </button>
    </div>
    
    
    
  )
}