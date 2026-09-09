"use client";

import type { ArrayOfObjectsInputProps } from "sanity";
import { BatchUploadField } from "./BatchUploadField";
import { imageValue } from "./useBatchUpload";

export function BatchImageInput(props: ArrayOfObjectsInputProps) {
  return (
    <BatchUploadField
      props={props}
      label="Upload multiple images"
      buildItem={(assetId) => imageValue(assetId)}
    />
  );
}
