import React,{useState} from 'react'
import styles from '../Styling/Home.module.css'
import Fotter from './Fotter'
import LandingPage from '../Component/LandingPage'
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch , useSelector } from "react-redux"
import { useEffect } from 'react';
import { postLogin } from '../Redux/LoginRedux/action'
import { postregister } from '../Redux/RegisterRedux/action'
import { Link } from 'react-router-dom'

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
        width: 600,
        height:400,
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
}));

export default function Home() {
    const classes = useStyles();
    const [queryEmail , setEmailQuery] = useState("")
    const [queryPassword , setPasswordQuery] = useState("")
    const [queryRegister , setRegisterQuery] = useState({fName : "",lName : "",email : "" ,mobile : "", password : "" })
    let [err , setErr] = useState("")
    const [modalStyle] = useState(getModalStyle);
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const isAuth = useSelector((state) => state.loginReducer.isAuth)
    const isRegisterAuth = useSelector((state) => state.registerReducer.isRegisterAuth)
    const stateError = useSelector((state) => state.loginReducer.error)

    const dispatch = useDispatch()

    useEffect(( ) => {
        setErr( stateError)
    }, [stateError])
    const handleSubmit = () => {
        dispatch(postLogin( {email : queryEmail ,password:queryPassword } ))
    }
    const handleRegister = () => {
        dispatch(postregister( {fName :queryRegister.fName ,lName : queryRegister.lName , email : queryRegister.email ,mobile : queryRegister.mobile, password : queryRegister.password }))
    }
    const handleRegisterChange = ( e) => {
        setRegisterQuery( {
            ...queryRegister,
            [e.target.name] : e.target.value
        })
    }
    const handleLoginOpen = () => {
      setLoginOpen(true);
    };
    const handleLoginClose = () => {
      setLoginOpen(false);
    };
    const handleRegisterOpen = () => {
        setRegisterOpen(true);
    };
    const handleRegisterClose = () => {
        setRegisterOpen(false);
    };
    if(isAuth){
        return <Redirect to = '/main'/>
    }
    if(isRegisterAuth){
        return <Redirect to ='/main' />
    }
    const loginBody = (
        <div style={modalStyle} className={classes.paper}>
            <div className="text-right">
                <h2 onClick={handleLoginClose}><i className="fas fa-times"></i> </h2>
            </div>
            <div id="simple-modal-description">
                <div  className="p-2">
                   <div className="container">
                       <div className="row">
                           <div className="col-12">
                               <div className="row">
                                   <div className="col-12">
                                        <div className={styles.profile}>
                                            <i className="far fa-user pl-3 pt-2 display-4 text-center"></i>
                                        </div>
                                   </div>
                                   <div className="col-12">
                                    <div className={styles.form} >
                                        <form className={classes.root} noValidate autoComplete="off">
                                            <i className={`fas fa-envelope  ${styles.icons}`}></i>
                                            <TextField
                                                id="standard-basic"
                                                label="Email"
                                                style={{ marginLeft: 16 }}
                                                placeholder= {` Email`}
                                                value = { queryEmail }
                                                onChange = {(e) => setEmailQuery(e.target.value)}
                                            />  
                                        </form>
                                        <form className={classes.root} noValidate autoComplete="off">
                                            <i className={`fas fa-eye ${styles.icons}`}></i>
                                            <TextField
                                                id="standard-basic"
                                                label="Password"
                                                style={{ marginLeft: 20 }}
                                                placeholder={`Password`}
                                                value = { queryPassword}
                                                onChange = {(e) => setPasswordQuery(e.target.value)}
                                            />
                                        </form>
                                        <form className = {`mt-2 `}  noValidate autoComplete="off">
                                            <Button onClick={handleSubmit} variant="contained">SIGN IN</Button>
                                        </form>
                                    </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    );
    const registerBody = (
        <div style={modalStyle} className={classes.paperRegister}>
            <div className="text-right">
                <h2 onClick={handleRegisterClose}><i className="fas fa-times"></i> </h2>
            </div>
            <div id="simple-modal-description">
                <div  className="p-2">
                   <div className="container">
                       <div className="row">
                           <div className="col-12">
                               <div className="row">
                                   <div className="col-12">
                                        <div className={styles.profile}>
                                            <i className="fas fa-user-lock pl-3 pt-2 display-4 text-center"></i>
                                        </div>
                                   </div>
                                   <div className="col-12">
                                    <div className={styles.form} >
                                        <form className={classes.root} noValidate autoComplete="off">
                                            <i className={`fas fa-user  ${styles.icons}`}></i>
                                            <TextField
                                                id="standard-basic"
                                                name="fName"
                                                style={{ marginLeft: 16 }}
                                                placeholder= {`First Name`}
                                                value = { queryRegister.fName }
                                                onChange = {(e) => handleRegisterChange(e)}
                                            />  
                                        </form>
                                        <form className={classes.root} noValidate autoComplete="off">
                                            <i className={`fas fa-user  ${styles.icons}`}></i>
                                            <TextField
                                                id="standard-basic"
                                                name="lName"
                                                style={{ marginLeft: 16 }}
                                                placeholder= {`Last Name`}
                                                value = { queryRegister.lName }
                                                onChange = {(e) => handleRegisterChange(e)}
                                            />  
                                        </form>
                                        <form className={classes.root} noValidate autoComplete="off">
                                            <i className={`fas fa-phone-alt ${styles.icons}`}></i>
                                            <TextField
                                                id="standard-basic"
                                                name="mobile"
                                                style={{ marginLeft: 16 }}
                                                placeholder= {`Phone Number`}
                                                value = { queryRegister.mobile }
                                                onChange = {(e) => handleRegisterChange(e)}
                                            />  
                                        </form>
                                        <form className={classes.root} noValidate autoComplete="off">
                                            <i className={`fas fa-envelope  ${styles.icons}`}></i>
                                            <TextField
                                                id="standard-basic"
                                                name="email"
                                                style={{ marginLeft: 16 }}
                                                placeholder= {` Email`}
                                                value = { queryRegister.email }
                                                onChange = {(e) => handleRegisterChange(e)}
                                            />  
                                        </form>
                                        <form className={classes.root} noValidate autoComplete="off">
                                            <i className={`fas fa-eye ${styles.icons}`}></i>
                                            <TextField
                                                id="standard-basic"
                                                name="password"
                                                style={{ marginLeft: 20 }}
                                                placeholder={`Password`}
                                                value = { queryRegister.password }
                                                onChange = {(e) => handleRegisterChange(e)}
                                                
                                            />
                                        </form>
                                        <form className = {`mt-2 `}  noValidate autoComplete="off">
                                            <Button onClick={handleRegister} variant="contained">SIGN UP</Button>
                                        </form>
                                    </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    );
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-12 shadow p-3 mb-5 bg-light rounded">
                      <div className="row">
                            <div className="col-9 d-flex align-self-center">
                                <h1>
                                   <Link className={styles.link} to='/'><i className="fas fa-house-damage"></i></Link> 
                                </h1>
                            </div>
                            <div className="col-3 d-flex align-self-center justify-content-between">
                                <h4>
                                   <div onClick={handleLoginOpen} className={styles.link}><i className="fas fa-user mr-1"></i>LOGIN</div> 
                                </h4>
                                <h4>
                                   <div onClick={handleRegisterOpen} className={styles.link}><i className="fas fa-user-plus mr-1"></i>REGISTER</div> 
                                </h4>
                            </div>
                      </div>
                    </div>
                </div>
           </div>
           <div>
                <LandingPage />
           </div>
           <div>
                <Fotter/>
           </div>
            <Modal
                open={loginOpen}
                onClose={handleLoginClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {loginBody}
            </Modal>
            <Modal
                open={registerOpen}
                onClose={handleLoginClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {registerBody}
            </Modal>
        </div>
    )
}
