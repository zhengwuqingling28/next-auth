import { connectToDatabase } from "@/data/db";
import { hashPassword } from "@/lib/hash";

interface ApiResponse {
  data: any;
  success?: boolean;
  message?: string;
}

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const { email, password } = data;

    // Validation
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      const response: ApiResponse = {
        data: null,
        success: false,
        message: "Invalid Input",
      };
      return new Response(JSON.stringify(response), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Connect to database
    const context = await connectToDatabase();
    if (!context) {
      throw new Error("Failed to connect to database");
    }
    const db = context.db();

    // Check email exist
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      const response: ApiResponse = {
        data: null,
        success: false,
        message: "Email already exists",
      };
      return new Response(JSON.stringify(response), {
        headers: { "Content-Type": "application/json" },
        status: 409,
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Add user to collection "users"
    const result = await db
      .collection("users")
      .insertOne({ email, hashedPassword });
    console.log("Insert result:", result);

    // Check result
    if (!result.acknowledged) {
      throw new Error("Insert failed");
    }

    const response: ApiResponse = {
      data,
      success: true,
    };

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const response: ApiResponse = {
      data: null,
      success: false,
      message: "Something went wrong",
    };
    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
};
