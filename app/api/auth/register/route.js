import { NextResponse } from "next/server";
import { registerUser } from "@/actions/post-auth";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, password, provider = "credentials" } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const user = await registerUser({ name, email, password, provider });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}