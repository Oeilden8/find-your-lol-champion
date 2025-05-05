import i18n from '../i18n';
import { Champion } from '../types/Champions';

export const findChampionTypes = (champions: Champion[]) => {
  const types: string[] = [];
  champions.map((champion) => {
    champion.tags.forEach((tag) => !types.includes(tag) && types.push(tag));
  });

  return types.map((type) => {
    const typeOption = { value: type, label: i18n.t([`types.${type}`, type]) };
    return typeOption;
  });
};
