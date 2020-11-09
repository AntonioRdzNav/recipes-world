//==============================================================================
import React, { useState } from "react";
//==============================================================================
import Input from "../../reusable/Input/index.jsx";
import Button from "../../reusable/Button/index.jsx";

import {
    LoginPage,
    LoginContainer,
    LoginTitle,
} from "./style"
//==============================================================================

function _Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isInputMissing, setIsInputMissing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
    
  return (
    <LoginPage>
        <LoginContainer>
            <LoginTitle> Login! </LoginTitle>
            <Input 
                label="Email"
								type="email"
                required={true}
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								checkForMissingField={isInputMissing}
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
						<Button 
							type="info"
							onClick={() => {}}
							isLoading={isLoading}
							text="Login"
							style={{ width:"100%", padding:"10px 0", fontSize:16, marginTop:30 }}
						/>
        </LoginContainer>
    </LoginPage>
  );
}

export default _Login;
