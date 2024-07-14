import { z } from 'zod';

export const locationSchema = z.object({
  address: z.string(),
  city: z.string().optional(),
  country: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const phoneSchema = z.object({
  countryCode: z.string().optional(),
  phoneNumber: z
    .string()
    .min(9)
    .refine((val) => !val || /^[0-9]+$/.test(val), 'Phone number must be numeric'),
  type: z.enum(['mobile', 'home', 'work', 'fax', 'other']).default('mobile'),
  notes: z.string().optional(),
});

export const personSchema = z.object({
  id: z.number().optional(),
  firstname: z.string(),
  lastname: z.string(),
  gender: z.enum(['male', 'female']).optional(),
  birthday: z.date().optional(),
  phones: z.array(phoneSchema).optional(),
  locations: z.array(locationSchema).optional(),
});

export type PhoneSchema = z.infer<typeof phoneSchema>;
export type LocationSchema = z.infer<typeof locationSchema>;
