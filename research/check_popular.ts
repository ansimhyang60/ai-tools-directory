import { popularTools, popularToolCategories } from "../client/src/lib/popularTools";

const names = popularTools.map((tool) => tool.name.trim().toLowerCase());
const duplicates = [...new Set(names.filter((name, index) => names.indexOf(name) !== index))];
console.log(JSON.stringify({
  count: popularTools.length,
  categories: popularToolCategories,
  duplicates,
  first: popularTools.slice(0, 8).map(({ name, category, url }) => ({ name, category, url })),
  last: popularTools.slice(-8).map(({ name, category, url }) => ({ name, category, url })),
}, null, 2));
