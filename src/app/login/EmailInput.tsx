import {Dispatch, SetStateAction, useState} from "react";
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import Key from '@mui/icons-material/Key';
import {validateEmail} from "@/functions/auth";
import {Email} from "@mui/icons-material";
export const EmailInput = ({email, setEmail}: {email: string, setEmail: Dispatch<SetStateAction<string>>}) =>{
    const [isValid, setIsValid] = useState(false);
    const handleChange = (value: string) => {
        if(validateEmail(value)){
            setIsValid(true)
        } else{
            setIsValid(false)
        }
        setEmail(value);
    }
    return (<Stack
            spacing={0.5}
            sx={{
                '--hue': isValid ? 120 : 0,
            }}
        >
            <Input
                type="email"
                placeholder="Type in here your email…"
                startDecorator={<Email />}
                value={email}
                onChange={(event) => handleChange(event.target.value)}
                size="lg"
            />
            <LinearProgress
                determinate
                size="sm"
                value={isValid ? 100 : 0}
                sx={{
                    bgcolor: 'background.level3',
                    color: 'hsl(var(--hue) 80% 40%)',
                }}
            />
            <Typography
                level="body-xs"
                sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
            >
                {isValid ? 'Email is good' : 'Email didnt good'}
            </Typography>
        </Stack>)
}
