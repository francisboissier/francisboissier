"use client";

import { useCallback, useState } from "react";
import { insert, setIfMissing, useClient, type ArrayOfObjectsInputProps } from "sanity";
import { apiVersion } from "../env";

const BATCH_SIZE = 5;

function uniqueKey() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().replace(/-/g, "").slice(0, 12)
    : Math.random().toString(36).slice(2, 14);
}

export type ItemBuilder = (assetId: string) => Record<string, unknown>;

export function useBatchUpload(
  props: ArrayOfObjectsInputProps,
  buildItem: ItemBuilder,
) {
  const client = useClient({ apiVersion });
  const { onChange } = props;
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(
    null,
  );
  const [failed, setFailed] = useState(0);

  const upload = useCallback(
    async (fileList: FileList | null) => {
      const files = Array.from(fileList ?? []);
      if (!files.length) return;

      setProgress({ done: 0, total: files.length });
      setFailed(0);
      onChange(setIfMissing([]));

      let done = 0;
      let errors = 0;

      for (let start = 0; start < files.length; start += BATCH_SIZE) {
        const slice = files.slice(start, start + BATCH_SIZE);
        const assets = await Promise.all(
          slice.map((file) =>
            client.assets
              .upload("image", file, { filename: file.name })
              .then((asset) => asset._id)
              .catch(() => null),
          ),
        );

        const uploaded = assets.filter((id): id is string => id !== null);
        errors += assets.length - uploaded.length;

        if (uploaded.length) {
          onChange(
            insert(
              uploaded.map((assetId) => ({
                _key: uniqueKey(),
                ...buildItem(assetId),
              })),
              "after",
              [-1],
            ),
          );
        }

        done += slice.length;
        setProgress({ done, total: files.length });
      }

      setFailed(errors);
      setProgress(null);
    },
    [buildItem, client, onChange],
  );

  return { upload, progress, failed };
}

export function imageValue(assetId: string) {
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: assetId },
  };
}
