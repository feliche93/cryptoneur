import { cn } from '@/lib/utils'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Card } from './ui/card'
import { FadeIn } from './ui/fade-in'

const featuredTestimonial = {
  body: "Felix expertly guided our transition from Wordpress to Next.js, translating complex frontend concepts into clear terms. His detailed insights on SEO, from performance to meta tag nuances, were invaluable. He also advised on blog setup and CMS suitability for our needs, and efficiently assisted with integrations like Mailchimp. Felix's broad tech knowledge and business acumen make him an invaluable asset. I highly recommend him for his ability to merge technology and business insights to deliver real value.",
  author: {
    name: 'Perjan Duro',
    linkedinUrl: 'https://www.linkedin.com/in/perjanduro/',
    position: 'Co-Founder at MoneyCoach.ai',
    imageUrl:
      '/testimonials/perjan_duro.jpeg',
    logoUrl:
      'https://moneycoach.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmoneycoach-web-logo.ce5031e1.png&w=1920&q=75',
  },
}


const testimonialsData = [
  [
    [
      {
        body: "I collaborated with Felix on a project for DezentralizedFinance.com to create a scalable logo map SaaS tool. Felix was professional, timely, and efficient. He excelled in communication, adapting to my vision of integrating a prototype with Google Sheets. With his expertise, especially in image rendering with Vercel OG Image, he closely matched my expectations, needing only slight style adjustments. What stood out was Felix's understanding of my workflow and needs. The prototype's value for money is impressive, and I look forward to future projects with him. I highly recommend Felix for his exceptional work and client-focused approach, solidifying his freelancing reputation.",
        author: {
          name: 'Julian Richter',
          socialUrl: 'https://www.linkedin.com/in/richter-julian/',
          position: 'Founder at DezentralizedFinance.com',
          imageUrl:
            '/testimonials/julian_richter.jpeg',
        },
      },
      {
        body: 'This is an awesome blog post. Thanks!',
        author: {
          name: 'Michael Frieze',
          socialUrl:
            'https://www.reddit.com/r/nextjs/comments/174v2ua/comment/k4byz37/?utm_source=share&utm_medium=web2x&context=3/',
          position: '@u/michaelfrieze',
          imageUrl: '/testimonials/michaelfrieze.png',
        },
      },
    ],

    [
      {
        body: 'This is a good summary! I’m glad you enjoyed the book, and thanks for sharing your thoughts.',
        author: {
          name: 'Rob Walling',
          imageUrl:
            'https://m.media-amazon.com/images/S/amzn-author-media-prod/a2ivs540g924bgkqv9p5sjdm1v.jpg',
          socialUrl:
            'https://www.reddit.com/r/indiehackers/comments/15makjn/comment/jvg31jp/?utm_source=share&utm_medium=web2x&context=3',
          position: 'Author of the SaaS Playbook',
        },
      },
    ],
    [

      {
        body: 'Thank you very much for creating this article. I am a beginner with Next.js, and I found your piece extremely helpful. It also led me to explore the rest of your impressive blog 🤩',
        author: {
          name: 'Pierre Rognion',
          socialUrl:
            'https://www.linkedin.com/feed/update/urn:li:activity:7117758220042915840?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7117758220042915840%2C7121397129381568512%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287121397129381568512%2Curn%3Ali%3Aactivity%3A7117758220042915840%29',
          position: 'AI Manager @Twelve Consulting',
          imageUrl: '/testimonials/pierre-rognion.jpeg',
        },
      },
    ],
    [
      {
        body: "Many thanks for your detailed and informed advice on choosing a tech stack for our health startup. The level of detail in your assessment was unexpected and highly appreciated. Your checklist, with its clear and useful tips, has been invaluable—it pointed out things we hadn't thought of by ourselves.",
        author: {
          name: 'Daniel Biene',
          socialUrl: 'https://www.linkedin.com/in/danielbiene/',
          position: 'Digital Entrepreneur',
          imageUrl:
            '/testimonials/daniel_biene.jpeg',
        },
      },

      {
        body: 'As a recent bootcamp grad who is often overwhelmed by how much is out there and how the bar seems so much higher for a chance at employment, stuff like this is super helpful. Really appreciate it! It was nice to see some of my current frameworks included',
        author: {
          name: 'Due_Advisor925',
          socialUrl:
            'https://www.reddit.com/r/nextjs/comments/15fplwb/comment/jug0f4z/?utm_source=share&utm_medium=web2x&context=3',
          position: '@u/Due_Advisor925',
          imageUrl: '/testimonials/due_advisor_925.png',
        },
      },
      {
        body: '@felixvemmer thank you for the @lmsqueezy setup walk-through blog post you have! I was having a hard time figuring out how to test my webhooks locally and you saved me a bunch of time with your article!',
        author: {
          name: 'Dorian Develops',
          socialUrl: 'httpshttps://twitter.com/DorianDevelops',
          position: '@DorianDevelops',
          imageUrl:
            '/testimonials/dorian_develops.jpeg',
        },
      }
    ],
  ],
]


interface Testimonial extends PropsWithChildren { }

export default async function Testimonials({ children }: Testimonial) {
  return (
    <FadeIn className="relative isolate pb-16 pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {children}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <Card className="rounded-2xl shadow-lg sm:col-span-2 xl:col-start-2 xl:row-end-1">
            <blockquote className="p-6 text-lg font-semibold leading-7 tracking-tight sm:p-12 sm:text-xl sm:leading-8">
              <p>{`“${featuredTestimonial.body}”`}</p>
            </blockquote>
            <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t px-6 py-4 sm:flex-nowrap">
              <Avatar>
                <AvatarImage
                  src={featuredTestimonial.author.imageUrl}
                  alt={featuredTestimonial.author.name}
                />
                <AvatarFallback>{featuredTestimonial.author.name.substring(0, 2)}</AvatarFallback>
              </Avatar>

              <Link
                target="_blank"
                className="flex-auto"
                href={featuredTestimonial.author.linkedinUrl}
              >
                <div className="flex-auto">
                  <div className="font-semibold">{featuredTestimonial.author.name}</div>
                  <div className="text-muted-foreground">{`${featuredTestimonial.author.position}`}</div>
                </div>
              </Link>

              <img
                className="h-10 w-auto flex-none"
                src={featuredTestimonial.author.logoUrl}
                alt=""
              />
            </figcaption>
          </Card>
          {testimonialsData.map((columnGroup, columnGroupIdx) => (
            <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0 sm:col-span-2">
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={cn(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonialsData.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? 'xl:row-span-2'
                      : 'xl:row-start-1',
                    'space-y-8',
                  )}
                >
                  {column.map((testimonial) => (
                    <Card key={testimonial.author.socialUrl} className="rounded-2xl p-6 shadow-lg">
                      <blockquote className="">
                        <p>{`“${testimonial.body}”`}</p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4">
                        <Avatar>
                          <AvatarImage
                            src={testimonial.author?.imageUrl}
                            alt={testimonial.author.name}
                          />
                          <AvatarFallback>{testimonial.author.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <Link href={testimonial.author.socialUrl}>
                          <div className="font-semibold">{testimonial.author.name}</div>
                          <div className="text-muted-foreground">{`${testimonial.author.position}`}</div>
                        </Link>
                      </figcaption>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
