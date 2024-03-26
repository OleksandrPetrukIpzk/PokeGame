import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ImagePokemonWithLinks} from "@/components/ImagePokemonWithLinks";
import {useTranslate} from "@tolgee/react";

type AccordionPokemon = {
    arrPokemons: string[]
}
export const AccordionPokemons = ({arrPokemons}: AccordionPokemon) => {
    const {t} = useTranslate();
    return  <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
        >
            {t('Profile.pokemons')} {arrPokemons.length}
        </AccordionSummary>
        <AccordionDetails className='flex flex-wrap gap-2.5 bg-blue-200'>
            {arrPokemons.map(item => <ImagePokemonWithLinks selectedPokemon={item} width={100} height={100}/>)}
        </AccordionDetails>
    </Accordion>
}
