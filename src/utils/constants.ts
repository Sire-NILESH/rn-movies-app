export const productionComapnyIdsConst = {
  // Netflix: "145174,178464,171251,185004,186222,192478",
  Lucasfilm: 1,
  HBO: 3268,
  "Adult Swim": 6759,
  Miramax: 14,
  Paramount: 4,
  "Columbia Pictures": 5,
  "Village Roadshow Pictures": 79,
  "Cartoon Network": 7899,
  Pixar: 3,
  "Warner Bros": 17,
  "20th Century Fox": 25,
  "Metro-Goldwyn-Mayer": 21,
  "New Line Cinema": "12",
  "Universal Pictures": 33,
  "Lions Gate Films": 35,
  "Sony Pictures": 34,
  DreamWorks: "521",

  // DreamWorks: [
  //   7, 521, 3486, 15258, 42141, 73933, 114185, 114539, 125083, 144867, 183771,
  // ],
} as const;

export type TProductionCompany = typeof productionComapnyIdsConst;
// type TProductionCompany =
//   (typeof productionComapnyIdsConst)[keyof typeof productionComapnyIdsConst];

export const networkCompanyIdConst = {
  Netflix: 213,
  HBO: 49,
  FOX: 19,
  HULU: 453,
  "Amazon Prime": 1024,
  "Disney+": 2739,
  "Apple TV+": 2552,
  "Cartoon Network": 56,
  "Adult Swim": 80,
  AMC: 174,
  PBS: 14,
  CBS: 16,
  "History Tv": 65,
  "BBC One": 4,
  "BBC Two": 332,
  "Sky Atlantic": 1063,
  CuriosityStream: 2349,
  "National Geographic": 43,
  Discovery: 64,
  ShowTime: 67,
  ABC: 2,
  Nickelodeon: 13,
  "Toon Disney": 142,
  "Disney XD": 44,
  ANIMAX: 171,
  "The CW": 71,
  "Comedy Central": 47,
  Peacock: 3353,
  Starz: 318,
  "Disney Channel": 54,
} as const;

export type TNetworkCompany = typeof networkCompanyIdConst;

export const tvMediaType = {
  0: "Documentary",
  1: "News",
  2: "Miniseries",
  3: "Reality",
  4: "Scripted",
  5: "Talk Show",
  6: "Video",
} as const;

export type TTvMediaType = typeof tvMediaType;
