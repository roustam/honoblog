<script setup lang="ts">
type NavItem = {
  label: string
  href: string
}

const props = defineProps<{
  brand?: string
  links?: NavItem[]
}>()

const brand = props.brand ?? 'My Blog'
const links = props.links ?? [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'About', href: '/about' }
]
</script>

<template>
  <header class="site-header">
    <div class="container">
      <a class="brand" href="/">{{ brand }}</a>

      <nav aria-label="Main navigation">
        <ul class="nav-list">
          <li v-for="link in links" :key="link.href">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.9rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-weight: 700;
  text-decoration: none;
  color: #111827;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.nav-list a {
  text-decoration: none;
  color: #374151;
}

.nav-list a:hover {
  color: #111827;
}
</style>
