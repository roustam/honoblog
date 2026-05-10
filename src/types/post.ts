export type Post = {
    id: string;
    title: string;
    heroImg: string;
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