import Image from "next/image";
import {getPokemonImg} from "@/functions/pocemons";
import {useEffect, useState} from "react";
import Link from "next/link";
import LinearBarWithLabel from "@/app/cabinet/LinearBarWithLabel";
import {COUNT_ACHIVES} from "@/constants/achievement";
import {achivePercent} from "@/functions/achives";
import {isTheSame} from "@/functions/logic";
import {AccordionPokemons} from "@/app/cabinet/Accordion";
import {ImagePokemonWithLinks} from "@/app/cabinet/my/ImagePokemonWithLinks";

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


return<div>
      <div className='flex justify-around'>
          <div>
              <div>
              <Image src={img} alt={img} width={200} height={200}/>
              </div>
              <div>
              <p>{name}</p>
              <p>Rang: {rang}</p>
              <p>Email: {email}</p>

              </div>
              <p>Achives:</p>
              <LinearBarWithLabel value={isTheSame(achiveList.length, COUNT_ACHIVES) ? 100 : achivePercent(achiveList.length)}/>
          </div>
          <div>
              <ImagePokemonWithLinks selectedPokemon={selectedPokemon} width={200} height={200}/>
          </div>
      </div>
        <AccordionPokemons arrPokemons={arrPokemons}/>
    </div>
}
