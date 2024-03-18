'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useParams, useRouter } from 'next/navigation'
import { locales } from '../../i18n'

export function LanguageToggle() {
  const params = useParams()
  const router = useRouter()

  const locale = typeof params?.locale === 'string' ? params?.locale : 'en'

  const changeLanguage = (lang: string) => {
    router.push(`/${lang}`, {
      scroll: false,
    })
    router.refresh()
    // router.push(router.asPath, router.asPath, { locale: lang })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{locale}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((lang) => (
          <DropdownMenuItem key={lang} onClick={() => changeLanguage(lang)}>
            {lang}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
