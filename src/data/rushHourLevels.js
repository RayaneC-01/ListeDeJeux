export const GRID_SIZE = 6;
export const LOCAL_STORAGE_KEY = "rush_hour_progress";

export const NIVEAUX = [
  {
    id: 1,
    blocs: [
      { id: "rouge", x: 0, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 2, y: 1, longueur: 3, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 0, y: 0, longueur: 2, orientation: "horizontal", estCible: false },
    ],
  },
  {
    id: 2,
    blocs: [
      { id: "rouge", x: 1, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 0, y: 0, longueur: 3, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 3, y: 1, longueur: 3, orientation: "vertical", estCible: false },
      { id: "bloc3", x: 1, y: 0, longueur: 2, orientation: "horizontal", estCible: false },
    ],
  },
  {
    id: 3,
    blocs: [
      { id: "rouge", x: 0, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 2, y: 0, longueur: 3, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 2, y: 3, longueur: 2, orientation: "horizontal", estCible: false },
      { id: "bloc3", x: 4, y: 2, longueur: 3, orientation: "vertical", estCible: false },
    ],
  },
  {
    id: 4,
    blocs: [
      { id: "rouge", x: 1, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 0, y: 1, longueur: 2, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 3, y: 0, longueur: 3, orientation: "vertical", estCible: false },
      { id: "bloc3", x: 1, y: 4, longueur: 3, orientation: "horizontal", estCible: false },
    ],
  },
  {
    id: 5,
    blocs: [
      { id: "rouge", x: 0, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 2, y: 1, longueur: 2, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 2, y: 3, longueur: 2, orientation: "vertical", estCible: false },
      { id: "bloc3", x: 3, y: 2, longueur: 2, orientation: "horizontal", estCible: false },
    ],
  },
  {
    id: 6,
    blocs: [
      { id: "rouge", x: 1, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 0, y: 0, longueur: 3, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 3, y: 1, longueur: 2, orientation: "vertical", estCible: false },
      { id: "bloc3", x: 4, y: 3, longueur: 2, orientation: "horizontal", estCible: false },
    ],
  },
  {
    id: 7,
    blocs: [
      { id: "rouge", x: 0, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 2, y: 0, longueur: 3, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 3, y: 2, longueur: 3, orientation: "vertical", estCible: false },
    ],
  },
  {
    id: 8,
    blocs: [
      { id: "rouge", x: 1, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 3, y: 0, longueur: 3, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 0, y: 3, longueur: 2, orientation: "horizontal", estCible: false },
    ],
  },
  {
    id: 9,
    blocs: [
      { id: "rouge", x: 0, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 2, y: 2, longueur: 2, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 4, y: 1, longueur: 3, orientation: "vertical", estCible: false },
    ],
  },
  {
    id: 10,
    blocs: [
      { id: "rouge", x: 1, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 3, y: 1, longueur: 3, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 0, y: 4, longueur: 3, orientation: "horizontal", estCible: false },
    ],
  },
  {
    id: 11,
    blocs: [
      { id: "rouge", x: 0, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 2, y: 0, longueur: 2, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 4, y: 2, longueur: 2, orientation: "vertical", estCible: false },
    ],
  },
  {
    id: 12,
    blocs: [
      { id: "rouge", x: 1, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 3, y: 2, longueur: 2, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 1, y: 0, longueur: 3, orientation: "horizontal", estCible: false },
    ],
  },
  {
    id: 13,
    blocs: [
      { id: "rouge", x: 0, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 2, y: 1, longueur: 3, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 4, y: 0, longueur: 3, orientation: "vertical", estCible: false },
    ],
  },
  {
    id: 14,
    blocs: [
      { id: "rouge", x: 1, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 3, y: 1, longueur: 2, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 0, y: 1, longueur: 2, orientation: "horizontal", estCible: false },
    ],
  },
  {
    id: 15,
    blocs: [
      { id: "rouge", x: 0, y: 2, longueur: 2, orientation: "horizontal", estCible: true },
      { id: "bloc1", x: 2, y: 0, longueur: 3, orientation: "vertical", estCible: false },
      { id: "bloc2", x: 3, y: 2, longueur: 2, orientation: "vertical", estCible: false },
      { id: "bloc3", x: 1, y: 5, longueur: 3, orientation: "horizontal", estCible: false },
    ],
  },
];