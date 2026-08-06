import Image from "next/image";
import Link from "next/link";
import { primaryNavigation, siteConfig } from "@/config/site";
import styles from "@/style/layout/footer.module.css";

const legalNavigation = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Copyright", href: "/legal/copyright" },
  { label: "About Us", href: "/legal/about-us" },
  { label: "Contact Us", href: "/legal/contact-us" },
] as const;

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.main}`}>
        <div className={styles.brandColumn}>
          <Link
            className={styles.brand}
            href="/"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/images/logo.svg"
              alt="Spin a Soccer Card Wiki logo"
              width={86}
              height={64}
            />
            <span>
              <strong>SPIN A SOCCER CARD</strong>
              <small>PLAYER WIKI</small>
            </span>
          </Link>
          <p>{siteConfig.description}</p>
          <small className={styles.independent}>
            Independent, fan-made and built for players.
          </small>
        </div>

        <nav className={styles.navigation} aria-label="Footer navigation">
          <section aria-labelledby="footer-navigate">
            <h2 id="footer-navigate">Navigate</h2>
            <ul>
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-legal">
            <h2 id="footer-legal">Legal</h2>
            <ul>
              {legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} rel="noopener noreferrer nofollow">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </nav>
      </div>

      <div className={styles.copyrightBar}>
        <div className="container">
          <p>
            Copyright © {currentYear} {siteConfig.name}. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
