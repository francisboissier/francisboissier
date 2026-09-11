import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "francisboissier",
  deployment: { appId: "wbxic4gv0g529szeyeea83ab", autoUpdates: true },
});
