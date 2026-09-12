import { defineArrayMember, defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "gallery",
      title: "Projects",
      description:
        "One image or film per project, taken from the project's first image. Drag to reorder.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
    }),
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});
