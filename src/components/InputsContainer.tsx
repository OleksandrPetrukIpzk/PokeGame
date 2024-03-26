import {NameInput} from "@/components/NameInput";
import {EmailInput} from "@/components/EmailInput";
import {PasswordInput} from "@/components/PasswordInput";
import React, {Dispatch, SetStateAction} from "react";

type InputsContainerT = {
    setErrors: Dispatch<SetStateAction<string[]>>,
    name: string,
    setName: Dispatch<SetStateAction<string>>,
    email: string,
    setEmail: Dispatch<SetStateAction<string>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>
}

export const InputsContainer = ({setErrors, name, setName, email, setEmail, password, setPassword}: InputsContainerT) =>{
    return <>
        <NameInput name={name} setName={setName} setErrors={setErrors}/>
    <EmailInput email={email} setEmail={setEmail} setErrors={setErrors}/>
    <PasswordInput password={password} setPassword={setPassword} setErrors={setErrors}/>
    </>
}
