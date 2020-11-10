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
	SIGNUP__ROUTE_PATH,
} from "../../../data/urls"
//==============================================================================

function _Login() {

  const context = useContext(RecipeContext);
  const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isInputMissing, setIsInputMissing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

    const Login = () => {
        if(isAnyEmpty(email, password) || !validateEmail(email)) {
            setIsInputMissing(true);
            return;
        }
        setIsInputMissing(false);
        setIsLoading(true);
        // login
        function cleanForm () {
          setEmail("");
          setPassword("");
          setIsLoading(false);          
        }
        context.Login(email, password)
          .then(() => {
            cleanForm();
            // TODO: notification success
          })
          .catch(() => {
            cleanForm();
            // TODO: notification error
          });
    }       

    if(context.loggedUser) {
        return <Redirect to={DISCOVER__ROUTE_PATH}/>
    }
    
  return (
    <AccountPage>
        <AccountContainer>
            <AccountTitle> Login! </AccountTitle>
            <Input 
                label="Email"
                type="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                checkForMissingField={isInputMissing}
                error={isInputMissing && !validateEmail(email)}
                isLoading={isLoading}
            />
            <Input 
                label="Password"
                type="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                checkForMissingField={isInputMissing}
                isLoading={isLoading}
            />
            <AccountLink onClick={() => history.push(SIGNUP__ROUTE_PATH)}> 
                Does not have an account yet? 
            </AccountLink>
            <Button 
                type="info"
                onClick={Login}
                isLoading={isLoading}
                text="Login"
                style={{ width:"100%", padding:"10px 0", fontSize:16, marginTop:30 }}
            />
        </AccountContainer>
    </AccountPage>
  );
}

export default _Login;
