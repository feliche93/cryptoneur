import { FC } from 'react'

export interface TestimonialsProps {}
export const Testimonials: FC<TestimonialsProps> = () => {
  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <p className="text-center text-lg font-semibold text-base-content/80">
        Working with the biggest web3 projects
      </p>
      <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:mt-8">
        <div className="col-span-1 flex justify-center rounded-lg bg-base-100 py-8 px-8">
          <img
            className="max-h-12"
            src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
            alt="Workcation"
          />
        </div>
        <div className="col-span-1 flex justify-center rounded-lg bg-base-100 py-8 px-8">
          <img
            className="max-h-12"
            src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg"
            alt="Mirage"
          />
        </div>
        <div className="col-span-1 flex justify-center rounded-lg bg-base-100 py-8 px-8">
          <img
            className="max-h-12"
            src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
            alt="Tuple"
          />
        </div>
        <div className="col-span-1 flex justify-center rounded-lg bg-base-100 py-8 px-8">
          <img
            className="max-h-12"
            src="https://tailwindui.com/img/logos/laravel-logo-gray-400.svg"
            alt="Laravel"
          />
        </div>
        <div className="col-span-1 flex justify-center rounded-lg bg-base-100 py-8 px-8">
          <img
            className="max-h-12"
            src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
            alt="StaticKit"
          />
        </div>
        <div className="col-span-1 flex justify-center rounded-lg bg-base-100 py-8 px-8">
          <img
            className="max-h-12"
            src="https://tailwindui.com/img/logos/statamic-logo-gray-400.svg"
            alt="Statamic"
          />
        </div>
      </div>
    </div>
  )
}
