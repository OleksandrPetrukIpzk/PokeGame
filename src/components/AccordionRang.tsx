import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import {useCallback, useEffect, useState} from "react";
import {Rang} from "@/constants/types";
import {ElementFight} from "@/components/ElementFight";
import {useTranslate} from "@tolgee/react";
import {getAllFights} from "@/functions/asyncFynctions";

type AccordionR = {
    name: string
}

export const AccordionRang = ({name}: AccordionR) => {
    const {t} = useTranslate();
    const [fights, setFights] = useState<Rang[]>([]);
    const fetchFights = useCallback(() => getAllFights(name, setFights), [name]);
    useEffect(() => {
        fetchFights();
    }, [fetchFights]);

    return<Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
        >
            {t('Profile.fights')} {fights.length}
        </AccordionSummary>
        <AccordionDetails className='flex flex-col flex-wrap gap-2'>
            {fights.map(fight => <ElementFight item={fight} user={name}/>)}
        </AccordionDetails>
    </Accordion>
}
