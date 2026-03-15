// Run: node copy-assets.js
// Copies Neighborhood thumbnails into the portfolio's public directory.
const fs = require("fs"); // eslint-disable-line
const src = "C:/Users/wellf/design/Neighborhood Design/neighborhood/public/thumbnails/";
const dst = "C:/Users/wellf/Design/Portfolio/portfoliosite/public/projects/neighborhood/";
if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });
["thumbnail-dashboard.png", "thumbnail-onboarding.png", "thumbnail-mobile-settings.png"].forEach(f => {
  fs.copyFileSync(src + f, dst + f);
  console.log("copied", f);
});
