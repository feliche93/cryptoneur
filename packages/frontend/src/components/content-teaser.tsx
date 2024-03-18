import { client } from '@/hono/client'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { FC, PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'

export interface ContentTeaserProps extends PropsWithChildren<any> {
  onSubscribe: () => void // This should be the function that handles the subscription logic
}

const SSubscribe = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
})

export type TSubscribe = z.infer<typeof SSubscribe>

export const ContentTeaser: FC<ContentTeaserProps> = ({ children }) => {
  const { isLoaded: isLoadedSignIn, isSignedIn } = useAuth()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(SSubscribe),
    defaultValues: {
      email: '',
    },
  })

  if (isLoadedSignIn && isSignedIn) {
    // If the user is allowed, show the full content
    return <>{children}</>
  }

  async function onSubmit(values: TSubscribe) {
    const res = await client.api.clerk['invite-user'].$post({
      json: {
        emailAddress: values.email,
      },
    })

    if (!res.ok) {
      const error = await res.text()

      toast({
        title: 'Error',
        description: error,
      })

      return
    }

    toast({
      title: 'Success',
      description: 'You have been successfully subscribed',
    })
  }

  return (
    <Card className="my-4 flex flex-col items-center">
      <CardHeader>
        <CardTitle>Subscribe to continue reading.</CardTitle>
      </CardHeader>
      <CardContent>Become a free member to get access to all subscriber-only content.</CardContent>
      <CardFooter className="gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="w-60" placeholder="" type="email" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {form.formState.isSubmitting ? <Loader2Icon className="animate-spin size-2" /> : null}
              Subscribe
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  )
}

export default ContentTeaser
