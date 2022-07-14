import { TextField, Grid, Typography, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../../utilities/axios";
import './style.css';
const arraySearch = (array, keyword) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter(value => {
        return value.name.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.email.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.department.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.employeeId.toString().toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.employmentStatus.toString().toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.date.toString().toLowerCase().match(new RegExp(searchTerm, 'g')) ||
            value.accommodationRequests.toString().toLowerCase().match(new RegExp(searchTerm, 'g'))



    })
};

const AllRequests = (props) => {


    const [stockData1, setStockData1] = useState([]);
    const [count, setCount] = useState(0);

    const [employeeRequestList, setEmployeeRequestList] = useState([]);
    const [loader, setLoader] = useState(true);
    const handleChange = async (e) => {
        let value = e.target.value;
        console.log(e.target.value);
        if (employeeRequestList) {
            if (value.length >= 2) {
                let search = await arraySearch(employeeRequestList, value);
                setEmployeeRequestList(search)
                console.log(search);
                setCount(search.length)

            } else {
                setEmployeeRequestList(stockData1)
                setCount(stockData1.length)
            }
        }
    }
    React.useEffect(() => {
        axiosInstance.get(`/get-all-requests`).then(res => {
            console.log(res.data);
            setStockData1(res.data);
            setEmployeeRequestList(res.data);
            setLoader(false);

        }).catch(err => {
            setLoader(false);
            console.log(err.response)
        });

    }, []);


    const EmployeeRequestCard = (props) => {
        return (
            <Grid item lg={4} md={4} sm={6} xs={12} className="card">
                <h2>{props.emp.name}</h2>
                <h3>{props.emp.email}</h3>
                <h4>Employee Id : {props.emp.employeeId}</h4>
                <h3>Department : {props.emp.department} </h3>
                <br />
                <h3>Accommodation Requests : {props.emp.accommodationRequests}</h3>
                <br/>
                <h5>{props.emp.date.slice(1,-5).replace('T',' ')}</h5>

            </Grid>)
    }
    
    return (
        <Grid className="requestListContainer" justifyContent={'center'} container>
            <Grid className="requestListInnerContainer" container>
                {loader ?
                    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center' }} >
                        <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
                    </div> :
                    <>
                        <Grid container justifyContent="space-between" >
                            <Typography variant="h4">Requests lookup for HR</Typography>
                            <TextField
                                placeholder='Search'
                                variant='outlined'
                                type='text'
                                onChange={handleChange} />
                        </Grid>
                        <Grid container style={{paddingTop:'2em'}}>
                            {
                                employeeRequestList.map(emp => {
                                    return (
                                        <EmployeeRequestCard emp={emp} />
                                    )
                                })
                            }
                        </Grid>
                    </>
                }
            </Grid>
        </Grid>
    );
}
export default AllRequests;