import { Champion, ChampionDetails } from '../types/Champions';
import { dataDragonBaseUrl, dataDragonVersionsUrl } from '../utils/url';

export const getDataDragonVersion = async () => {
  const response = await fetch(dataDragonVersionsUrl);
  if (response.ok) {
    return response.json() as Promise<string[]>;
  } else throw new Error(`error fetch version: ${response.status}`);
};

export const getChampionsList = async (version: string, language: string) => {
  const response = await fetch(`${dataDragonBaseUrl}/${version}/data/${language}/champion.json`);
  if (response.ok) {
    return response.json() as Promise<{ data: { [key: string]: Champion } }>;
  } else throw new Error(`error fetch championList: ${response.status}`);
};

export const getOneChampion = async (version: string, language: string, championName: string) => {
  const response = await fetch(`${dataDragonBaseUrl}/${version}/data/${language}/champion/${championName}.json`);
  if (response.ok) {
    return response.json() as Promise<{ data: { [key: string]: ChampionDetails } }>;
  } else throw new Error(`error fetch champion: ${response.status}`);
};
