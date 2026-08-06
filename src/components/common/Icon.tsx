type IconName =
  | "ball"
  | "cards"
  | "pack"
  | "search"
  | "menu"
  | "close"
  | "shield"
  | "check"
  | "copy"
  | "arrow"
  | "trend"
  | "spark"
  | "clock"
  | "database";

const paths: Record<IconName, React.ReactNode> = {
  ball: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 8 3-2 3 2-1 4h-4L9 8Zm1 4-3 3m7-3 3 3M12 6V3M7 15l-1 4m11-4 1 4" />
    </>
  ),
  cards: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="m9 8 3-2 3 2-1 4h-4L9 8Zm-7 8V6a2 2 0 0 1 2-2" />
    </>
  ),
  pack: (
    <>
      <path d="M6 3h12l2 4-2 14H6L4 7l2-4Z" />
      <path d="M4 7h16M9 11h6m-7 4h8" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  shield: (
    <path d="M12 3 4.5 6v5.5c0 4.8 3.2 8 7.5 9.5 4.3-1.5 7.5-4.7 7.5-9.5V6L12 3Z" />
  ),
  check: <path d="m5 12 4 4L19 6" />,
  copy: (
    <>
      <rect x="8" y="8" width="11" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2" />
    </>
  ),
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  trend: <path d="m4 17 5-5 4 3 7-8m-5 0h5v5" />,
  spark: (
    <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm7 12 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
