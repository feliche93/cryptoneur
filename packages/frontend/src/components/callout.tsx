import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface CalloutProps {
  icon?: string
  title?: string
  children?: React.ReactNode
}

export function Callout({ title, children, icon, ...props }: CalloutProps) {
  return (
    <Alert {...props}>
      {icon && <p className="pb-2">{icon}</p>}
      {title && <AlertTitle className="py-2 font-semibold">{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}
