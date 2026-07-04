import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLenis } from "lenis/react";
import { Logo } from "./Logo";
import { NavDropdown } from "./NavDropdown";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { ROUTES } from "../../utils/constants";
import { cn } from "../../utils/cn";

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useLenis(({ scroll }) => {
    setScrolled(scroll > 0);
  });

  const introductionItems = [
    { to: ROUTES.about, label: t("nav.about") },
    { to: ROUTES.history, label: t("nav.history") },
    { to: ROUTES.culture, label: t("nav.culture") },
  ];

  const ecommerceItems = [
    { to: ROUTES.brands, label: t("nav.brands") },
    { to: ROUTES.forAgents, label: t("nav.forAgents") },
    { to: ROUTES.forSuppliers, label: t("nav.forSuppliers") },
  ];

  const contactItems = [
    { to: ROUTES.forAgentsContact, label: t("nav.contactAgent") },
    { to: ROUTES.forSuppliersContact, label: t("nav.contactSupplier") },
  ];

  const navGroups = [
    { label: t("nav.introduction"), items: introductionItems },
    { label: t("nav.ecommerce"), items: ecommerceItems },
    { label: t("nav.contact"), items: contactItems },
  ];

  const flatLinks = [
    { to: ROUTES.careers, label: t("nav.careers") },
    { to: ROUTES.news, label: t("nav.news") },
  ];

  // Exact-match only, not startsWith. The previous prefix-match caused
  // "Ecommerce" to also light up on /for-agents/contact and
  // /for-suppliers/contact (since those paths start with /for-agents and
  // /for-suppliers respectively) at the same time "Contact" was correctly
  // active there too -- a double-highlight that looked like Ecommerce was
  // active for no reason. Each group now only claims its own exact routes.
  const isExactMatch = (paths) => paths.includes(location.pathname);

  const linkClasses = (isActive) =>
    cn(
      "whitespace-nowrap text-sm font-medium transition-colors duration-base ease-out-soft",
      isActive ? "text-primary" : "text-ink hover:text-primary",
    );

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t("common.skipToContent")}
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 z-40 w-full transition-[background-color,border-color] duration-base ease-out-soft",
          scrolled
            ? "border-b border-primary-l-4 bg-bg/90 backdrop-blur-sm"
            : "border-b border-transparent bg-bg/0",
        )}
      >
        <Container className="flex h-[70px] items-center justify-between gap-4">
          <Logo />

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            <Link
              to={ROUTES.home}
              className={linkClasses(location.pathname === ROUTES.home)}
            >
              {t("nav.home")}
            </Link>
            <NavDropdown
              label={t("nav.introduction")}
              items={introductionItems}
              isActive={isExactMatch(introductionItems.map((i) => i.to))}
            />
            <NavDropdown
              label={t("nav.ecommerce")}
              items={ecommerceItems}
              isActive={isExactMatch(ecommerceItems.map((i) => i.to))}
            />
            <Link
              to={ROUTES.careers}
              className={linkClasses(location.pathname === ROUTES.careers)}
            >
              {t("nav.careers")}
            </Link>
            <Link
              to={ROUTES.news}
              className={linkClasses(location.pathname === ROUTES.news)}
            >
              {t("nav.news")}
            </Link>
            <NavDropdown
              label={t("nav.contact")}
              items={contactItems}
              isActive={isExactMatch(contactItems.map((i) => i.to))}
            />
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageToggle />
            <Button
              to={ROUTES.forAgentsContact}
              size="base"
              className="whitespace-nowrap"
            >
              {t("common.contactTeam")}
            </Button>
          </div>

          <button
            type="button"
            className="rounded-token-sm p-2 text-ink lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} aria-hidden="true" />
          </button>
        </Container>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navGroups={navGroups}
        flatLinks={flatLinks}
      />
    </>
  );
}
