"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function RegisterForm() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Image Section */}
        <div className="w-full sm:w-1/2 relative hidden sm:flex justify-center items-center">
          <Image
            src="/child.png"
            alt="Register"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
        {/* Form Section */}
        <div className="w-full sm:w-1/2 p-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">Register on Logophile</CardTitle>
              <h1 className="text-balance text-muted-foreground text-center">Welcome to the ocean of words</h1>

            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" placeholder="Enter your name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" required />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm your password" required />
                </div>
                <Button type="submit" className="w-full">Register</Button>
              </form>
              <div className="text-center mt-4">
                <span className=" text-sm">
                  Already have an account?{" "}
                  <a href="/login" className=" text-blue-500 hover:underline">
                    Login
                  </a>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
