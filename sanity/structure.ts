import type { StructureResolver } from "sanity/structure";

const SINGLETONS = [
  { id: "homepage", type: "homepage", title: "Home" },
  { id: "information", type: "information", title: "Information & Contact" },
  { id: "siteSettings", type: "siteSettings", title: "Site settings" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((single) =>
        S.listItem()
          .title(single.title)
          .id(single.id)
          .child(
            S.document().schemaType(single.type).documentId(single.id).title(single.title),
          ),
      ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
    ]);
