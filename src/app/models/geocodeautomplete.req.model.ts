export interface GeocodeautompleteReqModel {
  text: string;
  "boundary.country"?: string;
   sources?: SourceType[];
   layers? : LayerType[];
}

export type SourceType = 'openstreetmap'|'openaddresses' |'whosonfirst'|'geonames';

export type LayerType= 'address'|'venue'|'neighbourhood'|'locality'|'borough'|'localadmin'|'county'|'macrocounty'|'region'|'macroregion'|'country'|'coarse';





export interface ParsedText {
  subject: string;
  locality: string;
}

export interface Lang {
  name: string;
  iso6391: string;
  iso6393: string;
  via: string;
  defaulted: boolean;
}

export interface Query {
  text: string;
  parser: string;
  parsed_text: ParsedText;
  size: number;
  layers: string[];
  private: boolean;
  lang: Lang;
  querySize: number;
}

export interface Engine {
  name: string;
  author: string;
  version: string;
}

export interface Geocoding {
  version: string;
  attribution: string;
  query: Query;
  warnings: string[];
  engine: Engine;
  timestamp: number;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Concordances {
  "fips:code": string;
  "gn:id": number;
  "gp:id": number;
  "hasc:id": string;
  "iso:id": string;
  "qs_pg:id": number;
  "unlc:id": string;
  "wd:id": string;
  "wk:page": string;
}

export interface Geonames {
  feature_code: string;
}

export interface Addendum {
  concordances: Concordances;
  geonames: Geonames;
}

export interface Properties {
  id: string;
  gid: string;
  layer: string;
  source: string;
  source_id: string;
  name: string;
  accuracy: string;
  country: string;
  country_gid: string;
  country_a: string;
  macroregion: string;
  macroregion_gid: string;
  region: string;
  region_gid: string;
  region_a: string;
  county: string;
  county_gid: string;
  localadmin: string;
  localadmin_gid: string;
  locality: string;
  locality_gid: string;
  continent: string;
  continent_gid: string;
  label: string;
  addendum: Addendum;
  county_a: string;
  neighbourhood: string;
  neighbourhood_gid: string;
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
  bbox: number[];
}

export interface GeocodeautompleteResModel {
  geocoding: Geocoding;
  type: string;
  features: Feature[];
  bbox: number[];
}



