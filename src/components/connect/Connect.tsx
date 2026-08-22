'use client';

import ProfileImage from '@/assets/images/profile.png';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { connectFormSchema, type ConnectFormValues } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { saveContact } from '@/services/contact';
import { type ProfileData } from '@/types/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
interface ConnectProps {
  profile: ProfileData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Connect = ({ profile, open, onOpenChange }: ConnectProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ConnectFormValues>({
    resolver: zodResolver(connectFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      jobTitle: '',
      company: '',
      notes: '',
    },
  });

  const onSubmit = async (values: ConnectFormValues) => {
    try {
      setIsSubmitting(true);
      await saveContact(profile.card_id, values);
      toast.success('Contact information saved successfully!');
      form.reset();
    } catch (error) {
      console.error('Error saving contact:', error);
      toast.error('Failed to save contact information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] bg-[linear-gradient(180deg,_white_0%,_#EAEAEA_100%)] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Connect</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="text-black">
                <div className="p-4 text-center rounded-[10px]">
                  <Image
                    src={profile.profile_image || ProfileImage}
                    alt={profile.name}
                    width={90}
                    height={90}
                    className="w-[90px] h-[90px] rounded-full border border-black mx-auto object-cover"
                  />
                  <p className="text-center text-base font-semibold capitalize mt-3">
                    Share your info back with
                    <br />
                    {profile.name
                      ?.replace(/\\n/g, '\n')
                      .split('\n') // then split on actual newlines
                      .map((line, index, array) => (
                        <React.Fragment key={index}>
                          {line}
                          {index < array.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                  </p>
                  {profile.designation && (
                    <p className="text-center text-sm mt-1 opacity-60">
                      {profile.designation
                        ?.replace(/\\n/g, '\n')
                        .split('\n')
                        .map((line, index, array) => (
                          <React.Fragment key={index}>
                            {line}
                            {index < array.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                    </p>
                  )}
                  <hr className="border border-black/10 mt-3 mb-4" />

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="min-h-[60px]">
                            <FormControl>
                              <Input
                                placeholder="Name"
                                className={cn('h-12', form.formState.errors.name && 'border-red-500')}
                                disabled={isSubmitting}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-left text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="min-h-[60px]">
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="Phone"
                                className={cn('h-12', form.formState.errors.phone && 'border-red-500')}
                                disabled={isSubmitting}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-left text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="min-h-[60px]">
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Email"
                                className={cn('h-12', form.formState.errors.email && 'border-red-500')}
                                disabled={isSubmitting}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-left text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem className="min-h-[60px]">
                            <FormControl>
                              <Input
                                placeholder="Job Title"
                                className={cn('h-12', form.formState.errors.jobTitle && 'border-red-500')}
                                disabled={isSubmitting}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-left text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem className="min-h-[60px]">
                            <FormControl>
                              <Input
                                placeholder="Company"
                                className={cn('h-12', form.formState.errors.company && 'border-red-500')}
                                disabled={isSubmitting}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-left text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="min-h-[60px]">
                            <FormControl>
                              <Textarea
                                placeholder="Notes On This Interaction"
                                className={cn(form.formState.errors.notes && 'border-red-500')}
                                disabled={isSubmitting}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-left text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        style={{
                          backgroundColor: profile.button_color || 'black',
                          color: profile.text_color || 'white',
                        }}
                        className="uppercase h-12 w-full mt-2"
                        variant="default"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Saving...' : 'Connect'}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Connect;
