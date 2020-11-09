//==============================================================================
import React, { useState } from "react";
//==============================================================================
import Input from "../../reusable/Input/index.jsx";
import Button from "../../reusable/Button/index.jsx";

import {
    SignupPage,
    SignupContainer,
    SignupTitle,
} from "./style"
//==============================================================================

function _Signup() {

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isInputMissing, setIsInputMissing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
    
  return (
    <SignupPage>
        <SignupContainer>
            <SignupTitle> Signup! </SignupTitle>
            <Input 
                label="Name"
                required={true}
                onChange={(e) => setName(e.target.value)}
                value={name}
                checkForMissingField={isInputMissing}
                isLoading={isLoading}
            />
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
                text="Signup"
                style={{ width:"100%", padding:"10px 0", fontSize:16, marginTop:30 }}
            />
        </SignupContainer>
    </SignupPage>
  );
}

export default _Signup;
