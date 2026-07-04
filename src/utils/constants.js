// Central route map -- import this instead of hardcoding path strings so
// nav, footer, CTAs and redirects can't drift out of sync with the router.
export const ROUTES = {
  home: '/',
  about: '/about',
  history: '/history',
  culture: '/culture',
  brands: '/brands',
  forAgents: '/for-agents',
  forAgentsContact: '/for-agents/contact',
  forSuppliers: '/for-suppliers',
  forSuppliersContact: '/for-suppliers/contact',
  careers: '/careers',
  news: '/news',
}

// Real, publicly published company info (from helicorp.vn) -- correct at
// time of writing. Confirm before relying on it for anything contractual.
export const COMPANY = {
  name: 'HELICORP',
  legalName: 'Healthy Living Corporation',
  phones: {
    purchase: '+84 862 258 929',
    warranty: '+84 965 255 227',
  },
  // Real inbox address could not be confirmed: it's obfuscated behind
  // Cloudflare email-protection on the source site. Replace before launch.
  email: 'contact@helicorp.vn',
  hq: {
    label: 'Ho Chi Minh City Headquarters',
    address: 'R54, Street 15, Quarter 5, Dong Hung Thuan Ward, Ho Chi Minh City, Vietnam',
  },
  hanoiWarehouse: {
    label: 'HELIPET Cat Litter Warehouse',
    address: 'Son Dong, Hanoi (25.2 ha)',
  },
  stores: [
    { label: 'HELIPET Dinh Tien Hoang', city: 'Ho Chi Minh City' },
    { label: 'HELIPET Thuy Khue', city: 'Hanoi' },
  ],
  corporateSites: [
    { name: 'PETKIT Vietnam', url: 'https://petkitvietnam.com' },
    { name: 'Dr.VET', url: 'https://drvet.vn' },
    { name: 'HELIPET', url: 'https://helipet.vn' },
    { name: 'NEAKASA', url: 'https://neakasa.vn' },
  ],
  socials: {
    // Left empty on purpose -- add real profile URLs when available.
  },
}

export const PROVINCE_COUNT = 34
