<script setup lang="ts">
const tags = ["development", "linux", "humor", "security"];
</script>

<template>
  <aside class="side-menu" aria-label="Post tags">
    <p class="menu-title">Tags</p>
    <nav>
      <ul class="tag-list">
        <li v-for="tag in tags" :key="tag">
          <a href="#" class="tag-link">{{ tag }}</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.side-menu {
  width: 170px;
  min-width: 170px;
  border-right: 1px solid #e5e7eb;
  padding: 1rem 0.75rem;
}

.menu-title {
  margin: 0 0 0.75rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #6b7280;
}

.tag-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.tag-link {
  display: block;
  text-decoration: none;
  color: greenyellow;
  font-size: 0.9rem;
  padding: 0.35rem 0.4rem;
  border-radius: 0.35rem;
}



@media (max-width: 429px) {
  .side-menu {
    display: none;
  }
}
</style>
