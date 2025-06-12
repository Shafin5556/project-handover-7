<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="/img/logo.png" alt="Exchange Bazar Logo" height="38" class="me-2" />
        <span class="fw-semibold text-warning">Exchange Bazar</span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <form class="d-flex mx-auto my-2 my-lg-0" style="max-width: 400px; flex: 1;">
          <input
            class="form-control shadow-sm rounded-4 me-2"
            type="search"
            placeholder="Search products..."
            aria-label="Search"
            style="font-size: 0.9rem;"
          />
          <button class="btn btn-warning btn-sm rounded-4" type="submit" style="padding: 8px 16px;">
            <i class="bi bi-search"></i>
          </button>
        </form>
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="categoriesDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </a>
            <ul class="dropdown-menu shadow" aria-labelledby="categoriesDropdown">
              <li><router-link class="dropdown-item" to="/category/electronics">Electronics</router-link></li>
              <li><router-link class="dropdown-item" to="/category/fashion">Fashion</router-link></li>
              <li><router-link class="dropdown-item" to="/category/home">Home & Living</router-link></li>
              <li><router-link class="dropdown-item" to="/category/sports">Sports</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/" active-class="text-warning fw-semibold">Home</router-link>
          </li>
          <li class="nav-item" v-if="!user">
            <router-link class="nav-link" to="/register" active-class="text-warning fw-semibold">Register</router-link>
          </li>
          <li class="nav-item" v-if="!user">
            <router-link class="nav-link" to="/login" active-class="text-warning fw-semibold">Login</router-link>
          </li>
          <li class="nav-item" v-if="user">
            <router-link
              class="nav-link"
              :to="user.role === 'admin' ? '/admin-dashboard' : '/dashboard'"
              active-class="text-warning fw-semibold"
            >Dashboard</router-link>
          </li>
          <li class="nav-item" v-if="user">
            <router-link class="nav-link" to="/account" active-class="text-warning fw-semibold">
              <i class="bi bi-person-circle me-1"></i> Account
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart" active-class="text-warning fw-semibold">
              <i class="bi bi-cart3 me-1"></i> Cart
            </router-link>
          </li>
          <li class="nav-item" v-if="user">
            <a
              class="btn btn-warning btn-sm rounded-4 ms-3"
              href="#"
              @click.prevent="logout"
              style="padding: 8px 16px; transition: background-color 0.3s ease, transform 0.2s ease;"
            >Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.navbar {
  padding: 14px 0;
  font-family: 'Poppins', sans-serif;
}
.navbar-brand {
  font-size: 1.35rem;
  font-weight: 600;
  transition: color 0.3s ease;
}
.navbar-brand:hover span {
  color: #e0a800 !important;
}
.nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151 !important;
  padding: 8px 14px !important;
  transition: color 0.3s ease, background-color 0.3s ease;
}
.nav-link:hover {
  color: #e0a800 !important;
  background-color: #fff3cd;
  border-radius: 4px;
}
.dropdown-toggle {
  color: #374151 !important;
  transition: color 0.3s ease, background-color 0.3s ease;
}
.dropdown-toggle:hover {
  color: #e0a800 !important;
  background-color: #fff3cd;
  border-radius: 4px;
}
.dropdown-menu {
  border: none;
  border-radius: 6px;
  padding: 8px 0;
}
.dropdown-item {
  font-size: 0.85rem;
  padding: 8px 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.dropdown-item:hover {
  background-color: #fff3cd;
  color: #e0a800;
}
.btn-warning {
  font-size: 0.85rem;
  font-weight: 500;
}
.btn-warning:hover {
  background-color: #e0a800;
  transform: translateY(-1px);
}
.form-control:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.25);
}
</style>