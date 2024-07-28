import React, { useState } from "react";
import { registerUser } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "@/components/ui/password-input";

export const registerUserSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z
      .string()
      .min(4, "Confirm password must be at least 4 characters"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

type RegisterFormValues = z.infer<typeof registerUserSchema>;

const Register = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerUserSchema),
  });

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  // digunakan hanya menghindari warning Controlling an input with a state variable
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (data: z.infer<typeof registerUserSchema>) => {
    try {
      const { username, email, password } = data;
      await registerUser({ name: username, email, password });
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const backendError = err.response?.data?.message;
      console.log(err.response?.data?.message);
      setError(backendError);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm mx-2">
        <CardHeader>
          <CardTitle className="mx-auto">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value || email}
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        onChange={(e) => {
                          field.onChange(e);
                          setEmail(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value || username}
                        placeholder="Username"
                        className="w-full"
                        onChange={(e) => {
                          field.onChange(e);
                          setUsername(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        value={field.value || password}
                        placeholder="Password"
                        className="w-full"
                        onChange={(e) => {
                          field.onChange(e);
                          setPassword(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        value={field.value || confirmPassword}
                        placeholder="Confirm Password"
                        className="w-full"
                        onChange={(e) => {
                          field.onChange(e);
                          setConfirmPassword(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
          {error && (
            <CardDescription className="mt-4 text-center text-red-600">
              {error}
            </CardDescription>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <span className="text-sm text-gray-500">
            Already have an account?
            <button
              className="ml-1 text-blue-500 hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
