import mysql from "mysql2/promise";
import { designSystemReferences } from "../client/src/lib/designSystems.ts";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
if (!Array.isArray(designSystemReferences) || designSystemReferences.length !== 17) {
  throw new Error(`Expected 17 design-system references, received ${designSystemReferences.length}`);
}

const connection = await mysql.createConnection(process.env.DATABASE_URL);
try {
  const placeholders = designSystemReferences.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?)").join(", ");
  const values = designSystemReferences.flatMap((item) => [
    item.name,
    item.owner,
    item.platform,
    JSON.stringify(item.tech),
    JSON.stringify(item.features),
    item.url,
    JSON.stringify(item.companionLinks),
    item.difficulty,
    item.previewKind,
  ]);
  await connection.query(
    `INSERT INTO ui_design_systems (name, owner, platform, tech, features, url, companionLinks, difficulty, previewKind) VALUES ${placeholders}
     ON DUPLICATE KEY UPDATE owner = VALUES(owner), platform = VALUES(platform), tech = VALUES(tech), features = VALUES(features), url = VALUES(url), companionLinks = VALUES(companionLinks), difficulty = VALUES(difficulty), previewKind = VALUES(previewKind), updatedAt = CURRENT_TIMESTAMP`,
    values,
  );
  const [rows] = await connection.query("SELECT COUNT(*) AS count FROM ui_design_systems");
  console.log(`Seeded ${designSystemReferences.length} design-system references; database total: ${rows[0].count}`);
} finally {
  connection.destroy();
}
