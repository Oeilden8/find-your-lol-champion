import { Champion, ChampionDetails } from '../types/Champions';
import { languageFormatter } from '../utils/formatter';
import { dataDragonBaseUrl, dataDragonVersionsUrl } from '../utils/url';

export const getDataDragonVersion = async () => {
  const response = await fetch(dataDragonVersionsUrl);
  if (response.ok) {
    return response.json() as Promise<string[]>;
  } else throw new Error(`error fetch version: ${response.status}`);
};

export const getChampionsList = async (version: string, language: string) => {
  const lang = languageFormatter(language);
  const response = await fetch(`${dataDragonBaseUrl}/${version}/data/${lang}/champion.json`);
  if (response.ok) {
    return response.json() as Promise<{ data: { [key: string]: Champion } }>;
  } else throw new Error(`error fetch championList: ${response.status}`);
};

export const getOneChampion = async (version: string, language: string, championId: string) => {
  const lang = languageFormatter(language);
  const response = await fetch(`${dataDragonBaseUrl}/${version}/data/${lang}/champion/${championId}.json`);
  if (response.ok) {
    return response.json() as Promise<{ data: { [key: string]: ChampionDetails } }>;
  } else throw new Error(`error fetch champion: ${response.status}`);
};
