import React, { useState } from "react";
import { login as apiLogin } from "@/api/api";
import { useAuth } from "@/context/auth";
import { AuthPayload } from "@/context/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
import { SchemaLogin } from "@/lib/zodSchema";
import { login } from "@/types";
import { PasswordInput } from "@/components/ui/password-input";

const Login = () => {
  const form = useForm<login>({
    resolver: zodResolver(SchemaLogin),
  });

  const { login: contextLogin } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [error, setError] = useState<string | null>(null);
  // digunakan hanya menghindari warning Controlling an input with a state variable
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onSubmit = async (data: z.infer<typeof SchemaLogin>) => {
    try {
      // jika tidak maka gunakan dari state variable
      const authData: AuthPayload = await apiLogin(
        data.email || Email,
        data.password || Password
      );
      contextLogin(authData);
      navigate("/home"); // Navigate to home page on successful login
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const backendError =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(backendError);
    }
  };

  const handleRegisterNavigation = () => {
    navigate("/register"); // Navigate to register page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm mx-2">
        <CardHeader>
          <CardTitle className="mx-auto">Login</CardTitle>
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
                        value={field.value || Email}
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        value={field.value || Password}
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
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          {error && (
            <CardDescription className="mt-4 text-center text-red-600">
              {error}
            </CardDescription>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <span className="text-sm text-gray-500">
            Don't have an account?
            <button
              className="ml-1 text-blue-500 hover:underline"
              onClick={handleRegisterNavigation}
            >
              Register
            </button>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
