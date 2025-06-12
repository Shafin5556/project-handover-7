<template>
  <main>
    <div class="container-fluid py-5 bg-warning-subtle">
      <div class="row shadow rounded-4 overflow-hidden form-container bg-white">
        <div class="col-md-5 d-none d-md-flex bg-warning-subtle justify-content-center align-items-center text-dark text-center p-4">
          <div>
            <h4 class="fw-bold mb-3">Join Exchange Bazar</h4>
            <p class="small text-muted mb-0">
              Create an account to start <strong>buying</strong>, <strong>selling</strong>, and <strong>exchanging</strong> in our trusted marketplace.
            </p>
          </div>
        </div>
        <div class="col-md-7 p-4 p-md-5">
          <h5 class="fw-semibold mb-4 text-center text-warning">Create Your Account</h5>
          <form @submit.prevent="register" enctype="multipart/form-data">
            <div class="mb-3">
              <label for="name" class="form-label">Full Name</label>
              <input
                v-model="form.name"
                type="text"
                class="form-control shadow-sm"
                id="name"
                placeholder="Enter your full name"
                required
              />
            </div>
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
              <label for="phone" class="form-label">Phone Number</label>
              <input
                v-model="form.phone"
                type="tel"
                class="form-control shadow-sm"
                id="phone"
                placeholder="Enter your phone number"
              />
            </div>
            <div class="mb-3">
              <label for="gender" class="form-label">Gender</label>
              <select
                v-model="form.gender"
                class="form-select shadow-sm"
                id="gender"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="photo" class="form-label">Profile Photo</label>
              <input
                type="file"
                class="form-control shadow-sm"
                id="photo"
                accept="image/*"
                @change="form.photo = $event.target.files[0]"
              />
            </div>
            <div class="mb-3">
              <label for="nid_photo" class="form-label">NID Photo</label>
              <input
                type="file"
                class="form-control shadow-sm"
                id="nid_photo"
                accept="image/*"
                @change="form.nid_photo = $event.target.files[0]"
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
            <div v-if="error" class="alert alert-danger rounded-4">{{ error }}</div>
            <button
              type="submit"
              class="btn btn-warning w-100 rounded-4 shadow-sm"
              style="padding: 12px; transition: background-color 0.3s ease, transform 0.2s ease;"
            >
              Register
            </button>
          </form>
          <p class="text-center mt-4 small text-muted">
            Already have an account?
            <router-link to="/login" class="text-warning fw-semibold text-decoration-none" style="transition: color 0.3s ease;">Login here</router-link>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const form = ref({
  name: '',
  email: '',
  phone: '',
  gender: '',
  photo: null,
  nid_photo: null,
  password: '',
});
const error = ref(null);

async function register() {
  try {
    const formData = new FormData();
    Object.keys(form.value).forEach(key => {
      if (form.value[key]) formData.append(key, form.value[key]);
    });
    await authStore.register(formData);
    router.push(authStore.user.role === 'admin' ? '/admin-dashboard' : '/dashboard');
  } catch (err) {
    error.value = err;
  }
}
</script>

<style scoped>
.form-control:focus, .form-select:focus {
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