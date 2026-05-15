<script setup lang="ts">
import { onMounted, ref } from "vue";
import { API_BASE_URL } from "../config/env";

type Post = {
  id: string;
  title: string;
  content: string;
  slug: string;
  createdAt?: string;
};

type PostsResponse = {
  paginatedPosts?: {
    posts?: Post[];
  };
};

const posts = ref<Post[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await fetch(`${API_BASE_URL}posts/?page=1&pageSize=7`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts (HTTP ${response.status})`);
    }

    const data = (await response.json()) as PostsResponse;
    posts.value = data.paginatedPosts?.posts ?? [];
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to fetch posts";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="post-list">
    <h2>Post list</h2>

    <p v-if="loading">Loading posts...</p>
    <p v-else-if="error">{{ error }}</p>

    <ul v-else class="posts">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <a :href="`/api/posts/${post.slug}`" class="post-link">{{ post.title }}</a>
        <p class="post-content">{{ post.content }}</p>
        <p>posted: {{ post.createdAt }}</p>
      </li>
      <li v-if="posts.length === 0">No posts found.</li>
    </ul>
  </section>
</template>

<style scoped>
.post-list {
  padding: 1rem;
}

.posts {
  list-style: none;
  margin: 0.75rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.post-item {
  display: flex;
  flex-direction: column;
  justify-items: left;
  border: 1px solid #000;
  background-color: #111111;
  border-radius: 0.25rem;
  padding: 0.55rem 0.7rem;
}

.post-link {
  width: 100%;
  text-align: left;
  color: silver;
  text-decoration: none;
  font-weight: 600;
}
.post-content {
    text-align: left;
    background-color: grey;
    color:#e5e7eb;
}
.post-link:hover {
  text-decoration: underline;
}
</style>
