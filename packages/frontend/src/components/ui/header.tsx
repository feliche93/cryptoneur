import { cn } from '@/lib/utils'
import * as React from 'react'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  Title?: typeof Title
  Section?: typeof Section
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mx-auto max-w-xl text-center', className)} {...props} />
)) as React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<HTMLDivElement>> & {
  Title: typeof Title
  Section: typeof Section
}

Header.displayName = 'Header'

const Section = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-8 tracking-tight text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
)

Section.displayName = 'Header.Section'

const Title = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-2 text-3xl font-bold tracking-tight sm:text-4xl', className)}
      {...props}
    />
  ),
)

Title.displayName = 'Header.Title'

Header.Title = Title
Header.Section = Section

export { Header }
