import { defineArrayMember, defineField, defineType } from "sanity";
import { BatchTileInput } from "../components/BatchTileInput";

export const homepage = defineType({
  name: "homepage",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "gallery",
      title: "Gallery",
      description:
        "Drag to reorder. Rows are arranged automatically from each image's proportions.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "tile",
          fields: [
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "project",
              type: "reference",
              to: [{ type: "project" }],
              description: "Optional. Links this image to a project.",
            }),
          ],
          preview: {
            select: { media: "image", title: "project.title" },
            prepare: ({ media, title }) => ({ title: title ?? "Unlinked", media }),
          },
        }),
      ],
      components: { input: BatchTileInput },
    }),
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});
