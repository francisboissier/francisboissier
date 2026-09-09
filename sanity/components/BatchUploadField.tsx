"use client";

import { useRef } from "react";
import { Button, Stack, Text } from "@sanity/ui";
import type { ArrayOfObjectsInputProps } from "sanity";
import { useBatchUpload, type ItemBuilder } from "./useBatchUpload";

export function BatchUploadField({
  props,
  buildItem,
  label,
}: {
  props: ArrayOfObjectsInputProps;
  buildItem: ItemBuilder;
  label: string;
}) {
  const field = useRef<HTMLInputElement>(null);
  const { upload, progress, failed } = useBatchUpload(props, buildItem);

  return (
    <Stack gap={3}>
      {props.renderDefault(props)}

      <Stack gap={2}>
        <input
          ref={field}
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          onChange={(event) => {
            void upload(event.currentTarget.files);
            event.currentTarget.value = "";
          }}
        />

        <Button
          mode="ghost"
          disabled={progress !== null}
          text={
            progress
              ? `Uploading ${progress.done} / ${progress.total}…`
              : label
          }
          onClick={() => field.current?.click()}
        />

        {failed > 0 && (
          <Text size={1} muted>
            {failed} file{failed === 1 ? "" : "s"} could not be uploaded.
          </Text>
        )}
      </Stack>
    </Stack>
  );
}
