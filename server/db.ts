import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { archiveItems, InsertArchiveItem, InsertUser, uiDesignSystems, uiGuideItems, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export type ArchiveListFilters = {
  type?: "contest" | "grant" | "exhibition" | "news" | "case-study";
  status?: "upcoming" | "open" | "closed" | "ongoing" | "unknown";
  query?: string;
  limit: number;
  offset: number;
};

export async function listArchiveItems(filters: ArchiveListFilters) {
  const db = await getDb();
  if (!db) return { items: [], total: 0 };
  const conditions = [];
  if (filters.type) conditions.push(eq(archiveItems.type, filters.type));
  if (filters.status) conditions.push(eq(archiveItems.status, filters.status));
  if (filters.query?.trim()) {
    const q = `%${filters.query.trim()}%`;
    conditions.push(or(like(archiveItems.title, q), like(archiveItems.summary, q), like(archiveItems.organization, q)));
  }
  const where = conditions.length ? and(...conditions) : undefined;
  const [items, totalRows] = await Promise.all([
    db.select().from(archiveItems).where(where).orderBy(desc(archiveItems.publishedAt), desc(archiveItems.createdAt)).limit(filters.limit).offset(filters.offset),
    db.select({ count: sql<number>`count(*)` }).from(archiveItems).where(where),
  ]);
  return { items, total: Number(totalRows[0]?.count ?? 0) };
}

export type UiGuideListFilters = {
  category?: string;
  query?: string;
  limit: number;
  offset: number;
};

export async function listUiGuideItems(filters: UiGuideListFilters) {
  const db = await getDb();
  if (!db) return { items: [], total: 0 };
  const conditions = [];
  if (filters.category && filters.category !== "전체") conditions.push(eq(uiGuideItems.category, filters.category));
  if (filters.query?.trim()) {
    const q = `%${filters.query.trim()}%`;
    conditions.push(or(
      like(uiGuideItems.name, q),
      like(uiGuideItems.category, q),
      like(uiGuideItems.location, q),
      like(uiGuideItems.purpose, q),
      like(uiGuideItems.example, q),
      like(uiGuideItems.tools, q),
    ));
  }
  const where = conditions.length ? and(...conditions) : undefined;
  const [items, totalRows] = await Promise.all([
    db.select().from(uiGuideItems).where(where).orderBy(uiGuideItems.id).limit(filters.limit).offset(filters.offset),
    db.select({ count: sql<number>`count(*)` }).from(uiGuideItems).where(where),
  ]);
  return { items, total: Number(totalRows[0]?.count ?? 0) };
}

export type UiDesignSystemListFilters = {
  query?: string;
  tech?: string;
  difficulty?: "초급" | "중급" | "고급";
  limit: number;
  offset: number;
};

export async function listUiDesignSystems(filters: UiDesignSystemListFilters) {
  const db = await getDb();
  if (!db) return { items: [], total: 0 };
  const conditions = [];
  if (filters.difficulty) conditions.push(eq(uiDesignSystems.difficulty, filters.difficulty));
  if (filters.query?.trim()) {
    const q = `%${filters.query.trim()}%`;
    conditions.push(or(like(uiDesignSystems.name, q), like(uiDesignSystems.owner, q), like(uiDesignSystems.platform, q), like(uiDesignSystems.tech, q), like(uiDesignSystems.features, q)));
  }
  if (filters.tech && filters.tech !== "전체") conditions.push(like(uiDesignSystems.tech, `%${filters.tech}%`));
  const where = conditions.length ? and(...conditions) : undefined;
  const [items, totalRows] = await Promise.all([
    db.select().from(uiDesignSystems).where(where).orderBy(uiDesignSystems.id).limit(filters.limit).offset(filters.offset),
    db.select({ count: sql<number>`count(*)` }).from(uiDesignSystems).where(where),
  ]);
  return { items, total: Number(totalRows[0]?.count ?? 0) };
}

export async function getArchiveItemById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(archiveItems).where(eq(archiveItems.id, id)).limit(1);
  return result[0];
}

export async function upsertArchiveItem(item: InsertArchiveItem) {
  const db = await getDb();
  if (!db) return;
  await db.insert(archiveItems).values(item).onDuplicateKeyUpdate({
    set: {
      type: item.type,
      title: item.title,
      summary: item.summary,
      organization: item.organization ?? null,
      sourceDomain: item.sourceDomain,
      sourceUrl: item.sourceUrl,
      publishedAt: item.publishedAt ?? null,
      eventStartAt: item.eventStartAt ?? null,
      eventEndAt: item.eventEndAt ?? null,
      deadlineAt: item.deadlineAt ?? null,
      status: item.status ?? "unknown",
      tags: item.tags ?? null,
      lastSeenAt: new Date(),
    },
  });
}
