"use client";

import type { ArrayOfObjectsInputProps } from "sanity";
import { BatchUploadField } from "./BatchUploadField";
import { imageValue } from "./useBatchUpload";

export function BatchTileInput(props: ArrayOfObjectsInputProps) {
  return (
    <BatchUploadField
      props={props}
      label="Upload multiple images"
      buildItem={(assetId) => ({
        _type: "tile",
        image: imageValue(assetId),
      })}
    />
  );
}
