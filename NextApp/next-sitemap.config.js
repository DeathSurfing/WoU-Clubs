/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://woxsenstudentcouncil.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  sitemapSize: 5000,
};
