import { db } from "../db/client";
import type { Post, PostTag, CreatePostInput, PaginatedPostResults } from "../types/post";


type RawPostRow = Record<string, unknown>;

const isUndefinedTableError = (error: unknown): boolean => {
    if (!error || typeof error !== "object") {
        return false;
    }

    return "code" in error && error.code === "42P01";
};

const parseDateValue = (value: unknown): string => {
    if (value instanceof Date) {
        return value.toISOString();
    }

    if (typeof value === "string") {
        return value;
    }

    return "";
};

const parseBooleanValue = (value: unknown): boolean => {
    if (typeof value === "boolean") {
        return value;
    }

    if (typeof value === "number") {
        return value === 1;
    }

    if (typeof value === "string") {
        return value === "1" || value === "true" || value === "t";
    }

    return false;
};


const parseTagList = (value: unknown): PostTag[] => {
    let parsed = value;

    if (typeof value === "string") {
        try {
            parsed = JSON.parse(value);
        } catch {
            return [];
        }
    }

    if (!Array.isArray(parsed)) {
        return [];
    }

    return parsed
        .map((item) => {
            if (!item || typeof item !== "object") {
                return null;
            }

            const rawTag = item as { id?: unknown; tag?: unknown; color?: unknown };
            const id = Number(rawTag.id);
            const tag = typeof rawTag.tag === "string" ? rawTag.tag : "";
            const color = typeof rawTag.color === "string" ? rawTag.color : "";

            if (!Number.isFinite(id) || !tag || !color) {
                return null;
            }

            return { id, tag, color };
        })
        .filter((item): item is PostTag => item !== null);
};

const mapRowToPost = (row: RawPostRow): Post => {
    return {
        id: String(row.id ?? ""),
        title: String(row.title ?? ""),
        heroImg: String(row.heroImg ?? row.hero_img ?? ""),
        slug: String(row.slug ?? ""),
        content: String(row.content ?? ""),
        createdAt: parseDateValue(row.createdAt ?? row.created_at),
        modifiedAt: parseDateValue(row.modifiedAt ?? row.modified_at),
        published: parseBooleanValue(row.published),
        tags: parseTagList(row.tags),
    };
};

const queryPosts = async (limit: number, offset: number): Promise<RawPostRow[]> => {
    try {
        return await db`SELECT * FROM posts ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
    } catch (error) {
        if (!isUndefinedTableError(error)) {
            throw error;
        }

        return await db`SELECT * FROM posts ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
    }
};

const queryPostCount = async (): Promise<number> => {
    try {
        const rows = await db`SELECT COUNT(*) AS count FROM posts`;
        return Number(rows[0]?.count ?? 0);
    } catch (error) {
        if (!isUndefinedTableError(error)) {
            throw error;
        }

        const rows = await db`SELECT COUNT(*) AS count FROM posts`;
        return Number(rows[0]?.count ?? 0);
    }
};

export const getPaginatedPosts = async (
    page: number,
    pageSize: number,
): Promise<PaginatedPostResults> => {
    const safePage = Math.max(1, page);
    const safePageSize = Math.max(1, pageSize);
    const offset = (safePage - 1) * safePageSize;

    const [count, rows] = await Promise.all([
        queryPostCount(),
        queryPosts(safePageSize, offset),
    ]);

    const totalPages = Math.ceil(count / safePageSize);

    return {
        posts: rows.map(mapRowToPost),
        page: safePage,
        pageSize: safePageSize,
        totalPages,
        totalPostQty: count,
    };
};

export const CreatePost = async (post: CreatePostInput) => {
  const tagIds = post.tagIds ?? [];

  // Single atomic query: insert post + attach tags
  const [createdPost] = await db`
    WITH new_post AS (
      INSERT INTO posts (id, title, hero_img, slug, content, created_at, modified_at, published)
      VALUES (
        ${post.id},
        ${post.title},
        ${post.heroImg},
        ${post.slug},
        ${post.content},
        NOW(),
        NOW(),
        ${post.published ?? true}
      )
      RETURNING *
    ),
    inserted_tags AS (
      INSERT INTO post_tags (post_id, tag_id)
      SELECT new_post.id, tag_id
      FROM new_post, UNNEST(${tagIds}::int[]) AS tag_id
    )
    SELECT * FROM new_post
  `;

  return createdPost;
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
    try {
        const rows = await db`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`;
        return rows[0] ? mapRowToPost(rows[0] as RawPostRow) : null;
    } catch (error) {
        if (!isUndefinedTableError(error)) {
            throw error;
        }

        const rows = await db`SELECT * FROM "posts" WHERE slug = ${slug} LIMIT 1`;
        return rows[0] ? mapRowToPost(rows[0] as RawPostRow) : null;
    }
};

export const slugExists = async (slug: string): Promise<boolean> => {
    return (await getPostBySlug(slug)) !== null;
};
