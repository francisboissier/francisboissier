import { defineArrayMember, defineField, defineType } from "sanity";
import { BatchImageInput } from "../components/BatchImageInput";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      initialValue: "stills",
      options: {
        list: [
          { title: "Stills", value: "stills" },
          { title: "Film", value: "motion" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      description: "Drag to reorder. The first image is used as the cover.",
      type: "array",
      hidden: ({ parent }) => parent?.kind !== "stills",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      components: { input: BatchImageInput },
    }),
    defineField({
      name: "video",
      title: "Film",
      type: "file",
      hidden: ({ parent }) => parent?.kind !== "motion",
      options: { accept: "video/mp4,video/webm" },
    }),
    defineField({
      name: "poster",
      title: "Poster frame",
      description: "Shown before the film plays. Sets the film's proportions.",
      type: "image",
      hidden: ({ parent }) => parent?.kind !== "motion",
    }),
  ],
  preview: {
    select: { title: "title", kind: "kind", media: "images.0", poster: "poster" },
    prepare: ({ title, kind, media, poster }) => ({
      title,
      subtitle: kind === "motion" ? "Film" : "Stills",
      media: kind === "motion" ? poster : media,
    }),
  },
});
