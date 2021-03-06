import React,{ Component, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from "@material-ui/core/TextField"
import Box from '@material-ui/core/Box'
import { fade } from '@material-ui/core'
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import logo from "../../PcSrc/Img/Portal_Img.png"
import background from "../../PcSrc/Img/BackGround.jpg"
import Button from '@material-ui/core/Button'

import { useHistory } from "react-router-dom"
import {UserLoginIDList} from "./../../../Data/UserData"

import axios from 'axios'

export default function PCLogin(props){  
  
  const [inputError,setInputError] = useState()
  const mockLoginData = UserLoginIDList
  let history = useHistory()
  useEffect(()=>{
    if(inputError===false){
      history.push("/main/home")
      props.setState(true)
    }
  },[inputError])
  useEffect(()=>{
    if (props.loginState){
      history.push("/main/home")
    }
  })
  async function handleLoginButton(){
    const id = document.getElementById("idTextField").value
    const password = document.getElementById("passwordTextField").value
    console.log(typeof(id), typeof(password))
    let data = await axios.post('https://boardtal.herokuapp.com/student/login',{
        stud_id : id,
        password : password
    }).then(res=>{
      return res.data
    })
    console.log(data)
    props.setLoggedUserData(data)
    if (data!=="error"){
      props.setState(true)
      setInputError(false)
      history.push("/main/home")
    }else{
      setInputError(true)
    }
  }

  const styles = {
    paperStyle: {
      width:"80%",
      
      padding:0,
      backgroundColor: fade("#1E1E1E", 0.8),
      position:"static"
    },
    divStyle: {
      width:"100%",
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      position:"absolute",
      height:"100%",
      top:0,
      left:0,
      overflow: 'hidden',
    }
  };
  const textFieldTheme = createMuiTheme({
    typography: {
      fontFamily: "Anton"
    }
    
  });
  const portalTextField = createMuiTheme({
    palette:{
      primary:{
        main: "#17C0E9"
      },
      secondary:{
        main: "#EE7F1B"
      }
    },
    typography: {
      fontFamily: "Anton"
    }
  });

  
  return (
    <div style={styles.divStyle}>
      <Grid container xl >
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet"/>
        <Grid item xs={12} align='center'>
          <Box style={{paddingTop:"9%",paddingBottom:"5%",width:"1200px"}}>
            <Paper elevation={10} style={styles.paperStyle}>
                <Grid container >
                  <Grid item xs = {12} sm={4}  style={{width:'100%',paddingTop:20,paddingBottom:20,backgroundColor: fade("#FFFFFF", 0.2)}}>
                    <img src={logo} alt="portal Logo" width="75%" />
                  </Grid>
                  <Grid align='center' item xs = {12} sm={8} style={{width:'100%',paddingTop:40,paddingLeft:60,paddingRight:60,backgroundColor:"#FFFFFF"}}>
                    <Box style={{margin:30}}>
                      <Paper  style={{backgroundColor: fade("#FFFFFF", 0.8),position:"static",marginBottom:"2%"}}>
                        <Box align='center' fontFamily="Anton" fontWeight="fontWeightBold" style={{fontSize:"1.5rem",padding:"2%"}}>
                          Log in
                        </Box>
                      </Paper>
                      <ThemeProvider theme ={portalTextField}>
                        <Box style={{marginBottom:"2%"}}>
                        
                          <TextField 
                            error={inputError}
                            autoFocus 
                            required 
                            id="idTextField" 
                            label="User ID" 
                            style={{
                              width:"100%"
                            }}
                            color="primary"
                          />
                          
                        </Box>
                        <Box >
                          
                            <TextField
                              error={inputError}
                              required 
                              id="passwordTextField"
                              label="Password"
                              type="password"
                              helperText={
                                inputError ? "incorrect ID or password":"" 
                              }
                              style={{
                                width:"100%",
                              }}
                              color="secondary"
                            />
                  
                        </Box>
                        <Box style={{margin:"5%"}}>
                          <Button variant="outlined" onClick={handleLoginButton} style={{width:"30%"}}>Login</Button><br/><br/>
                        </Box>
                      </ThemeProvider>
                    </Box>
                  </Grid>
                </Grid>                
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );

}