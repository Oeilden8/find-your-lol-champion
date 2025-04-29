import { championImageUrl, championLoadingImageUrl, dataDragonBaseUrl } from './url';

export const formatImageUrl = (championName: string, imageNumber: string) => {
  return `${championImageUrl}/${championName}_${imageNumber}.jpg`;
};

export const formatLoadingImageUrl = (championName: string, imageNumber: string) => {
  return `${championLoadingImageUrl}/${championName}_${imageNumber}.jpg`;
};

export const formatSquareImageUrl = (championName: string, version: string) => {
  return `${dataDragonBaseUrl}/${version}/img/champion/${championName}.png`;
};

export const formatPassiveImageUrl = (championName: string, version: string) => {
  return `${dataDragonBaseUrl}/${version}/img/passive/${championName}.png`;
};

export const formatSpellImageUrl = (spellName: string, version: string) => {
  return `${dataDragonBaseUrl}/${version}/img/spell/${spellName}.png`;
};

export const languageFormatter = (language: string) => {
  if (language === 'fr') {
    return 'fr_FR';
  } else return 'en_US';
};
