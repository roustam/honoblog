export type Post = {
    id: string;
    title: string;
    heroImg: string;
    slug: string;
    content: string;
    createdAt: string;
    modifiedAt: string;
    published: boolean;
    tags: PostTag[]
}

export type PostTag = {
    id: number;
    tag: string;
    color: string;
}

export type CreatePostInput = {
  id: string;        // cuid generated before calling this
  title: string;
  heroImg: string;
  slug: string;
  content: string;
  published?: boolean;
  tagIds?: number[];
};



export type PaginatedPostResults = {
    posts: Post[];
    page: number;
    pageSize: number;
    totalPostQty: number;
    totalPages: number;
};