import type { Metadata } from "next";
import { Barlow_Condensed, Figtree } from "next/font/google";
import Script from "next/script";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { siteConfig } from "@/config/site";
import { pageTdk } from "@/seo/tdk";
import "@/style/globals.css";
import styles from "@/style/layout/app.module.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});
const body = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: pageTdk.home.title,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "games",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className={styles.skipLink} href="#main-content">
          Skip to main content
        </a>
        <div className={styles.shell}>
          <AppHeader />
          {children}
          <AppFooter />
        </div>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            setTimeout(function () {
              var script = document.createElement('script');
              script.async = true;
              script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1PXB22VRG3';
              document.head.appendChild(script);

              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1PXB22VRG3');
            }, 3000);
          `}
        </Script>
      </body>
    </html>
  );
}
