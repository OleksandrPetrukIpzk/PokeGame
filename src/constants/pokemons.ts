import {Ability, ColorOfAbilities, FighterT} from "@/constants/types";
export const EMPTY_STRING = ''
export type Fighter = {
    name: string,
    img?: string,
    sumaryHp: number,
    sumaryAttack: number,
    speed: number,
    types?: any[]
}
export const COLOR_OF_ABILITIES: ColorOfAbilities = {
    normal: 'black',
    fighting: 'red',
    flying: 'aqua',
    poison: 'green',
    ground: 'brown',
    rock: 'gray',
    bug: 'yellow',
    ghost: '#C5CDD8',
    steel: '#ced3d4',
    fire: 'orange',
    water: 'blue',
    grass: '#7cf87c',
    electric: 'purple',
    psychic: 'pink',
    ice: ' #b9e8ea',
    dragon: '#0096b6',
    dark: '#282828',
    fairy: '#e5eec5',
    unknown: 'CadetBlue',
    shadow: '#c5c5c5'
}

export const SPECIFIC_OF_ABILITIES: ColorOfAbilities = {
    normal: 'damage',
    fighting: 'damage',
    flying: 'health',
    poison: 'damage',
    ground: 'health',
    rock: 'damage',
    bug: 'health',
    ghost: 'health',
    steel: 'damage',
    fire: 'damage',
    water: 'health',
    grass: 'health',
    electric: 'damage',
    psychic: 'health',
    ice: ' damage',
    dragon: 'damage',
    dark: 'damage',
    fairy: 'health',
    unknown: 'health',
    shadow: 'health'
}

export const DEFAULT_IMAGE:string = 'https://w7.pngwing.com/pngs/540/278/png-transparent-unown-pokemon-go-pokedex-poke-ball-formes-game-cat-like-mammal-carnivoran.png'

export const DEFAULT_LINK:string = 'https://pokeapi.co/api/v2/'

export const NUMBER_ZERO:number = 0;
export const NUMBER_ONE :number = 1;

export const BASE_URL:string = 'https://pokegame-backend-nest-production.up.railway.app/'

export const DEFAULT_TEMPLATE_FOR_FIGHT: FighterT = {
    name: '',
    sumaryAttack: 0,
    speed: 0,
    specialAttack: 0,
    sumaryHp: 0,
    specialDefence: 0,
    types: []
}

export const STYLES_FOR_MODAL:object = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};



export const WIN = 'Win';
export const LOSE = 'Lose';

export const NAME_OF_TOKEN = 'access_token'

export const COUNT_OF_POKEMONS = 1200;

export const DEFAULT_TEMPLATE_USER_FOR_FIGHT = {
    email: EMPTY_STRING,
    name: EMPTY_STRING,
    coins: NUMBER_ZERO,
    selectedPokemon: EMPTY_STRING,
    sumaryAttack: NUMBER_ZERO,
    sumaryHp: NUMBER_ZERO,
    speed: NUMBER_ZERO,
    userName: EMPTY_STRING,
    id: EMPTY_STRING,
    rang: 0,
    types: [],
    specialAttack: 0,
    specialDefence: 0
}

export const DEFAULT_POKEMON_INFO = {
    name: EMPTY_STRING,
    photoURL: EMPTY_STRING,
    altPhotoURL: EMPTY_STRING,
    height: NUMBER_ZERO,
    hp: NUMBER_ZERO,
    attack: NUMBER_ZERO,
    defense: NUMBER_ZERO,
    specialAttack: NUMBER_ZERO,
    specialDefense: NUMBER_ZERO,
    speed: NUMBER_ZERO
}

export const INITIAL_POKEMON = {
    sumaryHp: NUMBER_ZERO,
    sumaryAttack: NUMBER_ZERO,
    speed: NUMBER_ZERO,
}

export const ARR_OF_ICONS = [{
    hp: 100,
    value: '😈',
}, {
    hp: 75,
    value: '😡',
}, {
    hp: 50,
    value: '😨',
}, {
    hp: 35,
    value: '☹️',
},
    {
        hp: 15,
        value: '🥴',
    },
    {
        hp: 1,
        value: '💩',
    }];
