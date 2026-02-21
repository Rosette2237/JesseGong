// JesseGong/components/Footer.tsx

const LINKS = {
  email: "mailto:jessegby@gmail.com",
  linkedin: "https://www.linkedin.com/in/boyang-gong",
  instagram: "https://www.instagram.com/jesse_gong05/",
} as const;

function IconEmail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        d="M4 6h16v12H4V6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        d="M6.5 9.5V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6.5 6.5h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M10.5 18v-5.2c0-1.7 1-2.8 2.5-2.8s2.5 1.1 2.5 2.8V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 9.5V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        d="M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M17.5 6.5h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FooterLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
}) {
  const isMail = href.startsWith("mailto:");
  const external = !isMail;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-[#edae17]"
    >
      {/* Increased container to h-8 w-8 and Icon to h-6 w-6 */}
      <span className="inline-flex h-8 w-8 items-center justify-center">
        <Icon className="h-6 w-6 text-white/70 transition-colors group-hover:text-[#edae17]" />
      </span>
      <span>{label}</span>
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t-0 bg-[#002856]">
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <FooterLink href={LINKS.email} label="jessegby@gmail.com" Icon={IconEmail} />
          <FooterLink href={LINKS.linkedin} label="LinkedIn" Icon={IconLinkedIn} />
          <FooterLink href={LINKS.instagram} label="Instagram" Icon={IconInstagram} />
        </div>

        <p className="mt-6 text-sm text-white/70">
          Copyright © {year} Boyang Gong. All rights reserved.
        </p>
      </div>
    </footer>
  );
}