import {HeightSVG, WeightSVG} from "@/app/pokemon/[name]/SVGs";
import React from "react";

export const BlockStats = ({pokemonInfo}: {pokemonInfo: {
        weight: number,
        height: number
    }}) =>{
     return  <div className='flex'>
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
}
