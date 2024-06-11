import { signIn } from "next-auth/react";

interface AuthFormData {
  email: string;
  password: string;
}

export const register = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Form data is missing one or more fields");
  }

  const commentData: AuthFormData = { email, password };

  const res = await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(commentData),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log(data);
};

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
    callbackUrl: "/dashboard", // Replace "/dashboard" with your desired redirect URL
  });

  console.log(result);
};
