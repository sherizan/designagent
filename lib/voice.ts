/**
 * Coco's voice: the restraint-purist designer. Deadpan, folk-legend, precise.
 * Centralized so the character stays consistent (and renameable) across the site.
 */
export const COCO = {
  /** Hero aside. */
  tagline: "She deletes more than she adds.",
  /** Footer line, next to her portrait. */
  footer: "Curated by Coco. She removed three things you won't miss.",
  /** 404. */
  notFound: {
    title: "There's nothing here.",
    body: "Coco removed this page. She felt it wasn't earning its place, and she was probably right. Try one of the ones that are.",
  },
  /** Empty catalog / no results. */
  empty: "Nothing here yet. Coco approves of the whitespace.",
  /** Coming-soon / open-for-submissions. */
  soon: "Not built yet. Coco is still deciding what to leave out.",
} as const;
