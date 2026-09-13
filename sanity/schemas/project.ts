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
          { title: "Photography", value: "stills" },
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
      name: "films",
      title: "Films",
      description:
        "Drag to reorder. The first film's poster frame is used as the cover.",
      type: "array",
      hidden: ({ parent }) => parent?.kind !== "motion",
      of: [
        defineArrayMember({
          type: "object",
          name: "clip",
          title: "Film",
          fields: [
            defineField({
              name: "video",
              title: "File",
              type: "file",
              options: { accept: "video/mp4,video/webm" },
            }),
            defineField({
              name: "poster",
              title: "Poster frame",
              description:
                "Shown before the film plays. Sets the film's proportions.",
              type: "image",
            }),
            defineField({
              name: "tile",
              title: "Homepage loop",
              description:
                "Optional small version played in the homepage grid. Leave empty and the full film is used instead.",
              type: "file",
              options: { accept: "video/mp4,video/webm" },
            }),
          ],
          preview: {
            select: { media: "poster", filename: "video.asset.originalFilename" },
            prepare: ({ media, filename }) => ({
              title: filename ?? "Film",
              media,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      kind: "kind",
      media: "images.0",
      poster: "films.0.poster",
    },
    prepare: ({ title, kind, media, poster }) => ({
      title,
      subtitle: kind === "motion" ? "Film" : "Photography",
      media: kind === "motion" ? poster : media,
    }),
  },
});
