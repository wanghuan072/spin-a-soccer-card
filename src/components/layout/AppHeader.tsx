"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNavigation, siteConfig } from "@/config/site";
import { Icon } from "@/components/common/Icon";
import styles from "@/style/layout/header.module.css";

export function AppHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="Spin a Soccer Card Wiki home"
        >
          <Image
            src="/images/logo.svg"
            alt="Spin a Soccer Card Wiki logo"
            width={54}
            height={40}
            priority
          />
          <span>
            <strong>SPIN A SOCCER CARD</strong>
            <small>PLAYER WIKI</small>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {primaryNavigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <div className={styles.navGroup} key={item.href}>
                <Link
                  className={active ? styles.active : undefined}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <Link
            className={styles.searchLink}
            href="/cards"
            aria-label="Search the card database"
          >
            <Icon name="search" size={18} />
            <span>Search</span>
          </Link>
          <a
            className={styles.playButton}
            href={siteConfig.robloxUrl}
            target="_blank"
            rel="noreferrer"
          >
            Play Now <Icon name="arrow" size={17} />
          </a>
          <button
            className={styles.menuButton}
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </div>

      <nav
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="container">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
