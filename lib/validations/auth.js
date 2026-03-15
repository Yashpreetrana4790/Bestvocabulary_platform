import z from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Validate login form data. Returns { success: true, data } or { success: false, errors: { email?: string[], password?: string[] } }.
 */
export function validateLogin(data) {
  const result = loginSchema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  const flattened = result.error.flatten();
  return { success: false, errors: flattened.fieldErrors };
}

/**
 * Validate register form data. Returns { success: true, data } or { success: false, errors: { fullName?, email?, password?, confirmPassword? } }.
 */
export function validateRegister(data) {
  const result = registerSchema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  const flattened = result.error.flatten();
  return { success: false, errors: flattened.fieldErrors };
}
