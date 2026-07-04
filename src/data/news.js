/**
 * FR09 -- News data.
 *
 * These four entries are built from real HELICORP milestones (see FR03
 * History) rather than invented headlines, but they're still standing in
 * for what should eventually be a real news feed/CMS -- treat dates as
 * approximate and confirm before publishing.
 *
 * Swap this file for `fetchNews()` in `src/services/api.js` once a real
 * news API/CMS exists.
 */
export const news = [
  {
    id: 'helipet-showroom-d1',
    date: '2025',
    tag: { en: 'Retail', vi: 'Bán lẻ' },
    title: {
      en: 'HELICORP opens its first HeLiPet showroom in District 1',
      vi: 'HELICORP khai trương showroom HeLiPet đầu tiên tại Quận 1',
    },
    excerpt: {
      en: 'The flagship store marks the first location in a planned high-tech pet product retail chain.',
      vi: 'Cửa hàng flagship đánh dấu vị trí đầu tiên trong chuỗi bán lẻ sản phẩm công nghệ cao cho thú cưng.',
    },
  },
  {
    id: 'petree-open-top',
    date: '2025',
    tag: { en: 'Product', vi: 'Sản phẩm' },
    title: {
      en: 'HELICORP and Petree co-develop the HELIPET OPEN TOP litter box',
      vi: 'HELICORP và Petree hợp tác phát triển thùng vệ sinh HELIPET OPEN TOP',
    },
    excerpt: {
      en: 'An exclusive partnership brings a next-generation litter box design to the HeLiPet brand.',
      vi: 'Hợp tác độc quyền mang đến thiết kế thùng vệ sinh thế hệ mới cho thương hiệu HeLiPet.',
    },
  },
  {
    id: 'neakasa-partnership',
    date: '2024',
    tag: { en: 'Partnership', vi: 'Hợp tác' },
    title: {
      en: 'HELICORP signs an exclusive agreement with Neakasa',
      vi: 'HELICORP ký kết thỏa thuận độc quyền với Neakasa',
    },
    excerpt: {
      en: 'Smart cleaning technology for pet households joins the HELICORP distribution portfolio.',
      vi: 'Công nghệ vệ sinh thông minh cho hộ gia đình có thú cưng gia nhập danh mục phân phối của HELICORP.',
    },
  },
  {
    id: 'drvet-distribution',
    date: '2024',
    tag: { en: 'Partnership', vi: 'Hợp tác' },
    title: {
      en: 'HELICORP becomes exclusive distributor for Dr.VET',
      vi: 'HELICORP trở thành nhà phân phối độc quyền của Dr.VET',
    },
    excerpt: {
      en: "Specialized pet health and nutrition products expand HELICORP's industry coverage.",
      vi: 'Sản phẩm sức khỏe và dinh dưỡng chuyên biệt mở rộng phạm vi ngành hàng của HELICORP.',
    },
  },
]
