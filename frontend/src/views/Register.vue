<template>
  <div class="container my-5">
    <h2>Register</h2>
    <form @submit.prevent="register" enctype="multipart/form-data">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input v-model="form.name" type="text" class="form-control" id="name" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="form.email" type="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone</label>
        <input v-model="form.phone" type="text" class="form-control" id="phone" />
      </div>
      <div class="mb-3">
        <label for="gender" class="form-label">Gender</label>
        <select v-model="form.gender" class="form-control" id="gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="photo" class="form-label">Profile Photo</label>
        <input type="file" class="form-control" id="photo" @change="form.photo = $event.target.files[0]" />
      </div>
      <div class="mb-3">
        <label for="nid_photo" class="form-label">NID Photo</label>
        <input type="file" class="form-control" id="nid_photo" @change="form.nid_photo = $event.target.files[0]" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="form.password" type="password" class="form-control" id="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </form>
  </div>
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