"use client"

import {CountrySelectField}from "@/components/forms/CountryPicker"
import FooterLink from "@/components/forms/FooterLinks"
import InputFields from '@/components/forms/inputFields'
import SelectFields from '@/components/forms/SelectFields'
import { Button } from '@/components/ui/button'
import { signUpWithEmail } from "@/lib/actions/auth.action"
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constamts'
import { useRouter } from "next/navigation"
import React from 'react'
import { useForm } from 'react-hook-form'

const SignUp = () => {
    const router=useRouter() 
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology',


        },
        mode: 'onBlur'

    },
    )
    const onSubmit = async (data: SignUpFormData) => {
        try {
             const result=signUpWithEmail(data)
           if((await result).success)  router.push("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h1 className='form-title'>
                Sign Up & Personalize
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                <InputFields
                    name="fullName"
                    label="Full Name"
                    placeholder="Jhon Doe"
                    register={register}
                    error={errors.fullName}
                    validation={{
                        required: 'Full name is required',
                        minLength: 2
                    }}
                />
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
                <CountrySelectField
                   name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />

                <SelectFields
                name='investmentGoals'
                label='Investment Goals'
                placeholder='Select your investment goals'
                options={INVESTMENT_GOALS}
                control={control}
                error={errors.investmentGoals}
                required
                 />
                    <SelectFields
                    name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your risk level"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                <SelectFields
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                



                <Button type='submit' disabled={isSubmitting}
                    className='yellow-btn w-full mt-5'>
                    {isSubmitting ? 'Create Account' : 'Start your investment journey'}
                </Button>
                 <FooterLink text="Already have an account?" linkText="Sign in" href="/sign-in" />
            </form>
        </>
    )
}

export default SignUp
