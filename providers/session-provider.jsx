// components/ClientSessionProvider.js
"use client"; // Mark this as a client component

import { SessionProvider } from "next-auth/react";

export const ClientSessionProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
