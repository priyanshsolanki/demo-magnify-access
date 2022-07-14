import React from "react";
import './style.css';
import { Grid } from "@material-ui/core";

import Logo from '../../assets/Demo.jpg'
const Home = (props) =>{
    return(

        <Grid style={{height:'100vh'}} container alignItems="center" justifyContent="center" >
            <img className='landingImg' alt='logo' src={Logo}/>
        </Grid>
    )
}
export default Home;