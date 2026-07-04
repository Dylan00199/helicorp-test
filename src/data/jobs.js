/**
 * FR08 -- Careers data.
 *
 * `jobs` currently contains one real, confirmed opening (from helicorp.vn's
 * recruitment page at time of writing). Rather than invent additional fake
 * listings to fill out a grid, the Careers page is designed to look
 * intentional with a short list plus a standing "send your CV" card --
 * fabricated job postings could genuinely mislead an applicant.
 *
 * Swap this file for `fetchJobs()` in `src/services/api.js` once a real
 * jobs API/CMS exists -- the shape below is what that call should resolve to.
 */
export const jobs = [
  {
    id: 'frontend-dev-intern',
    title: {
      en: 'Front-end Developer Intern (Technical & Automation)',
      vi: 'Thực tập sinh Front-end Developer (Technical & Automation)',
    },
    location: 'Ho Chi Minh City',
    type: {
      en: 'Internship',
      vi: 'Thực tập',
    },
    experience: {
      en: 'No experience required',
      vi: 'Không yêu cầu',
    },
    summary: {
      en: 'Support the technical and automation team building internal tools and customer-facing web experiences.',
      vi: 'Hỗ trợ đội ngũ technical & automation xây dựng công cụ nội bộ và các trải nghiệm web hướng đến khách hàng.',
    },
    link: 'https://helicorp.vn/recruitment/front-end-developer-intern-technical-automation/',
  },
]
