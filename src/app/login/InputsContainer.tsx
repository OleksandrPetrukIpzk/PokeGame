import {NameInput} from "@/app/login/NameInput";
import {EmailInput} from "@/app/login/EmailInput";
import {PasswordInput} from "@/app/login/PasswordInput";
import React, {Dispatch, SetStateAction} from "react";

export const InputsContainer = ({name, setName, email, setEmail, password, setPassword}: {name: string, setName: Dispatch<SetStateAction<string>>, email: string, setEmail: Dispatch<SetStateAction<string>>, password: string, setPassword: Dispatch<SetStateAction<string>>}) =>{
    return <>   <NameInput name={name} setName={setName}/>
    <EmailInput email={email} setEmail={setEmail}/>
    <PasswordInput password={password} setPassword={setPassword}/></>
}
