import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {CIRCULAR_PROGRESS_WITH_LABEL_STYLES} from "@/constants/styles";

export function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number, type: string },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={CIRCULAR_PROGRESS_WITH_LABEL_STYLES}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >{`${props.type !== 'Win' ? Math.round(props.value) + '%' : '✔️'}`}</Typography>
            </Box>
        </Box>
    );
}
