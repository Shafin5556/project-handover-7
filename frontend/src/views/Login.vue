<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center bg-warning-subtle">
    <div class="row shadow rounded-4 overflow-hidden form-container bg-white">
      <div class="col-md-5 d-none d-md-flex bg-warning-subtle justify-content-center align-items-center text-dark text-center p-4">
        <div>
          <h4 class="fw-bold mb-3">Welcome Back</h4>
          <p class="small text-muted mb-0">
            Login to continue <strong>buying</strong>, <strong>selling</strong>, or <strong>exchanging</strong> on Exchange Bazar.
          </p>
        </div>
      </div>
      <div class="col-md-7 p-4 p-md-5">
        <h5 class="fw-semibold mb-4 text-center text-warning">Login to Your Account</h5>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="form-control shadow-sm"
              id="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="form-control shadow-sm"
              id="password"
              placeholder="Enter password"
              required
            />
          </div>
          <div class="mb-4 text-end">
            <router-link to="/forgot-password" class="small text-decoration-none text-muted" style="transition: color 0.3s ease;">Forgot password?</router-link>
          </div>
          <div v-if="error" class="alert alert-danger rounded-4">{{ error }}</div>
          <button
            type="submit"
            class="btn btn-warning w-100 rounded-4 shadow-sm"
            style="padding: 12px; transition: background-color 0.3s ease, transform 0.2s ease;"
          >
            Login
          </button>
        </form>
        <p class="text-center mt-4 small text-muted">
          Don't have an account?
          <router-link to="/register" class="text-warning fw-semibold text-decoration-none" style="transition: color 0.3s ease;">Register here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const form = ref({ email: '', password: '' });
const error = ref(null);

async function login() {
  try {
    await authStore.login(form.value);
    router.push(authStore.user.role === 'admin' ? '/admin-dashboard' : '/dashboard');
  } catch (err) {
    error.value = err;
  }
}
</script>

<style scoped>
.form-control:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
}
.btn-warning:hover {
  background-color: #e0a800;
  transform: translateY(-1px);
}
.text-warning:hover {
  color: #e0a800 !important;
}
</style>