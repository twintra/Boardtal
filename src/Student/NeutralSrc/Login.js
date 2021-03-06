import React from 'react'
import PCLogin from './../PcSrc/Component/PCLogin'
import MobileLogin from './../MobileSrc/Component/MobileLogin'
import useMediaQuery from "@material-ui/core/useMediaQuery"

export default function Login(props){
    const isComputer = useMediaQuery("(min-width:600px");
        return(
            <div>
                {isComputer ? 
                    <PCLogin loggedUserData={props.loggedUserData} setLoggedUserData={props.setLoggedUserData} setRole={props.setRole} loginState={props.loginState} setState={props.setState}/>
                        :
                    <MobileLogin loggedUserData={props.loggedUserData} setLoggedUserData={props.setLoggedUserData} setRole={props.setRole} loginState={props.loginState} setState={props.setState}/>
                }
            </div>
        )
}