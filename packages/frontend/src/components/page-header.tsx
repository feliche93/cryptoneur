import Balance from 'react-wrap-balancer'

import { cn } from '@/lib/utils'

function PageHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        'mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-20 lg:pb-18',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

interface PageHeaderHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

function PageHeaderHeading({ level = 'h1', className, ...props }: PageHeaderHeadingProps) {
  const HeadingTag = level
  return (
    <HeadingTag
      className={cn(
        'text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]',
        level === 'h2' && 'text-3xl md:text-5xl',
        level === 'h3' && 'text-2xl md:text-4xl',
        className,
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balance
      className={cn(
        'max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl',
        className,
      )}
      {...props}
    />
  )
}

function PageActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex w-full items-center justify-center space-x-4 py-4 md:pb-10', className)}
      {...props}
    />
  )
}

export { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading }
