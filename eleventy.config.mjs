import path from "node:path";
import { fileURLToPath } from "node:url";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import markdownItObsidian from "markdown-it-obsidian";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { DateTime }from "luxon";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function(eleventyConfig) {
    eleventyConfig.setInputDirectory('src');
    eleventyConfig.setOutputDirectory('public');
    eleventyConfig.setIncludesDirectory('_includes');
    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addPassthroughCopy('src/labs/images');
    eleventyConfig.addPassthroughCopy('src/projects/images');
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

     const mdLib = markdownIt({
      html: true,
      breaks: true,
      linkify: true
      }).use(markdownItObsidian, {
        baseURL: "/labs/",
        relativeBaseURL: "./",
        makeAllLinksAbsolute: false
      });

      eleventyConfig.setLibrary("md", mdLib);

    eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "America/Denver" }).toLocaleString(DateTime.DATE_FULL);
   });
    eleventyConfig.addCollection("post", function(collectionApi) {
      return collectionApi.getFilteredByGlob("src/labs/*.md").reverse();
    });
    eleventyConfig.addCollection("projects", function(collectionApi) {
      return collectionApi.getFilteredByGlob("src/projects/*.md");
    });

    eleventyConfig.addGlobalData("permalink", () => {
    return (data) => {
      return `${data.page.filePathStem}.html`;
    };
  });
};