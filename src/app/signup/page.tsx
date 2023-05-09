"use client"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";

import { AuthContext } from "@/context/AuthContext";
import Input from "../components/Input/Input";

import sty from "../styles/sign.module.scss";
import Button from "../components/Button/Button";

const createUserFormSchema = z.object({
  username: z.string()
    .nonempty('Username is required')
    .transform(name => {
      return name.trim()
    }),
  email: z.string()
    .nonempty('E-mail is required')
    .email('E-mail invalid')
    .refine(email => {
      return email.endsWith('@etec.sp.gov.br')
    }, 'Email must be a valid institutional email'),
  password: z.string()
    .nonempty('Password is required')
    .min(6, 'Password needs at least 6 characteres'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export default function SignUpPage() {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const { signUp } = useContext(AuthContext);
  
  async function handleSignUp(data: CreateUserFormData) {
    
    try {
      await signUp(data);
    } catch (error) {
      console.log(error);
      console.log("Deu erro maninho");
    }

  }


  return (
    <>
        <main className={sty.main}>
          <div className={sty.container}>
            <h1>Create Your <span> Account</span></h1>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <Input
                register={register}
                name="username"
                width="480px" 
                placeholder="Username" 
                type="text" 
                id="user" 
                alt="Please fill out this field."
                error={errors.username ? true : false}
              />
              {errors.username && <span>{errors.username.message}</span>}
              <Input
                register={register}
                name="email"
                width="480px" 
                placeholder="Email" 
                type="text" 
                id="email" 
                alt="Please fill out this field."
                error={errors.email ? true : false}
              />
              {errors.email && <span>{errors.email.message}</span>}
              <Input 
                register={register}
                name="password"
                width="480px" 
                placeholder="Password" 
                type="password" 
                id="password" 
                alt="Please fill out this field." 
                error={errors.password ? true : false}
              />
              {errors.password && <span>{errors.password.message}</span>}
              <Button value="Sign up" id="signup"/>
            </form>
          </div>
        </main>
      </>
  )
}