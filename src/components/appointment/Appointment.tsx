'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { appointmentFormSchema, type AppointmentFormValues } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { saveAppointment } from '@/services/appointment';
import { ProfileData } from '@/types/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface AppointmentProps {
  profileData: ProfileData;
  onClose?: () => void;
}

const Appointment = ({ profileData, onClose }: AppointmentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      time: '',
      comments: '',
      date: undefined,
    },
  });

  const onSubmit = async (values: AppointmentFormValues) => {
    try {
      setIsSubmitting(true);

      const selectedDate = values.date;
      const selectedTime = values.time.split('-')[0]; // Get starting hour

      if (!selectedDate || !selectedTime) {
        throw new Error('Please select both date and time');
      }

      const formattedDate = format(selectedDate, 'dd-MM-yyyy');
      const dateTime = `${formattedDate} ${selectedTime}`;

      await saveAppointment({
        card_id: profileData.card_id,
        name: values.name,
        mobile: values.phone,
        date_time: dateTime,
        comments: values.comments || '',
      });

      toast.success('Appointment booked successfully!');
      form.reset();
      onClose?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to book appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div>
        <div className="bg-[linear-gradient(180deg,_white_0%,_#EAEAEA_100%)] p-4 text-center rounded-[10px]">
          <Image
            src={profileData.profile_image}
            alt="profile"
            width={90}
            height={90}
            className="w-[90px] h-[90px] rounded-full border border-black mx-auto"
          />
          <h1 style={{ color: '#000' }} className="text-[22px] font-bold mt-2 mb-3">
            {profileData.name}
          </h1>

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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-left text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="min-h-[60px]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'h-12 w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                              form.formState.errors.date && 'border-red-500',
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                            // initialFocus
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-left text-xs mt-1" />
                  </FormItem>
                )}
              />

              {profileData.appointments.length > 0 && (
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="min-h-[60px]">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={cn('h-12', form.formState.errors.time && 'border-red-500')}>
                            <SelectValue placeholder="Select Time Slot" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {profileData.appointments.map((slot, index) => (
                            <SelectItem key={index} value={`${slot.starting_hour}-${slot.ending_hour}`}>
                              {slot.starting_hour} - {slot.ending_hour}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-left text-xs mt-1" />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem className="min-h-[60px]">
                    <FormControl>
                      <Textarea
                        placeholder="Comments"
                        className={cn(form.formState.errors.comments && 'border-red-500')}
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
                  backgroundColor: profileData.button_color || 'black',
                  color: profileData.text_color || 'white',
                }}
                className="uppercase h-12 w-full mt-2"
                variant="default"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Booking...' : 'Book Appointment'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
