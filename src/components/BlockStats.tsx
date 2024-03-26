
import React from "react";
import {useTranslate} from "@tolgee/react";
import {HeightSVG, WeightSVG} from "@/components/SVGs";

export const BlockStats = ({pokemonInfo}: {pokemonInfo: {
        weight: number,
        height: number
    }}) =>{
    const {t} = useTranslate();
     return  <div className='flex'>
         <div className='pr-5 mr-5 border-r-2'>
             <div className='flex items-center mb-3'>
                 <WeightSVG/>
                 <p className='stats'>{pokemonInfo.weight} {t('Pokemon.KG')}</p>
             </div>
             <p className='name-stats'>{t('Pokemon.weight')}</p>
         </div>
         <div>
             <div className='flex items-center mb-3'>
                 <HeightSVG/>
                 <p className='stats'>{pokemonInfo.height} {t('Pokemon.m')}</p>
             </div>
             <p className='name-stats'>{t('Pokemon.height')}</p>
         </div>
     </div>
}
