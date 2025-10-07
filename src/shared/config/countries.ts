import { z } from "zod";

// Country list with ISO codes as keys
export const countries = {
  US: "United States",
  CA: "Canada",
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  BE: "Belgium",
  CH: "Switzerland",
  AT: "Austria",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  PL: "Poland",
  PT: "Portugal",
  GR: "Greece",
  IE: "Ireland",
  CZ: "Czech Republic",
  HU: "Hungary",
  RO: "Romania",
  BG: "Bulgaria",
  HR: "Croatia",
  SK: "Slovakia",
  SI: "Slovenia",
  LT: "Lithuania",
  LV: "Latvia",
  EE: "Estonia",
  LU: "Luxembourg",
  MT: "Malta",
  CY: "Cyprus",
  AU: "Australia",
  NZ: "New Zealand",
  JP: "Japan",
  KR: "South Korea",
  SG: "Singapore",
  HK: "Hong Kong",
  TW: "Taiwan",
  CN: "China",
  IN: "India",
  BR: "Brazil",
  MX: "Mexico",
  AR: "Argentina",
  CL: "Chile",
  CO: "Colombia",
  ZA: "South Africa",
  IL: "Israel",
  TR: "Turkey",
  AE: "UAE",
} as const;

// Extract country names for Zod enum
export const countryKeys = Object.keys(countries) as [
  CountryCode,
  ...CountryCode[],
];

// should on the backend as well
export const CountryEnum = z.enum(countryKeys);

export type Country = z.infer<typeof CountryEnum>;
export type CountryCode = keyof typeof countries;
