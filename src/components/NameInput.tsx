import {Dispatch, SetStateAction, useEffect} from "react";
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import {SupervisedUserCircle} from "@mui/icons-material";
import {useTranslate} from "@tolgee/react";

export const NameInput = ({name, setName, setErrors}: {name: string, setName: Dispatch<SetStateAction<string>>, setErrors: Dispatch<SetStateAction<string[]>>}) =>{
   const {t} = useTranslate();
    const minLength = 20;
    useEffect(() => {
        if(name.length < 3){
            setErrors((prev: string[]) => {
                if (!prev.includes('name')) {
                    prev.push('name');
                }
                return prev;
            });
        } else{
            setErrors((prev: string[]) => {
                if (prev.includes('name')) {
                    const index = prev.findIndex(item => item === 'name');
                    prev.splice(index, 1);
                }
                return prev;
            });
        }
    }, [name]);
    return (
        <Stack
            spacing={0.5}
    sx={{
        '--hue': Math.min(name.length * 10, 120),
    }}
>
    <Input
        type="text"
    placeholder={t('Login.namePlaceholder')}
    startDecorator={<SupervisedUserCircle />}
    value={name}
    onChange={(event) => setName(event.target.value)}
        size="lg"
    />
    <LinearProgress
    determinate
    size="sm"
    value={Math.min((name.length * 100) / minLength, 100)}
    sx={{
        bgcolor: 'background.level3',
            color: 'hsl(var(--hue) 80% 40%)',
    }}
    />
    <Typography
    level="body-xs"
    sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}>
    {name.length >= 1 && name.length < 3 && t('Login.veryWeak')}
    {name.length >= 3 && name.length < 6 && t('Login.weak')}
    {name.length >= 6 && name.length < 11 && t('Login.strong')}
    {name.length >= 11 && t('Login.veryStrong')}
    </Typography>
    </Stack>
);
}
