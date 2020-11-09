//==============================================================================
import React, { useState } from "react";
//==============================================================================
import Input from "../../reusable/Input/index.jsx";
import Button from "../../reusable/Button/index.jsx";

import {
    PublishPage,
    PublishContainer,
    PublishTitle,
} from "./style"
//==============================================================================

function _Publish() {

	const [email, setEmail] = useState("");
	const [isInputMissing, setIsInputMissing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);    
    
  return (
    <PublishPage>
        <PublishContainer>

            <PublishTitle> Publish new Recipe </PublishTitle>
            <Input 
                label="RecipeName"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                checkForMissingField={isInputMissing}
                isLoading={isLoading}
            />
            <Input 
                label="Recipe Image URL"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                checkForMissingField={isInputMissing}
                isLoading={isLoading}
            />
            <Input 
                label="Recipe Description"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                checkForMissingField={isInputMissing}
                isLoading={isLoading}
            />
            <Button 
                type="success"
                onClick={() => {}}
                isLoading={isLoading}
                text="Publish"
                style={{ width:"100%", padding:"10px 0", fontSize:16, marginTop:30 }}
            />            

        </PublishContainer>
    </PublishPage>
  );
}

export default _Publish;
