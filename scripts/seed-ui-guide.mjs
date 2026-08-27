import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, "client/src/lib/uiCatalog350.ts");
const source = fs.readFileSync(sourcePath, "utf8");
const start = source.indexOf("export const uiCatalog350: UiCatalogEntry[] = ");
if (start < 0) throw new Error("uiCatalog350 export was not found");
const arrayMarker = source.indexOf("= [", start);
if (arrayMarker < 0) throw new Error("uiCatalog350 array literal was not found");
const jsonStart = arrayMarker + 2;
const jsonEnd = source.lastIndexOf("];" );
const entries = JSON.parse(source.slice(jsonStart, jsonEnd + 1));
if (!Array.isArray(entries) || entries.length !== 350) {
  throw new Error(`Expected 350 UI guide entries, received ${entries.length}`);
}

const requiredFields = ["id", "category", "location", "name", "purpose", "pattern", "example", "tools"];
for (const entry of entries) {
  for (const field of requiredFields) {
    if (entry[field] === undefined || entry[field] === null || entry[field] === "") {
      throw new Error(`Entry ${entry.id} is missing ${field}`);
    }
  }
}

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const connection = await mysql.createConnection(process.env.DATABASE_URL);
try {
  const placeholders = entries.map(() => "(?, ?, ?, ?, ?, ?, ?, ?)").join(", ");
  const values = entries.flatMap((entry) => requiredFields.map((field) => entry[field]));
  await connection.query(
    `INSERT INTO ui_guide_items (id, category, location, name, purpose, pattern, example, tools) VALUES ${placeholders}
     ON DUPLICATE KEY UPDATE category = VALUES(category), location = VALUES(location), name = VALUES(name), purpose = VALUES(purpose), pattern = VALUES(pattern), example = VALUES(example), tools = VALUES(tools), updatedAt = CURRENT_TIMESTAMP`,
    values,
  );
  const [rows] = await connection.query("SELECT COUNT(*) AS count FROM ui_guide_items");
  console.log(`Seeded ${entries.length} UI Guide records; database total: ${rows[0].count}`);
} finally {
  connection.destroy();
}
