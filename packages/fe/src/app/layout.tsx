"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import { Navbar } from "flowbite-react";
import "./globals.css";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

const NavbarLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <Navbar.Link href={href} active={pathname === href}>
      {children}
    </Navbar.Link>
  );
};

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>
          <Navbar fluid rounded>
            <Navbar.Brand as={Link} href="/">
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                OneGlass Forecasting
              </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <NavbarLink href="/forecasts">Forecasts</NavbarLink>
              <NavbarLink href="/stock">Stock Analysis</NavbarLink>
              <NavbarLink href="/low_sales">Low Sale Alerts</NavbarLink>
            </Navbar.Collapse>
          </Navbar>
          <main className="p-8">{children}</main>
        </body>
      </html>
    </QueryClientProvider>
  );
}
