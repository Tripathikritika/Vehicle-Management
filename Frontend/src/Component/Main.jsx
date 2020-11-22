import React,{useState} from 'react'
import { useEffect } from 'react'
import { useDispatch , useSelector } from "react-redux"
import { Link, Redirect, useHistory } from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { postRequest ,getRequest} from '../Redux/Operators/action'
import { logoutFunction } from '../Redux/LoginRedux/action'
import styles from '../Styling/Home.module.css'
import Pagination from './../../node_modules/@material-ui/lab/Pagination';


function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 500,
        height:550,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    paperRegister: {
        position: "absolute",
        width: 600,
        height:600,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    root: {
        '& > *': {
          margin  : '0px auto',
          width:'80%',
          position:'relative',
        },
    },
    paginationRoot : {
        '& > *': {
            marginTop: theme.spacing(2),
            marginLeft: theme.spacing(80),
          }
    },
}));

export default function Main() {
    const classes = useStyles();
    let StateitemArray = useSelector((state) => state.operatorReducer.vehicleArray)
    const [itemArray , setItemArray] = useState([])
    const [query , setQuery] = useState({name : "" , price : "" , type : "",no_of_passengers:"",image : "",vehicle_trips_to:"",vehicle_trips_from:""})
    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);
    const [sorted,setSort] = useState("")
    const [filter,setFilter] = useState("")
    const [search,setSearch] = useState("")
    const dispatch = useDispatch()
    const stateEmail = useSelector((state) => state.loginReducer.email)
    const isAuth = useSelector((state) => state.loginReducer.isAuth)
    const total = useSelector((state) => state.operatorReducer.total_count)
    const history = useHistory()
    useEffect(() => {
        dispatch(getRequest(stateEmail,1,sorted,filter))
    }, [stateEmail,1,sorted,filter])

    const handlePageChange = ( event , value ) => {
        dispatch(getRequest(stateEmail,value,sorted,filter))
    }
    const handleAddOpen = () => {
        setOpen(true)
    }
    const handleAddClose = () => {
        setOpen(false)
    }
    const handleChange = (e) => {
        setQuery({
            ...query,[e.target.name] : e.target.value
        })
    }
    const handleAddPost = (e) => {
        e.preventDefault()
        dispatch(postRequest({name : query.name , 
            price : query.price , 
            type : query.type,
            no_of_passengers:query.no_of_passengers,
            image : query.image,
            vehicle_trips:[
               { to : query.vehicle_trips_to ,
                from :query.vehicle_trips_from }
            ],
            operators :stateEmail}))
        // console.log(itemArray)
        setOpen(false)
    }
    const body = (
        <div style={{width:'100%',height:'100%',background:'#eceff1',border:'0px solid #eceff1'}}>
            <div style={modalStyle} className={classes.paper}>
            <div className="text-right">
                <h4 onClick={handleAddClose}><i className="fas fa-times"></i></h4>
            </div>
            <div id="simple-modal-description">
                <div  className="p-2">
                   <div className="container">
                       <div className="row">
                           <div className="col-12">
                                <form>
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <input type="text" className="form-control" name="name" onChange = {handleChange} placeholder="Enter the name of the Vehicle" required />
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <input type="text" className="form-control"  name="price" onChange = {handleChange} placeholder="Enter the price of the Vehicle" required />
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>  
                                        <div className="col-md-12 mb-3">
                                            <input type="text" className="form-control" name="type" onChange = {handleChange} placeholder="Enter the type of Vehicle"  />
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <input type="text" className="form-control" name="no_of_passengers" onChange = {handleChange} placeholder="Enter the max no of seats"  />
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <input type="url" className="form-control" name="image" placeholder="Enter the image url of Vehicle" onChange = {handleChange}  />
                                        </div>
                                        <div className = "col-md-12 mb-3">
                                            <input type="text" className="form-control mb-1" name="vehicle_trips_to" onChange = {handleChange} placeholder="Enter the source address"  />
                                            <input type="text" className="form-control mb-1" name="vehicle_trips_from" onChange = {handleChange} placeholder="Enter the destination address"  />
                                        </div>
                                        <div className = "col-md-12 text-center" >
                                            <input type="button" onClick = {handleAddPost} className="btn btn-outline-secondary"  value = "ADD DETAILS"/>
                                        </div>
                                    </div>
                                </form>
                           </div>
                       </div>
                   </div>
                </div>
            </div>
        </div>
        </div>
    );
    useEffect(() => {
        if(search === ""){
            setItemArray(StateitemArray)
        }
        else if(search != ""){
            let filterArray = StateitemArray.filter((item) =>item.registration_id == search )
            setItemArray(filterArray)
        }
    }, [search])
    useEffect(() => {
    setItemArray(StateitemArray)
    }, [StateitemArray])
    const handleDescription = (name) => {
        history.push(`/details/${name}`)
    }
    if(!isAuth){
        return <Redirect to='/'/>
    }   
    return (
        <>
            <div className='container-fluid mb-5'>
                <div className="row" >
                    <div className="col-12 shadow p-3 bg-light rounded" >
                        <div className="row d-flex justify-content-between">
                            <div className="col-4">
                                <h1>
                                    <Link className={`${styles.allIcons}`} to='/'><i className="fas fa-house-damage"></i></Link> 
                                </h1>
                            </div>
                            <div className="col-4 text-center">
                                    <i onClick={handleAddOpen}  className={`fas fa-plus-circle display-4 ${styles.allIcons}`}></i>
                            </div>
                            <div className="col-4 text-right">
                                <h6 className={`${styles.allIcons}`} onClick={() => dispatch(logoutFunction())}><i className = "fas fa-sign-out-alt display-4"></i></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`container p-4 mb-3 ${styles.functionalityDiv}`} >
                <div className="row">
                    <div className="col-12">
                        <div className="row d-flex justify-content-between">
                            <div className={`col-4 text-left d-flex align-self-center`}>
                                <select name="cars" id="cars" onChange={(e) => setSort(e.target.value)} className={`${styles.sortDiv} border border-0`}>
                                    <option value="">Sort By Capacity</option>
                                    <option value="Asc">Asc</option>
                                    <option value="Desc">Desc</option>
                                </select>
                            </div>
                            <div className={`${styles.searchDiv} col-4`}>
                                <div className={`${styles.searchIcon}`}><i class="fas fa-search h5 text-secondary"></i></div>
                                <input type="text" className="p-3 pl-4 rounded border border-0" style={{width:'100%',outline:'none'}} placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
                            </div>
                            <div className={`col-4 align-self-center d-flex justify-content-end `}>
                                <select name="cars" id="cars" onChange={(e) => setFilter(e.target.value)} className={`${styles.sortDiv} border border-0`}>
                                    <option value="">Filter By Type</option>
                                    <option value="Car">Car</option>
                                    <option value="Bus">Bus</option>
                                    <option value="Bike">Bike</option>
                                    <option value="Auto Ricksaw">Auto</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <div>
                <div style = {{ display:'flex',justifyContent:'center'}}>
                    <Pagination count = {Math.ceil(total/3)} variant="outlined" className="text-secondary" onChange = {handlePageChange} />
                </div>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    { itemArray && itemArray.map((item) => ( 
                                        <div className="col-6" >
                                            <div className="card mb-3">
                                                <div className="row no-gutters">
                                                    <div className="col-md-4">
                                                        <img onClick={() =>handleDescription(item.name)} src={item.image} style={{height:'auto'}} className="card-img img-fluid" alt={item.name}/>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body">
                                                            <div className="card-title">Name : <b>{item.name}</b> </div>
                                                            <div className="card-title">Price : <b>₹{item.price}</b> </div>
                                                            <div className="card-title">Type : <b>{item.type}</b> </div>
                                                            <div className="card-title">Capacity : <b>{item.no_of_passengers}</b> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleAddClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {body}
            </Modal>

        </>
    )
}