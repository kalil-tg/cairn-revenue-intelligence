import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function BaseIcon({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  )
}

export function ArrowIcon(props: IconProps) {
  return <BaseIcon {...props}><path d="M5 12h14M14 7l5 5-5 5" /></BaseIcon>
}

export function PlayIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M7.5 4.7v14.6L19 12 7.5 4.7Z" /></svg>
}

export function ChevronIcon(props: IconProps) {
  return <BaseIcon {...props}><path d="m8 10 4 4 4-4" /></BaseIcon>
}

export function PersonIcon(props: IconProps) {
  return <BaseIcon {...props}><circle cx="12" cy="8" r="3.2" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></BaseIcon>
}

export function TagIcon(props: IconProps) {
  return <BaseIcon {...props}><path d="M20 13 13 20l-9-9V4h7l9 9Z" /><circle cx="8.5" cy="8.5" r="1" /></BaseIcon>
}

export function CalendarIcon(props: IconProps) {
  return <BaseIcon {...props}><path d="M5 5h14v15H5zM8 3v4M16 3v4M5 9h14" /></BaseIcon>
}

export function ClockIcon(props: IconProps) {
  return <BaseIcon {...props}><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></BaseIcon>
}

export function CloseIcon(props: IconProps) {
  return <BaseIcon {...props}><path d="m6 6 12 12M18 6 6 18" /></BaseIcon>
}

export function ActivityIcon({ type, ...props }: IconProps & { type: string }) {
  if (type === 'phone') return <BaseIcon {...props}><path d="M6.8 3.8 10 7 8.2 9.3c1.2 2.7 3.4 4.9 6.1 6.1l2.3-1.8 3.2 3.2-1.6 3c-.3.6-1 .9-1.7.8C9.8 19.4 4.6 14.2 3.4 7.5c-.1-.7.2-1.4.8-1.7l2.6-2Z" /></BaseIcon>
  if (type === 'mail') return <BaseIcon {...props}><path d="M3 6h18v12H3zM3 7l9 7 9-7" /></BaseIcon>
  if (type === 'chart') return <BaseIcon {...props}><path d="M5 19V9M12 19V5M19 19v-7" /></BaseIcon>
  if (type === 'card') return <BaseIcon {...props}><path d="M3 5h18v14H3zM3 9h18M7 14h4" /></BaseIcon>
  return <BaseIcon {...props}><path d="M12 5v14M8 8.5a5 5 0 0 0 0 7M16 8.5a5 5 0 0 1 0 7M5 6a9 9 0 0 0 0 12M19 6a9 9 0 0 1 0 12" /></BaseIcon>
}
