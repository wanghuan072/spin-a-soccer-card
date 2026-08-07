import { PageHero } from "@/components/common/PageHero";
import { siteConfig } from "@/config/site";
import styles from "@/style/page/legal/legal.module.css";

export type LegalKind = "about" | "contact" | "privacy" | "terms" | "copyright";

type LegalSection = {
  heading: string;
  paragraphs: string[];
  items?: string[];
};

const pages: Record<
  LegalKind,
  {
    eyebrow: string;
    title: string;
    description: string;
    sections: LegalSection[];
  }
> = {
  privacy: {
    eyebrow: "Legal · Privacy",
    title: "Privacy Policy",
    description:
      "How this independent player wiki handles technical information, external services, contact email and privacy questions.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "This website does not require an account and does not provide comments, direct messages or a submission form. You can browse the public pages without giving us your name, address, telephone number or Roblox account information.",
          "The public card, pack, code and guide pages do not ask you to submit gameplay inventories, trade lists, passwords or Roblox account credentials.",
        ],
      },
      {
        heading: "Technical and usage information",
        paragraphs: [
          "Like most websites, the hosting provider may process basic technical records such as an IP address, browser type, device type, requested URL, referring page and request time. These records may be used to deliver the website, maintain security, investigate errors and prevent abusive traffic.",
          "The site may use third-party measurement or delivery services that process device and usage information under their own terms. Those services are used to understand page performance, maintain the site and measure general traffic rather than to create a public player profile.",
        ],
      },
      {
        heading: "Cookies and local storage",
        paragraphs: [
          "The current site does not use a user-account cookie. Browser settings, hosting infrastructure or future third-party services may use cookies or similar storage for essential delivery, security, measurement or preference features.",
          "You can restrict or clear browser storage through your browser settings. Doing so may reset local preferences or measurement identifiers but should not prevent access to the public site content.",
        ],
      },
      {
        heading: "External links and children",
        paragraphs: [
          "Pages may link to Roblox, YouTube and other independent websites for further reading. Those services operate under their own privacy policies, and this website does not control how they process information after you leave our pages.",
          "This site is a general fan reference and is not designed to knowingly collect personal information from children. A parent or guardian who believes a child has sent personal information by email may contact us to request review and deletion.",
        ],
      },
      {
        heading: "Retention, security and policy changes",
        paragraphs: [
          "Emails are retained only as long as reasonably needed to review a correction, respond to the sender, document a rights request or meet a legal obligation. No online system can guarantee absolute security, so do not send passwords, payment data, government identifiers or other sensitive information.",
          "This policy may be revised when the website, hosting arrangement or applicable requirements change. The updated text and review date published on this page will replace earlier versions.",
        ],
      },
    ],
  },
  terms: {
    eyebrow: "Legal · Terms",
    title: "Terms of Service",
    description:
      "The rules and limitations that apply when using this fan-made game database, its written content and external links.",
    sections: [
      {
        heading: "Acceptance and purpose",
        paragraphs: [
          "By accessing this website, you agree to use it in accordance with these Terms of Service and applicable law. If you do not agree, you should stop using the site.",
          "The website is an unofficial informational resource. It is intended to help players understand publicly documented cards, packs, codes, game systems and version changes; it is not an official game service or a substitute for the current in-game interface.",
        ],
      },
      {
        heading: "Accuracy and version-dependent information",
        paragraphs: [
          "Game prices, availability, codes, rewards, interfaces and progression requirements may change without notice. Dates show the game version covered by an entry, but they do not guarantee that the same information remains current in every server or region.",
          "Community values and trade observations are estimates or historical records. They are not official prices, guaranteed returns, financial advice or a promise that another player will accept a trade.",
        ],
      },
      {
        heading: "Permitted use",
        paragraphs: [
          "You may read, bookmark and link to public pages for personal, non-commercial reference. Short quotations may be used with clear attribution and a link to the relevant page.",
        ],
        items: [
          "Do not use the site to distribute cheats, malicious scripts, stolen accounts or instructions that bypass Roblox or game security.",
          "Do not impersonate this website, its editors, Roblox, the game creator or another player.",
          "Do not scrape, overload or disrupt the site in a way that interferes with normal access.",
          "Do not present community estimates or historical records as official game data.",
        ],
      },
      {
        heading: "Third-party services and links",
        paragraphs: [
          "The site may link to Roblox, YouTube and other third-party websites. A link is provided for convenience and does not mean we control, endorse or guarantee the external service, its availability or its content.",
          "Any Roblox purchase, game pass, trade or account action is completed through the relevant third-party service and is governed by that service's terms. We do not process Robux purchases or account credentials.",
        ],
      },
      {
        heading: "Disclaimers and limitation of liability",
        paragraphs: [
          "The website is provided on an “as available” basis without warranties of uninterrupted access, error-free content or fitness for a particular purpose, to the extent permitted by law.",
          "To the extent permitted by law, the site owner will not be liable for losses arising from reliance on outdated game data, trade decisions, external websites, service interruptions or unauthorized use of a Roblox account.",
        ],
      },
    ],
  },
  copyright: {
    eyebrow: "Legal · Rights",
    title: "Copyright and Fan Content",
    description:
      "Ownership, attribution and the process for reporting material that should be corrected, credited differently or removed.",
    sections: [
      {
        heading: "Website content",
        paragraphs: [
          "Original page layouts, game notes, explanatory writing, data organization and locally created interface elements on this website are protected by applicable copyright law unless stated otherwise.",
          "You may link to the site and quote limited portions for commentary or reference. Republishing substantial page content, recreating the database wholesale or removing attribution requires prior written permission.",
        ],
      },
      {
        heading: "Game names, marks and media",
        paragraphs: [
          "Roblox, Spin a Soccer Card, game artwork, character imagery, logos and related marks belong to their respective owners. Their appearance is for identification, commentary, documentation and fan-reference purposes and does not imply sponsorship or endorsement.",
          "Where practical, entries identify a public page, official media item or dated gameplay video relevant to a claim. Third-party material remains subject to the rights and terms of its owner.",
        ],
      },
      {
        heading: "Independent fan-site status",
        paragraphs: [
          "This website is independently operated and is not affiliated with, authorized by or endorsed by Roblox Corporation, Pixellar Studios or another rights holder mentioned in the content.",
          "Site descriptions are written to add context and analysis rather than replace the original game, video or promotional work.",
        ],
      },
      {
        heading: "Copyright or removal requests",
        paragraphs: [
          "A rights holder or authorized representative may request review of specific material by email. Include the page URL, the material concerned, a description of the protected work, the requested action and a reliable way to confirm your authority to act.",
          "We may ask for clarification before changing a record. Valid requests will be reviewed in good faith, and material may be corrected, credited, restricted or removed as appropriate.",
        ],
      },
    ],
  },
  about: {
    eyebrow: "About · Independent Wiki",
    title: "About Us",
    description:
      "Why this player wiki exists, what it covers and how it separates current game details from outdated claims.",
    sections: [
      {
        heading: "Our purpose",
        paragraphs: [
          "Spin a Soccer Card Wiki is an independent, fan-made reference built for players who want useful answers without having to guess whether a code, card name, pack price or progression table came from the current game version.",
          "The site brings cards, packs, guides, update notes and progression records into one searchable structure. Its purpose is to make version differences visible, not to present every community claim as settled fact.",
        ],
      },
      {
        heading: "What we cover",
        paragraphs: [
          "Coverage focuses on information that helps a player make an in-game decision or understand a documented system.",
        ],
        items: [
          "Card names, ratings, positions, rarity labels, displayed income and known acquisition routes.",
          "Pack costs, stock, unlock notes, documented pulls and historical availability.",
          "Codes, rebirths, mutations, game passes, trading systems and update history.",
          "Practical guides that explain player decisions and state version limits.",
        ],
      },
      {
        heading: "How information is handled",
        paragraphs: [
          "Official Roblox records and official promotional media form the identity layer. Dated gameplay can document readable interface fields, while community pages are treated as leads that require comparison rather than automatic confirmation.",
          "When public pages disagree, the disagreement stays visible. Unknown odds, prices and dates remain unknown instead of being filled with plausible-looking numbers. Older game details remain dated rather than being silently relabelled as current.",
        ],
      },
      {
        heading: "Independence and corrections",
        paragraphs: [
          "The website is not affiliated with Roblox or the game developer. It does not sell Robux, game passes, cards or accounts, and it cannot provide account recovery or game moderation support.",
          "Corrections are welcome when they include enough context to evaluate the claim: the exact page, a readable screenshot or public link, the date and the relevant game version.",
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Contact · Corrections",
    title: "Contact Us",
    description:
      "How to reach the site about a factual correction, rights request or general question without submitting a web form.",
    sections: [
      {
        heading: "How to contact us",
        paragraphs: [
          "This website does not use a contact form. Email is the only published contact method, which keeps the process simple and allows you to retain a copy of your message.",
          "Use a clear subject line such as “Card correction,” “Code status,” “Copyright request” or “Website question” so the message can be reviewed in the right context.",
        ],
      },
      {
        heading: "What to include",
        paragraphs: [
          "For a correction, provide enough information to reproduce and evaluate the issue.",
        ],
        items: [
          "The full URL of the page that needs attention.",
          "The exact card, pack, code, mutation, rebirth or update label involved.",
          "A date, game version and readable screenshot or public URL.",
          "A concise explanation of what is incorrect and what the game shows instead.",
        ],
      },
      {
        heading: "What we can help with",
        paragraphs: [
          "We can review site errors, unclear wording, broken links, attribution questions, corrections and requests concerning material published on this website.",
          "We cannot recover Roblox accounts, reverse trades, restore deleted game data, issue Robux refunds, moderate a game server or provide support on behalf of Roblox or the game developer. Those requests should be sent to the relevant official service.",
        ],
      },
      {
        heading: "Response and privacy",
        paragraphs: [
          "A response is not guaranteed, but specific messages with a public link or readable screenshot are easier to review. Repeated spam, abusive messages, promotional offers and requests for cheats or account access may be ignored.",
          "Do not email passwords, authentication codes, payment information or sensitive personal records. Contact emails are used to review and respond to the message and may be retained when needed to document a correction or rights request.",
        ],
      },
    ],
  },
};

export function LegalPage({ kind }: { kind: LegalKind }) {
  const page = pages[kind];

  return (
    <main id="main-content">
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        meta={[
          "Last updated August 7, 2026",
          "Plain-language policy",
          "Independent fan website",
        ]}
        showVisual={false}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Legal" },
          { label: page.title },
        ]}
      />
      <article className={`container ${styles.content}`}>
        <p className={styles.intro}>
          This {page.title} applies to {siteConfig.name}, an independent website
          available at {siteConfig.url}. {page.description} Read it together
          with the dates and limits shown on the page you are using.
        </p>

        {page.sections.map((section, index) => (
          <section key={section.heading}>
            <span className={styles.sectionNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}

        <section className={styles.contactBox}>
          <span className={styles.sectionNumber}>@</span>
          <div>
            <h2>Questions about this page</h2>
            <p>
              Email{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                rel="noopener noreferrer nofollow"
              >
                {siteConfig.contactEmail}
              </a>
              . Include the relevant page URL and enough context for the request
              to be reviewed.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
