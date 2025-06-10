<template>
  <div class="container my-5">
    <h2>Consumer Dashboard</h2>
    <p>Welcome, {{ user?.name }}! This is your consumer dashboard.</p>
    <button class="btn btn-danger" @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const user = authStore.user;

async function logout() {
  try {
    await authStore.logout();
    router.push('/login');
  } catch (err) {
    console.error('Logout failed:', err);
  }
}
</script>