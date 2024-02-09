import {Dispatch, SetStateAction} from "react";
import Stack from '@mui/joy/Stack';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import Key from '@mui/icons-material/Key';
export const PasswordInput = ({password, setPassword}: {password: string, setPassword: Dispatch<SetStateAction<string>>}) => {
    const minLength = 12;
    return (
        <Stack
            spacing={0.5}
            sx={{
                '--hue': Math.min(password.length * 10, 120),
            }}
        >
            <Input
                type="password"
                placeholder="Type in here your password…"
                startDecorator={<Key />}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                size="lg"
            />
            <LinearProgress
                determinate
                size="sm"
                value={Math.min((password.length * 100) / minLength, 100)}
                sx={{
                    bgcolor: 'background.level3',
                    color: 'hsl(var(--hue) 80% 40%)',
                }}
            />
            <Typography
                level="body-xs"
                sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
            >
                {password.length < 5 && 'Very weak'}
                {password.length >= 5 && password.length < 8 && 'Weak'}
                {password.length >= 8 && password.length < 11 && 'Strong'}
                {password.length >= 11 && 'Very strong'}
            </Typography>
        </Stack>
    );
}
