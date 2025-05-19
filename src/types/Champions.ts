interface ChampionImage {
  full: string;
  sprite: string;
  group?: string;
}

export interface ChampionSpell {
  id?: string;
  name: string;
  description: string;
  image: ChampionImage;
  ressource?: string;
}

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: { attack: number; defense: number; magic: number; difficulty: number };
  image: ChampionImage;
  tags: string[];
  partype: string;
}

export interface ChampionDetails extends Champion {
  skins: { id: string; num: number; name: string; chromas: boolean }[];
  spells: ChampionSpell[];
  passive: ChampionSpell;
}
