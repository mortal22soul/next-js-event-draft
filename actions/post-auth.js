"use server";

import { User } from "@/models/user.model";
import { connect } from "@/db";

export async function loginUser({ email, password }) {
  await connect();

  const user = await User.findOne({ email }).select(
    "+password +provider"
  );
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // If the user signed up with Google, skip password validation
  if (user.provider === "google") {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      provider: user.provider,
    };
  }

  // For credentials provider, validate the password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    provider: user.provider,
  };
}

export async function registerUser({
  name,
  email,
  password,
  provider = "credentials",
}) {
  await connect();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password:
      provider === "credentials" ? password : undefined, // Only set password for credentials provider
    provider,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    provider: user.provider,
  };
}
