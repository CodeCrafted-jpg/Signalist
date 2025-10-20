'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputFields from '@/components/forms/inputFields'
import FooterLink from '@/components/forms/FooterLinks';
import { useRouter } from "next/navigation";
import { signInWithEmail } from '@/lib/actions/auth.action';

const SignIn = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });
   const onSubmit = async (data: SignInFormData) => {
         try {
              const result=signInWithEmail(data)
            if((await result).success)  router.push("/")
         } catch (error) {
             console.log(error)
         }
     }

  return (
    <div>
 <h1 className='form-title'>
                Sign In & Continue
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>

      <InputFields
        name="email"
        label="Email"
        placeholder="name@gmail.com"
        register={register}
        error={errors.email}
        validation={{ required: 'Email name is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
      />

      <InputFields
        name="password"
        label="Password"
        placeholder="Enter a strong password"
        type="password"
        register={register}
        error={errors.password}
        validation={{ required: 'Password is required', minLength: 8 }}
      />



      <Button type='submit' disabled={isSubmitting}
        className='yellow-btn w-full mt-5'>
        {isSubmitting ? 'Sign-in' : 'Login'}
      </Button>
       <FooterLink text="Already have an account?" linkText="Sign up" href="/sign-up" />
      </form>
    </div>
  )
}

export default SignIn
