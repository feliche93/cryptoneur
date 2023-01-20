import { GraidentAvatar } from '@components/shared/GradientAvatar'
import Image from 'next/image'
import { FC } from 'react'

export const FoundersNote: FC = () => {
  return (
    <div className="mx-auto my-12 max-w-2xl overflow-hidden rounded-none bg-base-200 shadow sm:rounded-lg">
      <div className="space-y-8 px-4 py-5 text-2xl sm:p-6">
        <h3 className="font-bold text-primary">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </h3>
        <div className="text-lg text-base-content/80">
          <p>
            Lorem Ipsum has been the industry`&aposs standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <br />
          <p>
            It has survived not only five centuries, but also the leap into electronic typesetting,
          </p>
          <br />
          <p>
            It has survived not only five centuries, but also the leap into electronic typesetting,
          </p>
        </div>
      </div>
      <div className="bg-base-300 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-start">
          <GraidentAvatar alt="Samuel Ju" image="/home/Sam_Ju.jpeg" size={80} />
          <div className="ml-4 inline-block">
            <div className="text-xl font-bold text-base-content">Samuel Ju</div>
            <div className="text-base font-thin text-base-content">Co-Founder & CEO</div>
          </div>
        </div>
      </div>
    </div>
  )
}
