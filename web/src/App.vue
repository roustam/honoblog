<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue'
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import PostList from './components/PostList.vue';
import SideMenu from './components/SideMenu.vue';
</script>

<template>
  <Header brand="Portfolio Blog" />
  <main>
    <SideMenu />
    <PostList />
  </main>
  <Footer />

</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
}
.footer {
  color: whitesmoke;
  background-color: gray;
}

</style>