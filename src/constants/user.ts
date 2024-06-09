import {EMPTY_STRING, NUMBER_ZERO} from "@/constants/pokemons";
import {IUser} from "@/models/user";

// @ts-ignore
export const INITIAL_USER: IUser = {
    id: EMPTY_STRING,
    name: EMPTY_STRING,
    email: EMPTY_STRING,
    password: EMPTY_STRING,
    img: EMPTY_STRING,
    selectedPokemon: EMPTY_STRING,
    coins: NUMBER_ZERO,
    rang: NUMBER_ZERO,
    stageInOfflineArena: NUMBER_ZERO,
    arrPokemons: [],
    arrAchives: [],
    arrPotions: []
}

export const POTIONS = [
    {id: 1, name: 'Skip battle', count: 1},
    {id: 2, name: 'Double health', count: 1},
    {id: 3, name: 'Double damage', count: 1},
    {id: 4, name: 'Double rang', count: 1},
    {id: 5, name: 'Auto win', count: 1},
    {id: 6, name: 'Double coins', count: 1},
    {id: 7, name: 'Spike armor', count: 1}];

export const IMAGE_POTIONS = [
    {id: 1, image: 'https://png.pngtree.com/png-clipart/20220328/original/pngtree-blue-potion-crystal-bottle-png-image_7485719.png'},
    {id: 2, image: 'https://cdn3d.iconscout.com/3d/premium/thumb/red-potion-7256465-5915032.png'},
    {id: 3, image: 'https://atlas-content-cdn.pixelsquid.com/stock-images/potion-bottle-oJBADaE-600.jpg'},
    {id: 4, image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/8/87/Potion_of_Leaping_JE2_BE2.png/revision/latest?cb=20191027040723'},
    {id: 5, image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/75/Water_Bottle_JE2_BE2.png/revision/latest/thumbnail/width/360/height/360?cb=20191027055423'},
    {id: 6, image: 'https://cdn.apexminecrafthosting.com/img/uploads/2020/11/27214716/potion-large.png'},
    {id: 7, image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3e/Potion_of_Healing_JE2_BE2.png/revision/latest?cb=20191027040649'}
]

export const RANG_FOR_WIN = 20;
