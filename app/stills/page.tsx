import type { Metadata } from "next";
import { StillsView } from "../components/StillsView";
import { stillsGroups } from "../lib/projects";

export const metadata: Metadata = {
  title: "Stills, Francis Boissier",
};

export default function StillsPage() {
  return <StillsView groups={stillsGroups} />;
}
