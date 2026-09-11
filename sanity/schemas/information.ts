import { defineArrayMember, defineField, defineType } from "sanity";

export const information = defineType({
  name: "information",
  title: "Information & Contact",
  type: "document",
  fields: [
    defineField({
      name: "intro",
      title: "Introduction",
      type: "array",
      of: [defineArrayMember({ type: "block", styles: [], lists: [] })],
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({ name: "representation", type: "string" }),
    defineField({ name: "studio", type: "string" }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "clients",
      description: "Drag to reorder.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "publications",
      description: "Drag to reorder.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "wave",
      title: "FO—Wave",
      type: "object",
      fields: [
        defineField({ name: "heading", type: "string", initialValue: "FO—Wave" }),
        defineField({
          name: "body",
          type: "array",
          of: [defineArrayMember({ type: "block", styles: [], lists: [] })],
        }),
        defineField({ name: "linkLabel", type: "string" }),
        defineField({ name: "linkUrl", type: "url" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Information & Contact" }) },
});
