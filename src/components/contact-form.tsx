'use client';

import { useForm as useFormspree } from '@formspree/react';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@gv-tech/ui-web';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';
import { useForm, type ControllerRenderProps } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [state, handleSubmitFormspree] = useFormspree('meezlzyn');
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uiControl = form.control as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uiForm = form as any;

  async function onSubmit(values: FormValues) {
    await handleSubmitFormspree(values);
  }

  if (state.succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center"
      >
        <CheckCircle2 className="text-primary mb-4 h-16 w-16" />
        <h3 className="font-outfit mb-2 text-2xl font-bold">Message Sent!</h3>
        <p className="text-muted-foreground">Thanks for reaching out. I&apos;ll get back to you soon.</p>
        <Button variant="ghost" onClick={() => window.location.reload()} className="mt-6">
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-border bg-card/50 mx-auto w-full max-w-2xl rounded-2xl border p-8 backdrop-blur-sm"
    >
      <div className="mb-8">
        <h2 className="font-outfit text-3xl font-bold">Get in touch</h2>
        <p className="text-muted-foreground">
          Tell me about the role, team, or problem — a few specifics help me respond faster.
        </p>
      </div>

      <Form {...uiForm}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={uiControl}
              name="name"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'name'> }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" suppressHydrationWarning {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={uiControl}
              name="email"
              render={({ field }: { field: ControllerRenderProps<FormValues, 'email'> }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" suppressHydrationWarning {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={uiControl}
            name="subject"
            render={({ field }: { field: ControllerRenderProps<FormValues, 'subject'> }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="How can I help you?" suppressHydrationWarning {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={uiControl}
            name="message"
            render={({ field }: { field: ControllerRenderProps<FormValues, 'message'> }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Role, team, problem space, timeline — whatever helps me help you..."
                    rows={6}
                    suppressHydrationWarning
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={state.submitting} className="w-full md:w-auto">
            {state.submitting ? 'Sending...' : 'Send Message'}
            {!state.submitting && <Send className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
