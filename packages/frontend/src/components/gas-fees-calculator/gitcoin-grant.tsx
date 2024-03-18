import { DirectusImage } from '@components/shared/directus-image'
import directus from '@lib/directus'
import { FC } from 'react'

interface Translation {
  gitcoin_title: string
}

interface Data {
  translations: Translation[]
  gitcoin_logo: {
    id: string
  }
}

// @ts-expect-error Server Component
export const GitcoinGrant: FC = async () => {
  const { translations, gitcoin_logo } = (await directus.singleton('gas_fees_calculator').read({
    fields: ['translations.gitcoin_title', 'gitcoin_logo.id'],
  })) as unknown as Data

  const translation = translations?.[0]

  if (!translation) {
    throw new Error('Translation not found')
  }

  const { gitcoin_title } = translation

  if (typeof gitcoin_title !== 'string') {
    throw new Error('Invalid translation format')
  }

  return (
    <div>
      <a
        href="https://gitcoin.co/grants/5753/gas-fees-calculator-multi-currency-network-txn-ty"
        target={'_blank'}
        rel="noopener noreferrer"
      >
        <div className="flex flex-col items-center">
          <p className="px-5 pt-5 text-center font-bold">{gitcoin_title}</p>
          <DirectusImage priority={true} id={gitcoin_logo.id} height={100} width={300} />
        </div>
      </a>
    </div>
  )
}
