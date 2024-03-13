import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import {useEffect, useState} from "react";
import {Rang} from "@/constants/types";
import ArenaService from "@/services/arenaService";
import {ElementFight} from "@/ElementFight/ElementFight";
import {useTranslate} from "@tolgee/react";

export const AccordionRang = ({name}: {name: string}) => {
    const {t} = useTranslate()
    const [fights, setFights] = useState<Rang[]>([]);

    useEffect(() => {
        const getAllFights = async () =>{
            if(name !== ''){
                const response = await ArenaService.getFightForUserByName(name);
                setFights(response.data);
            }
        }
        getAllFights()
    }, [name]);

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
