import "./globals.css";

export const metadata = {
  title: "Scroll-Driven Hero Section Animation | GSAP & Next.js",
  description: "A high-performance, scroll-driven interactive hero section animation built with Next.js, Tailwind CSS, and GSAP ScrollTrigger.",
  keywords: ["GSAP", "ScrollTrigger", "Next.js", "Tailwind CSS", "Scroll Animation", "Interactive UI"],
  authors: [{ name: "Frontend Engineer" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#08090D] text-gray-100 min-h-screen selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
