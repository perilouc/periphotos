import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  // Galleries in the order set by each file's `order` field
  eleventyConfig.addCollection("galleries", (api) =>
    api.getFilteredByGlob("src/galleries/*.md").sort((a, b) => (a.data.order || 99) - (b.data.order || 99))
  );

  // Journal entries, newest first
  eleventyConfig.addCollection("journal", (api) =>
    api.getFilteredByGlob("src/journal/*.md").sort((a, b) => b.date - a.date)
  );

  // Turn a flat photo list into rows: two consecutive "pair" photos share a row;
  // everything else gets a row of its own.
  eleventyConfig.addFilter("photoRows", (photos = []) => {
    const rows = [];
    for (let i = 0; i < photos.length; i++) {
      const p = { ...photos[i], index: i };
      const next = photos[i + 1];
      if (p.layout === "pair" && next && next.layout === "pair") {
        rows.push({ type: "pair", photos: [p, { ...next, index: i + 1 }] });
        i++;
      } else {
        rows.push({ type: p.layout === "pair" ? "centred" : p.layout || "full", photos: [p] });
      }
    }
    return rows;
  });

  eleventyConfig.addFilter("head", (arr = [], n) => arr.slice(0, n));
  eleventyConfig.addFilter("pad2", (n) => String(n).padStart(2, "0"));
  eleventyConfig.addFilter("longDate", (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
  );
  eleventyConfig.addFilter("monthYear", (d) =>
    new Date(d).toLocaleDateString("en-GB", { month: "long", year: "numeric" })
  );

  return {
    dir: { input: "src", output: "_site" },
    // While the site lives at perilouc.github.io/periphotos this is "/periphotos/";
    // once periphotos.com points here it becomes "/" (set in the deploy workflow).
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
