import Image from "next/image";
import LinearBarWithLabel from "@/components/LinearBarWithLabel";
import {COUNT_ACHIVES} from "@/constants/achievement";
import {achivePercent} from "@/functions/achives";
import {isTheSame} from "@/functions/logic";
import {AccordionPokemons} from "@/components/Accordion";
import {ImagePokemonWithLinks} from "@/components/ImagePokemonWithLinks";
import {AccordionRang} from "@/components/AccordionRang";
import {useTranslate} from "@tolgee/react";

type Content = {
    img: string,
    name: string,
    email: string,
    achiveList : number[],
    rang: number,
    selectedPokemon: string,
    arrPokemons: string[]
}
export const MainContent = ({img, name, email, achiveList, rang, selectedPokemon, arrPokemons}: Content) =>{
    const {t} = useTranslate();
return<div>
      <div className='flex justify-around'>
          <div>
              <div>
              <Image src={img} alt={img} width={200} height={200}/>
              </div>
              <div>
              <p>{name}</p>
              <p>{t("Arena.rangOfPlayer")} {rang}</p>
              <p>{t("Profile.email")} {email}</p>

              </div>
              <p>{t("Profile.achives")}</p>
              <LinearBarWithLabel value={isTheSame(achiveList.length, COUNT_ACHIVES) ? 100 : achivePercent(achiveList.length)}/>
          </div>
          <div>
              <ImagePokemonWithLinks selectedPokemon={selectedPokemon} width={200} height={200}/>
          </div>
      </div>
        <AccordionPokemons arrPokemons={arrPokemons}/>
    <AccordionRang name={name}/>
    </div>
}
