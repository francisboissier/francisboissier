import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Site name",
      type: "string",
      initialValue: "Francis Boissier",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Search description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
