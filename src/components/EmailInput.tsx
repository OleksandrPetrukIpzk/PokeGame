import {Dispatch, SetStateAction, useState} from "react";
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import {handleChangeEmail, validateEmail} from "@/functions/auth";
import {Email} from "@mui/icons-material";
import {useTranslate} from "@tolgee/react";

type EmailInputT = {
    email: string, setEmail: Dispatch<SetStateAction<string>>,
    setErrors: Dispatch<SetStateAction<string[]>>
}

export const EmailInput = ({email, setEmail, setErrors}: EmailInputT) =>{
   const {t} = useTranslate()
    const [isValid, setIsValid] = useState(false);

    return (<Stack
            spacing={0.5}
            sx={{
                '--hue': isValid ? 120 : 0,
            }}>
            <Input
                type="email"
                placeholder={t('Login.emailPlaceholder')}
                startDecorator={<Email />}
                value={email}
                onChange={(event) => handleChangeEmail(event.target.value, setIsValid, setErrors, setEmail)}
                size="lg"/>
            <LinearProgress
                determinate
                size="sm"
                value={isValid ? 100 : 0}
                sx={{
                    bgcolor: 'background.level3',
                    color: 'hsl(var(--hue) 80% 40%)',
                }}/>
            <Typography
                level="body-xs"
                sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}>
                {isValid ? t('Login.emailGood') : t('Login.emailBad')}
            </Typography>
        </Stack>)
}
