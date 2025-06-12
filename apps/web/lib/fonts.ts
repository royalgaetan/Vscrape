import localFont from "next/font/local";

export const geistSans = localFont({
  src: [
    {
      path: "../public/fonts/geist/Geist-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../public/fonts/geist/Geist-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/geist/Geist-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/fonts/geist/Geist-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/fonts/geist/Geist-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../public/fonts/geist/Geist-ExtraBold.ttf",
      style: "normal",
      weight: "800",
    },
    {
      path: "../public/fonts/geist/Geist-ExtraLight.ttf",
      style: "normal",
      weight: "200",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

export const openSans = localFont({
  src: [
    {
      path: "../public/fonts/openSans/OpenSans-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../public/fonts/openSans/OpenSans-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/openSans/OpenSans-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../public/fonts/openSans/OpenSans-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../public/fonts/openSans/OpenSans-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../public/fonts/openSans/OpenSans-ExtraBold.ttf",
      style: "normal",
      weight: "800",
    },
  ],
  variable: "--font-open-sans",
  display: "swap",
});
