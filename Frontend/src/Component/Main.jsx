import React from 'react'
import { useEffect } from 'react'
import { useDispatch , useSelector } from "react-redux"
import { getRequest } from '../Redux/Operators/action'

export default function Main() {
    const itemArray = useSelector((state) => state.operatorReducer.vehicleArray)
    const dispatch = useDispatch()
    console.log(itemArray)
    useEffect(() => {
        dispatch(getRequest())
    }, [])
    return (
        <div className='container-fluid'>
             <div className="row">
                    <div className="col-12 " style={{border:'1px solid black'}}>
                      <div className="row">
                            <div className="col-9 d-flex align-self-center">
                                <h1>
                                    <i className="fas fa-house-damage"></i>
                                </h1>
                            </div>
                            <div className="col-3 d-flex align-self-center justify-content-between">
                                
                            </div>
                      </div>
                    </div>
                </div>
        </div>
    )
}
