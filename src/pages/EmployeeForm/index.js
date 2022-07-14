import { Grid } from "@material-ui/core";
import { TextField, Typography, Button, MenuItem, Select, FormHelperText, CircularProgress } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React, { useState } from "react";
import './style.css';
import axiosInstance from "../../utilities/axios";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const EmployeeForm = (props) => {

    // All Employee Data
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        employmentStatus: '',
        employeeId: '',
        department: '',
        accommodationRequests: '',
    });

    // Snackbar management states
    const [isError, setIsError] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // All Error handling states 
    const [firstNameError, setFirstnameError] = useState(false);
    const [lastNameError, setLastnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [employmentStatusError, setEmploymentStatusError] = useState(false);
    const [employeeIdError, setEmployeeIdError] = useState(false);
    const [departmentError, setDepartmentError] = useState(false);
    const [accommodationRequestsError, setAccommodationRequestsError] = useState(false);

    const [firstNameErrorText, setFirstnameErrorText] = useState('');
    const [lastNameErrorText, setLastnameErrorText] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [employmentStatusErrorText, setEmploymentStatusErrorText] = useState('');
    const [employeeIdErrorText, setEmployeeIdErrorText] = useState('');
    const [departmentErrorText, setDepartmentErrorText] = useState('');
    const [accommodationRequestsErrorText, setAccommodationRequestsErrorText] = useState('');

    // Loader state
    const [loader, setLoader] = useState(false);


    // Methods for validating fields
    const ValidateSingleField = (data) => {
        if (data === "")
            return true;
        return false;

    }

    // Method for validating email
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateData = () => {
        setFirstnameError(ValidateSingleField(employeeData.firstName));
        ValidateSingleField(employeeData.firstName) ? setFirstnameErrorText('First Name cannot be blank') : setFirstnameErrorText('');


        setLastnameError(ValidateSingleField(employeeData.lastName));
        ValidateSingleField(employeeData.lastName) ? setLastnameErrorText('Last Name cannot be blank') : setLastnameErrorText('');


        setEmailError(ValidateSingleField(employeeData.email));
        ValidateSingleField(employeeData.email) ? setEmailErrorText('Email cannot be blank') : setEmailErrorText('');

        if (employeeData.email) {
            setEmailError(!validateEmail(employeeData.email));
            setEmailErrorText(!validateEmail(employeeData.email) ? 'Please enter correct email' : '');
        }

        setEmploymentStatusError(ValidateSingleField(employeeData.employmentStatus));
        ValidateSingleField(employeeData.employmentStatus) ? setEmploymentStatusErrorText('Employment Status cannot be blank') : setEmploymentStatusErrorText('');

        setEmployeeIdError(ValidateSingleField(employeeData.employeeId));
        ValidateSingleField(employeeData.employeeId) ? setEmployeeIdErrorText('Employee Id cannot be blank') : setEmployeeIdErrorText('');

        setDepartmentError(ValidateSingleField(employeeData.department));
        ValidateSingleField(employeeData.department) ? setDepartmentErrorText('Department cannot be blank') : setDepartmentErrorText('');

        setAccommodationRequestsError(ValidateSingleField(employeeData.accommodationRequests));
        ValidateSingleField(employeeData.accommodationRequests) ? setAccommodationRequestsErrorText('Accommodation Requests cannot be blank') : setAccommodationRequestsErrorText('');


        if (
            validateEmail(employeeData.email)
            && !ValidateSingleField(employeeData.firstName)
            && !ValidateSingleField(employeeData.lastName)
            && !ValidateSingleField(employeeData.email)
            && !ValidateSingleField(employeeData.department)
            && !ValidateSingleField(employeeData.employmentStatus)
            && !ValidateSingleField(employeeData.accommodationRequests)
            && !ValidateSingleField(employeeData.employeeId)
        )
            return true;

        return false;


    }


    return (
        <Grid className="employeeFormContainer" container justifyContent="center">
            <Grid container justifyContent="center" item>
                <Typography variant="h4">Employee Request Form</Typography>
            </Grid>
            <br />
            <form onSubmit={e => e.preventDefault()}>

                <Grid container className="formContainer" justifyContent="center">
                    <Grid spacing={2} container item lg={12} md={12} sm={12} xs={12} direction='row'>

                        <Grid container direction='column' item lg={6} md={6} sm={6} xs={12}>
                            <span className='label'>First name</span>
                            <TextField className='inputField' type="text"
                                placeholder='Mark' variant='outlined'
                                error={firstNameError}
                                value={employeeData.firstName}
                                onChange={(event) => {
                                    setFirstnameError(false);
                                    setFirstnameErrorText('');
                                    setEmployeeData({ ...employeeData, firstName: event.target.value })
                                }}

                            />
                            <FormHelperText style={{ color: 'red' }}>{firstNameErrorText}</FormHelperText>
                        </Grid>
                        <Grid container direction='column' item lg={6} md={6} sm={6} xs={12}>
                            <span className='label'>Last name</span>
                            <TextField className='inputField' type="text"
                                placeholder='Zuckerberg' variant='outlined'
                                error={lastNameError}
                                value={employeeData.lastName}
                                onChange={(event) => {
                                    setLastnameError(false);
                                    setLastnameErrorText('');
                                    setEmployeeData({ ...employeeData, lastName: event.target.value })
                                }}
                            />
                            <FormHelperText style={{ color: 'red' }}>{lastNameErrorText}</FormHelperText>
                        </Grid>



                        <Grid container item lg={6} md={6} sm={6} xs={12} direction='column'>
                            <span className='label'>Email address</span>
                            <TextField
                                className='inputField'
                                placeholder='name@example.com'
                                variant='outlined'
                                type='email'
                                error={emailError}
                                value={employeeData.email}
                                onChange={(event) => {
                                    setEmailError(false);
                                    setEmailErrorText('');
                                    setEmployeeData({ ...employeeData, email: event.target.value })
                                }}
                            />
                            <FormHelperText style={{ color: 'red' }}>{emailErrorText}</FormHelperText>

                        </Grid>
                        <Grid container direction='column' item lg={6} md={6} sm={6} xs={12}>
                            <span className='label'>Employee ID</span>
                            <TextField className='inputField' type="number"
                                placeholder='2134' variant='outlined'
                                error={employeeIdError}
                                value={employeeData.employeeId}
                                onChange={(event) => {
                                    setEmployeeIdError(false);
                                    setEmployeeIdErrorText('');

                                    if (event.target.value <= 0) {
                                        setEmployeeData({ ...employeeData, employeeId: '' })
                                        setEmployeeIdError(true);
                                        setEmployeeIdErrorText('Employee Id cannot be negative');

                                    }
                                    else
                                        setEmployeeData({ ...employeeData, employeeId: event.target.value })
                                }}
                            />
                            <FormHelperText style={{ color: 'red' }}>{employeeIdErrorText}</FormHelperText>
                        </Grid>
                        <Grid container direction='column' item lg={6} md={6} sm={6} xs={12}>
                            <span className='label'>Department</span>
                            <TextField className='inputField' type="text"
                                placeholder='Information & Technology' variant='outlined'
                                error={departmentError}
                                value={employeeData.department}
                                onChange={(event) => {
                                    setDepartmentError(false);
                                    setDepartmentErrorText('');
                                    setEmployeeData({ ...employeeData, department: event.target.value })
                                }}
                            />
                            <FormHelperText style={{ color: 'red' }}>{departmentErrorText}</FormHelperText>
                        </Grid>
                        <Grid container direction='column' item lg={6} md={6} sm={6} xs={12}>
                            <span className='label'>Accommodation Requests</span>
                            <Select
                                style={{ background: '#FFF' }}
                                error={accommodationRequestsError}
                                value={employeeData.accommodationRequests}
                                onChange={(event) => {
                                    setAccommodationRequestsError(false);
                                    setAccommodationRequestsErrorText('');
                                    setEmployeeData({ ...employeeData, accommodationRequests: event.target.value })
                                }}
                            >
                                <MenuItem value={"Ergonomic chair"}>Ergonomic chair</MenuItem>
                                <MenuItem value={"Large-screen monitor"}>Large-screen monitor</MenuItem>
                            </Select>
                            <FormHelperText style={{ color: 'red' }}>{accommodationRequestsErrorText}</FormHelperText>
                        </Grid>
                        <Grid container direction='column' item lg={6} md={6} sm={6} xs={12}>
                            <span className='label'>Employment Status</span>
                            <Select
                                style={{ background: '#FFF' }}
                                error={employmentStatusError}
                                value={employeeData.employmentStatus}
                                onChange={(event) => {
                                    setEmploymentStatusError(false);
                                    setEmploymentStatusErrorText('');
                                    setEmployeeData({ ...employeeData, employmentStatus: event.target.value })
                                }}
                            >
                                <MenuItem value={"Employed"}>Employed</MenuItem>
                                <MenuItem value={"Self-Employed"}>Self-Employed</MenuItem>
                                <MenuItem value={"Un-Employed"}>Un-Employed</MenuItem>
                            </Select>
                            <FormHelperText style={{ color: 'red' }}>{employmentStatusErrorText}</FormHelperText>
                        </Grid>

                        <Grid container direction='column' item lg={6} md={6} sm={6} xs={12}>
                            <span className='label'>File Upload</span>
                            <TextField className='inputField' type="file"
                                variant='outlined'
                                onChange={(event) => {
                                    setEmployeeData({ ...employeeData, files: event.target.files[0] })
                                }}
                            />
                            {/* <FormHelperText style={{ color: 'red' }}>{lastNameErrorText}</FormHelperText> */}
                        </Grid>


                        <Grid container item lg={12} md={12} sm={12} xs={12} direction='column'>
                            {loader ?
                                <div style={{ display: 'flex', justifyContent: 'center' }} >
                                    <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
                                </div> :

                                <div style={{ display: 'flex', justifyContent: 'center' }} >
                                    <Button type='submit' style={{ fontSize: '20px', fontWeight: '600', padding: '8px 60px' }} className='demoSubmitButton'
                                        variant="contained"
                                        onClick={() => {
                                            console.log(employeeData);
                                            setOpen(true);
                                            setIsError(true);
                                            setSnackbarMessage('Please fill all details');
                                            
                                            if (validateData()) {
                                                console.log("Validate Success");
                                                console.log(employeeData);
                                                setLoader(true);
                                                const data = new FormData();
                                                data.append('name', employeeData.firstName + " " + employeeData.lastName);
                                                data.append('email', employeeData.email);
                                                data.append('employmentStatus', employeeData.employmentStatus);
                                                data.append('employeeId', employeeData.employeeId);
                                                data.append('department', employeeData.department);
                                                data.append('accommodationRequests', employeeData.accommodationRequests);

                                                if (employeeData.files != undefined)
                                                    data.append('files', employeeData.files);
                                                setOpen(true);
                                                setIsError(false);
                                                setSnackbarMessage('Sent');
                                                axiosInstance.post('/create-request', data).then((res) => {
                                                    setLoader(false);
                                                    setIsError(false);
                                                    setSnackbarMessage("Request Submitted Successful");
                                                    setOpen(true);
                                                    setEmployeeData({
                                                        firstName: '',
                                                        lastName: '',
                                                        email: '',
                                                        employmentStatus: '',
                                                        employeeId: '',
                                                        department: '',
                                                        accommodationRequests: ''
                                                    })
                                                }).catch((err) => {
                                                    console.log(err.response);
                                                    setLoader(false);

                                                    setIsError(true);


                                                });


                                            }



                                        }
                                        }
                                    >Submit</Button></div>
                            }
                        </Grid>
                    </Grid>


                </Grid>
            </form>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open} autoHideDuration={2000} onClose={() => {
                    setOpen(false);
                }}>
                <Alert onClose={() => {
                    setOpen(false);
                }} severity={isError ? "error" : "success"} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Grid >
    )
}
export default EmployeeForm;