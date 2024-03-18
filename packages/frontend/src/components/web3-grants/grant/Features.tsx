import {
  BanknotesIcon,
  ChartBarIcon,
  ListBulletIcon,
  TicketIcon,
} from '@heroicons/react/24/outline'
import { FC } from 'react'

export const Features: FC = () => {
  const features = [
    {
      name: 'Turnierkalender',
      description:
        'Suche nicht auf verschiedenen Webseiten nach interessanten Pokerturnieren. Pokermatching.com gibt Dir einen vollständigen Überblick und eine mobil-optimierte Übersicht über alle Turniere mit verschiedenen Filtermöglichkeiten.',
      icon: ListBulletIcon,
    },
    {
      name: 'Einfache Turnieranmeldung und Payout-Auszahlung',
      description:
        'Keine Wartezeiten an der Kasse für die Anmeldung und das Bezahlen Deines Turnier Buy-Ins. Registrier Dich und bezahle einfach digital. Lass Dir Dein Preisgeld auch digital auszahlen.',
      icon: TicketIcon,
    },
    {
      name: 'Turnierergebnisse und -statistiken',
      description:
        'Du kannst sowohl Deine eigene Performance als auch allgemeine Turnierergebnisse und -statistiken einsehen, ohne viel herumzuklicken. Dein Dashboard verschafft Dir einen transparenten Überblick über Deine Bankroll und Deine Pokerreise.',
      icon: ChartBarIcon,
    },
    {
      name: 'Finde Deinen Staker und stärke Deine Bankroll',
      description:
        'Du bist auf der Suche nach einem Staker, damit Du die nächste Turnierserie spielen kannst? Pokermatching.com bringt Dich in Kontakt mit spannenden Stakern. Die Rahmenbedingungen, das Payment und das Teilen der Turnierergebnisse - all das haben wir so einfach gemacht, wie noch nie.',
      icon: BanknotesIcon,
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
      <div className="sm:text-center">
        <h2 className="py-2 text-lg font-semibold leading-8 text-secondary-content">
          Digital, mobil und einfach
        </h2>
        <p className="mt-2 font-bold tracking-tight text-primary sm:text-4xl">
          Die beste App für Pokerspieler
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-base-content/80">
          Pokermatching.com ist von Pokerspielern für Pokerspieler entwickelt worden. Die mobile
          Plattform, die Du Dir als Pokerspieler immer gewünscht hast.
        </p>
      </div>

      <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-content sm:shrink-0">
                <feature.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="sm:min-w-0 sm:flex-1">
                <p className="text-lg font-semibold leading-8 text-primary">{feature.name}</p>
                <p className="mt-2 text-base leading-7 text-base-content/80">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
