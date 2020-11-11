//==============================================================================
import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
//==============================================================================
import Input from "../../reusable/Input/index.jsx";
import Button from "../../reusable/Button/index.jsx";

import RecipeContext from "../../../context/recipe-context"

import { isAnyEmpty, validateEmail } from "../../../utils/Helpers"

import {
    AccountPage,
    AccountContainer,
    AccountTitle,
    AccountLink
} from "../style"

import {
  DISCOVER__ROUTE_PATH,
	LOGIN__ROUTE_PATH,
} from "../../../data/urls"
//==============================================================================

function _Signup() {

    const context = useContext(RecipeContext);
    const history = useHistory();    

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isInputMissing, setIsInputMissing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

    const Signup = () => {
        if(isAnyEmpty(name, email, password) || !validateEmail(email)) {
            setIsInputMissing(true);
            return;
        }
        setIsInputMissing(false);
        setIsLoading(true);
        // signup
        function cleanForm () {
          setName("");          
          setEmail("");
          setPassword("");
          setIsLoading(false);          
        }
        context.Signup(name, email, password)
          .then(() => {
            cleanForm();
            context.TriggerNotification("success", `Welcome ${name}!`)
          })
          .catch(() => {
            cleanForm();
            context.TriggerNotification("error", "Could not Sign up.")
          });        
    }    

    if(context.loggedUser) {
        return <Redirect to={DISCOVER__ROUTE_PATH}/>
    }    
    
  return (
    <AccountPage>
        <AccountContainer>
            <AccountTitle> Signup! </AccountTitle>
            <Input 
                label="Name"
                required={true}
                onChange={(e) => setName(e.target.value)}
                value={name}
                checkForMissingField={isInputMissing}
                isLoading={isLoading}
                onKeyDown={(e) => e.key==="Enter" && Signup() }
            />
            <Input 
                label="Email"
                type="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                checkForMissingField={isInputMissing}
                error={isInputMissing && !validateEmail(email)}
                isLoading={isLoading}
                onKeyDown={(e) => e.key==="Enter" && Signup() }
            />
            <Input 
                label="Password"
                type="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                checkForMissingField={isInputMissing}
                isLoading={isLoading}
                onKeyDown={(e) => e.key==="Enter" && Signup() }
            />
            <AccountLink onClick={() => history.push(LOGIN__ROUTE_PATH)}> 
                Already have an account?
            </AccountLink>                      
            <Button 
                type="info"
                onClick={Signup}
                isLoading={isLoading}
                text="Signup"
                style={{ width:"100%", padding:"10px 0", fontSize:16, marginTop:30 }}
            />
        </AccountContainer>
    </AccountPage>
  );
}

export default _Signup;
