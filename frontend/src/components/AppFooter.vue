<template>
  <footer class="bg-orange text-white py-4">
    <div class="container text-center">
      <img :src="logo" alt="Exchange Bazar Logo" class="rounded mb-2" style="width: 36px; height: 36px;" />
      <p class="small mb-2">
        Exchange Bazar is your go-to platform for buying, selling, and trading goods with ease and trust.
      </p>
      <p class="text-white-50 small mb-0">© 2025 Exchange Bazar. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import logo from '/img/logo.png';
</script>

<style scoped>
.bg-orange {
  background-color: #f97316;
}
</style>