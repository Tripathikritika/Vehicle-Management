import { useParams } from 'react-router-dom'
import {useSelector} from 'react-redux'
import React from 'react'


export default function Descripton() {
    const params = useParams()
    let StateitemArray = useSelector((state) => state.operatorReducer.vehicleArray)
    let findItem = StateitemArray.find((item) => item.name === params.name)
    console.log(findItem)
    return (
        <div className="p-3 border text-center">
            <p>Name: <b>{findItem.name}</b> </p>
            <p>No of trips: <b>{findItem.vehicle_trips.length}</b> </p>
        </div>
    )
}
