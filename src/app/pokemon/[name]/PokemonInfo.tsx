import Image from "next/image";
import React from "react";
import {HeightSVG, WeightSVG} from "@/app/pokemon/[name]/SVGs";

export const PokemonInfo = ({pokemonInfo}: {pokemonInfo: any}) =>{
    return (<><p className='pokemon-name'>{pokemonInfo.name}</p><p className='pokemon-name' style={{color: '#B8B8B8'}}>About</p>
        <div className='flex'>
            <div className='pr-5 mr-5 border-r-2'>
                <div className='flex items-center mb-3'>
                   <WeightSVG/>
                    <p className='stats'>{pokemonInfo.weight} kg</p>
                </div>
                <p className='name-stats'>Weight</p>
            </div>
            <div>
                <div className='flex items-center mb-3'>
                   <HeightSVG/>
                    <p className='stats'>{pokemonInfo.height} m</p>
                </div>
                <p className='name-stats'>Height</p>
            </div>
        </div>
        <div>
            <p className='pokemon-name mt-10' style={{color: '#B8B8B8'}}>Base Stats</p>
            <div className='flex items-center mb-3'><Image width={30} height={30} src='/Heart_corazón.svg.png'
                                                           alt='1.svg'/> <p className='pl-3'>Hp: {pokemonInfo.hp}</p>
            </div>
            <div className='flex items-center mb-3'><Image width={30} height={30} src='/8037103.png' alt='8037103.png'/>
                <p className='pl-3'>Attack: {pokemonInfo.attack}</p></div>
            <div className='flex items-center mb-3'><Image width={30} height={30} src='/306771.png' alt='8037103.png'/>
                <p className='pl-3'>Defense: {pokemonInfo.defense}</p></div>
            <div className='flex items-center mb-3'><Image width={30} height={30} src='/3969028-200.png'
                                                           alt='8037103.png'/>  <p className='pl-3'>Special
                attack: {pokemonInfo.specialAttack}</p></div>
            <div className='flex items-center mb-3'><Image width={30} height={30}
                                                           src='/defense-icon-435x512-f1cww4u8.png' alt='8037103.png'/>
                <p className='pl-3'>Special defense: {pokemonInfo.specialDefense}</p></div>
            <div className='flex items-center mb-3'><Image width={30} height={30} src='/download.png'
                                                           alt='download.png'/><p
                className='pl-3'>Speed: {pokemonInfo.speed}</p></div>
        </div>
    </>)
}
