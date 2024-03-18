interface LocaleRootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string | undefined
  }
}

export default function RootLayout({ children, params: { locale } }: LocaleRootLayoutProps) {
  return <>{children}</>
}
