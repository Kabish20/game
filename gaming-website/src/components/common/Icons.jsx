const Icon = ({ children, size = 20, className = "", ...props }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

export const SearchIcon = (props) => (
  <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.4-3.4" /></Icon>
);

export const HeartIcon = ({ filled = false, ...props }) => (
  <Icon {...props} fill={filled ? "currentColor" : "none"}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
  </Icon>
);

export const ArrowUpRightIcon = (props) => (
  <Icon {...props}><path d="M7 17 17 7" /><path d="M7 7h10v10" /></Icon>
);

export const ArrowRightIcon = (props) => (
  <Icon {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Icon>
);

export const PlayIcon = (props) => (
  <Icon {...props}><path d="m8 5 11 7-11 7Z" /></Icon>
);

export const MenuIcon = (props) => (
  <Icon {...props}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>
);

export const CloseIcon = (props) => (
  <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>
);

export const ChevronLeftIcon = (props) => (
  <Icon {...props}><path d="m15 18-6-6 6-6" /></Icon>
);

export const ChevronRightIcon = (props) => (
  <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>
);

export const GamepadIcon = (props) => (
  <Icon {...props}>
    <path d="M8.5 6h7a5.5 5.5 0 0 1 5.2 7.3l-1.1 3.1a2.4 2.4 0 0 1-4 1l-1.2-1.2H9.6l-1.2 1.2a2.4 2.4 0 0 1-4-1l-1.1-3.1A5.5 5.5 0 0 1 8.5 6Z" />
    <path d="M7 10v4M5 12h4M16 11h.01M18 13h.01" />
  </Icon>
);

export const CheckIcon = (props) => (
  <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>
);

export const UserIcon = (props) => (
  <Icon {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>
);

export const BoltIcon = (props) => (
  <Icon {...props}><path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" /></Icon>
);

export const CompassIcon = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></Icon>
);

export const TrophyIcon = (props) => (
  <Icon {...props}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4" /></Icon>
);

export const SparkIcon = (props) => (
  <Icon {...props}><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></Icon>
);

export const LayersIcon = (props) => (
  <Icon {...props}><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></Icon>
);
