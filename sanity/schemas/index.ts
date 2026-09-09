import type { SchemaTypeDefinition } from "sanity";
import { homepage } from "./homepage";
import { information } from "./information";
import { project } from "./project";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  project,
  homepage,
  information,
  siteSettings,
];
