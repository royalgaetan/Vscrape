import { geistSans } from "@/lib/fonts";
import "./globals.css";
import { appName } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AppDialogProvider } from "@/providers/appDialogProvider";
import { AuthProvider } from "@/providers/authProvider";
import { PanSidebarProvider } from "@/providers/panSidebarProvider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>{appName}</title>
        <meta
          name="description"
          content="Take automation to the next level: create workflows, scrape the web while you sleep, extract data with AI, and export it in any format."
        ></meta>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/dheereshagrwal/coloured-icons@1.8.7/src/app/ci.min.css"
        />
      </head>
      <body
        className={cn(
          `${geistSans.variable} antialiased`,
          "h-full w-full flex flex-1 justify-center items-center"
        )}
      >
        <AuthProvider>
          <AppDialogProvider>
            <PanSidebarProvider>{children}</PanSidebarProvider>
          </AppDialogProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
