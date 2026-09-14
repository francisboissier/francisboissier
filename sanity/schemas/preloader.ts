import { defineArrayMember, defineField, defineType } from "sanity";
import { BatchImageInput } from "../components/BatchImageInput";

export const preloader = defineType({
  name: "preloader",
  title: "Preloader",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      description:
        "Shown one after another before the homepage appears. Six to eight works well. Upright images pair up, wide ones sit on their own. Drag to reorder. Leave empty and the site opens without an introduction.",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      components: { input: BatchImageInput },
    }),
  ],
  preview: { prepare: () => ({ title: "Preloader" }) },
});
