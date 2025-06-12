<template>
  <main
    class="min-vh-100"
    style="background: linear-gradient(135deg, #fff3cd 0%, #fef9e7 100%)"
  >
    <div class="container py-5">
      <div class="form-container mx-auto">
        <div class="card shadow-lg rounded-4 border-0 overflow-hidden">
          <div class="card-header bg-warning text-white text-center py-3">
            <h2 class="fw-bold mb-0">Welcome, {{ user?.name || "User" }}!</h2>
          </div>
          <div class="card-body p-4 p-md-5">
            <ul
              class="nav nav-tabs nav-fill mb-4 border-0 bg-light rounded-4 p-2 shadow-sm"
            >
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'profile' }"
                  @click="activeTab = 'profile'"
                >
                  <i class="bi bi-person me-1"></i>Profile
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'sell' }"
                  @click="activeTab = 'sell'"
                >
                  <i class="bi bi-shop me-1"></i>Sell
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'purchases' }"
                  @click="activeTab = 'purchases'"
                >
                  <i class="bi bi-bag-check me-1"></i>Purchases
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'exchange' }"
                  @click="activeTab = 'exchange'"
                >
                  <i class="bi bi-arrow-left-right me-1"></i>Exchange
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'requests' }"
                  @click="activeTab = 'requests'"
                >
                  <i class="bi bi-send me-1"></i>Requests
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'notifications' }"
                  @click="activeTab = 'notifications'"
                >
                  <i class="bi bi-bell me-1"></i>Notifications
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'upload-exchange' }"
                  @click="activeTab = 'upload-exchange'"
                >
                  <i class="bi bi-upload me-1"></i>Upload
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'wishlist' }"
                  @click="activeTab = 'wishlist'"
                >
                  <i class="bi bi-heart me-1"></i>Wishlist
                </button>
              </li>
            </ul>

            <!-- My Profile -->
            <div v-if="activeTab === 'profile'">
              <div
                class="row align-items-center mb-4 p-3 bg-light rounded-4 shadow-sm"
              >
                <div class="col-md-3 text-center">
                  <img
                    :src="user?.photo || '/img/default-profile.png'"
                    alt="Profile Picture"
                    class="rounded-circle shadow-lg"
                    style="
                      width: 100px;
                      height: 100px;
                      object-fit: cover;
                      border: 3px solid #ffc107;
                    "
                  />
                </div>
                <div class="col-md-9">
                  <h5 class="fw-semibold text-dark mb-2">Profile Overview</h5>
                  <p class="text-muted mb-2">Name: {{ user?.name || "N/A" }}</p>
                  <p class="text-muted mb-3">
                    Email: {{ user?.email || "N/A" }}
                  </p>
                  <button
                    class="btn btn-warning btn-sm rounded-pill px-4"
                    @click="editProfile = true"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
              <form
                v-if="editProfile"
                class="mt-4 p-4 bg-white rounded-4 shadow-sm"
              >
                <div class="mb-3">
                  <label for="name" class="form-label fw-semibold">Name</label>
                  <input
                    v-model="profileForm.name"
                    type="text"
                    class="form-control shadow-sm rounded-4"
                    id="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label fw-semibold"
                    >Email</label
                  >
                  <input
                    v-model="profileForm.email"
                    type="email"
                    class="form-control shadow-sm rounded-4"
                    id="email"
                    placeholder="Email address"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label fw-semibold"
                    >Address</label
                  >
                  <input
                    v-model="profileForm.address"
                    type="text"
                    class="form-control shadow-sm rounded-4"
                    id="address"
                    placeholder="Enter your address"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label fw-semibold"
                    >New Password</label
                  >
                  <input
                    v-model="profileForm.password"
                    type="password"
                    class="form-control shadow-sm rounded-4"
                    id="password"
                    placeholder="Enter new password"
                  />
                </div>
                <div class="d-flex">
                  <button
                    type="button"
                    class="btn btn-warning rounded-pill px-4 me-2"
                    @click="saveProfile"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary rounded-pill px-4"
                    @click="editProfile = false"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <!-- Replace only the Sell tab section in <template> -->
            <!-- In <template>, replace the Sell tab section -->
            <div v-if="activeTab === 'sell'">
              <div class="p-4 bg-white rounded-4 shadow-sm mb-4">
                <h5 class="fw-semibold text-dark mb-4">
                  Post a Product for Sale
                </h5>
                <form @submit.prevent="postProduct">
                  <div class="mb-3">
                    <label for="product-name" class="form-label fw-semibold"
                      >Product Name</label
                    >
                    <input
                      v-model="productForm.p_name"
                      type="text"
                      class="form-control shadow-sm rounded-4"
                      id="product-name"
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="description" class="form-label fw-semibold"
                      >Description</label
                    >
                    <textarea
                      v-model="productForm.p_description"
                      class="form-control shadow-sm rounded-4"
                      id="description"
                      rows="4"
                      placeholder="Describe the product"
                      required
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="price" class="form-label fw-semibold"
                      >Price</label
                    >
                    <input
                      v-model.number="productForm.p_price"
                      type="number"
                      class="form-control shadow-sm rounded-4"
                      id="price"
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="category" class="form-label fw-semibold"
                      >Category</label
                    >
                    <select
                      v-model="productForm.p_category"
                      class="form-select shadow-sm rounded-4"
                      id="category"
                      required
                    >
                      <option value="" disabled>Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home & Living</option>
                      <option value="sports">Sports</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="condition" class="form-label fw-semibold"
                      >Condition</label
                    >
                    <select
                      v-model="productForm.p_condition"
                      class="form-select shadow-sm rounded-4"
                      id="condition"
                      required
                    >
                      <option value="" disabled>Select condition</option>
                      <option value="new">New</option>
                      <option value="used">Used</option>
                      <option value="refurbished">Refurbished</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="product-image" class="form-label fw-semibold"
                      >Product Image</label
                    >
                    <input
                      @change="handleFileChange"
                      type="file"
                      class="form-control shadow-sm rounded-4"
                      id="product-image"
                      accept="image/*"
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-warning rounded-pill px-4"
                  >
                    Post for Sale
                  </button>
                </form>
              </div>
              <h5 class="fw-semibold text-dark mb-3">My Sale Posts</h5>
              <div class="table-responsive">
                <table class="table table-hover bg-white rounded-4 shadow-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Condition</th>
                      <th>Status</th>
                      <th>Approval</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in products" :key="product.id">
                      <td>{{ product.p_name }}</td>
                      <td>${{ product.p_price }}</td>
                      <td>{{ product.p_category }}</td>
                      <td>{{ product.p_condition }}</td>
                      <td>{{ product.p_status }}</td>
                      <td>{{ product.p_approval }}</td>
                      <td>
                        <button
                          class="btn btn-outline-warning btn-sm rounded-pill px-3 me-1"
                          @click="openEditModal(product)"
                        >
                          Edit
                        </button>
                        <button
                          class="btn btn-outline-danger btn-sm rounded-pill px-3"
                          @click="deleteProduct(product.id, product.p_name)"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Edit Product Modal -->
            <div
              class="modal"
              id="editProductModal"
              tabindex="-1"
              aria-labelledby="editProductModalLabel"
              aria-hidden="true"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content rounded-4">
                  <div class="modal-header bg-warning text-white">
                    <h5 class="modal-title fw-bold" id="editProductModalLabel">
                      Edit Product
                    </h5>
                    <button
                      type="button"
                      class="btn-close btn-close-white"
                      @click="closeEditModal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="submitEdit">
                      <div class="mb-3">
                        <label
                          for="edit-product-name"
                          class="form-label fw-semibold"
                          >Product Name</label
                        >
                        <input
                          v-model="editForm.p_name"
                          type="text"
                          class="form-control shadow-sm rounded-4"
                          id="edit-product-name"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="edit-description"
                          class="form-label fw-semibold"
                          >Description</label
                        >
                        <textarea
                          v-model="editForm.p_description"
                          class="form-control shadow-sm rounded-4"
                          id="edit-description"
                          rows="4"
                          required
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="edit-price" class="form-label fw-semibold"
                          >Price</label
                        >
                        <input
                          v-model.number="editForm.p_price"
                          type="number"
                          class="form-control shadow-sm rounded-4"
                          id="edit-price"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="edit-category"
                          class="form-label fw-semibold"
                          >Category</label
                        >
                        <select
                          v-model="editForm.p_category"
                          class="form-select shadow-sm rounded-4"
                          id="edit-category"
                          required
                        >
                          <option value="" disabled>Select category</option>
                          <option value="electronics">Electronics</option>
                          <option value="fashion">Fashion</option>
                          <option value="home">Home & Living</option>
                          <option value="sports">Sports</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label
                          for="edit-condition"
                          class="form-label fw-semibold"
                          >Condition</label
                        >
                        <select
                          v-model="editForm.p_condition"
                          class="form-select shadow-sm rounded-4"
                          id="edit-condition"
                          required
                        >
                          <option value="" disabled>Select condition</option>
                          <option value="new">New</option>
                          <option value="used">Used</option>
                          <option value="refurbished">Refurbished</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label
                          for="edit-product-image"
                          class="form-label fw-semibold"
                          >Product Image</label
                        >
                        <input
                          @change="handleEditFileChange"
                          type="file"
                          class="form-control shadow-sm rounded-4"
                          id="edit-product-image"
                          accept="image/*"
                        />
                        <img
                          v-if="
                            editForm.p_photo &&
                            typeof editForm.p_photo === 'string'
                          "
                          :src="`http://localhost:5000${editForm.p_photo}`"
                          alt="Current Image"
                          class="img-fluid mt-2 rounded"
                          style="max-height: 100px"
                        />
                      </div>
                      <button
                        type="submit"
                        class="btn btn-warning rounded-pill px-4"
                      >
                        Save Changes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <!-- My Purchases / Order History -->
            <div v-if="activeTab === 'purchases'">
              <h5 class="fw-semibold text-dark mb-4">My Purchases</h5>
              <div class="table-responsive">
                <table class="table table-hover bg-white rounded-4 shadow-sm">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#12345</td>
                      <td>Sample Product</td>
                      <td>$100</td>
                      <td>2025-06-01</td>
                      <td>
                        <span
                          class="badge bg-warning text-white rounded-pill px-2"
                          >Delivered</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- My Exchange Listings -->
            <div v-if="activeTab === 'exchange'">
              <h5 class="fw-semibold text-dark mb-4">My Exchange Listings</h5>
              <div class="table-responsive">
                <table class="table table-hover bg-white rounded-4 shadow-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Requests</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sample Exchange Item</td>
                      <td>Electronics</td>
                      <td>
                        <span
                          class="badge bg-warning text-white rounded-pill px-2"
                          >1 Request</span
                        >
                      </td>
                      <td>
                        <button
                          class="btn btn-outline-warning btn-sm rounded-pill px-3 me-1"
                        >
                          View Requests
                        </button>
                        <button
                          class="btn btn-outline-danger btn-sm rounded-pill px-3"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Exchange Requests Sent -->
            <div v-if="activeTab === 'requests'">
              <h5 class="fw-semibold text-dark mb-4">Exchange Requests Sent</h5>
              <div class="table-responsive">
                <table class="table table-hover bg-white rounded-4 shadow-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Seller</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sample Item</td>
                      <td>John Doe</td>
                      <td>
                        <span
                          class="badge bg-warning text-white rounded-pill px-2"
                          >Pending</span
                        >
                      </td>
                      <td>
                        <button
                          class="btn btn-outline-warning btn-sm rounded-pill px-3"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Notifications -->
            <div v-if="activeTab === 'notifications'">
              <h5 class="fw-semibold text-dark mb-4">Notifications</h5>
              <div class="list-group">
                <div
                  class="list-group-item list-group-item-action bg-white rounded-4 shadow-sm mb-2 p-3"
                >
                  <div
                    class="d-flex w-100 justify-content-between align-items-center"
                  >
                    <h6 class="mb-1 text-dark">Exchange Request Accepted</h6>
                    <small class="text-muted">2025-06-01</small>
                  </div>
                  <p class="mb-0 text-muted">
                    Your request for Sample Item was accepted.
                  </p>
                </div>
              </div>
            </div>

            <!-- Upload Product for Exchange -->
            <div v-if="activeTab === 'upload-exchange'">
              <div class="p-4 bg-white rounded-4 shadow-sm">
                <h5 class="fw-semibold text-dark mb-4">
                  Upload Product for Exchange
                </h5>
                <form>
                  <div class="mb-3">
                    <label for="exchange-name" class="form-label fw-semibold"
                      >Product Name</label
                    >
                    <input
                      type="text"
                      class="form-control shadow-sm rounded-4"
                      id="exchange-name"
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label
                      for="exchange-description"
                      class="form-label fw-semibold"
                      >Description</label
                    >
                    <textarea
                      class="form-control shadow-sm rounded-4"
                      id="exchange-description"
                      rows="4"
                      placeholder="Describe the product"
                      required
                    ></textarea>
                  </div>
                  <div class="mb-3">
                    <label
                      for="exchange-category"
                      class="form-label fw-semibold"
                      >Category</label
                    >
                    <select
                      class="form-select shadow-sm rounded-4"
                      id="exchange-category"
                      required
                    >
                      <option value="" disabled selected>
                        Select category
                      </option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home & Living</option>
                      <option value="sports">Sports</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label
                      for="exchange-condition"
                      class="form-label fw-semibold"
                      >Condition</label
                    >
                    <select
                      class="form-select shadow-sm rounded-4"
                      id="exchange-condition"
                      required
                    >
                      <option value="" disabled selected>
                        Select condition
                      </option>
                      <option value="new">New</option>
                      <option value="used">Used</option>
                      <option value="refurbished">Refurbished</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="exchange-image" class="form-label fw-semibold"
                      >Product Image</label
                    >
                    <input
                      type="file"
                      class="form-control shadow-sm rounded-4"
                      id="exchange-image"
                      accept="image/*"
                    />
                  </div>
                  <button
                    type="button"
                    class="btn btn-warning rounded-pill px-4"
                  >
                    Post for Exchange
                  </button>
                </form>
              </div>
            </div>

            <!-- Wishlist -->
            <div v-if="activeTab === 'wishlist'">
              <h5 class="fw-semibold text-dark mb-4">Saved Items / Wishlist</h5>
              <div class="table-responsive">
                <table class="table table-hover bg-white rounded-4 shadow-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sample Wishlist Item</td>
                      <td>$150</td>
                      <td>Fashion</td>
                      <td>
                        <button
                          class="btn btn-outline-danger btn-sm rounded-pill px-3"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Logout Button -->
            <div class="text-end mt-4">
              <button class="btn btn-danger rounded-pill px-4" @click="logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { useProductStore } from "../stores/product.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const authStore = useAuthStore();
const productStore = useProductStore();
const router = useRouter();
const user = authStore.user;

const activeTab = ref("sell");
const products = ref(productStore.products);
const productForm = ref({
  p_name: "",
  p_description: "",
  p_price: null,
  p_category: "",
  p_condition: "",
  p_photo: null,
});

const editForm = ref({
  id: null,
  p_name: "",
  p_description: "",
  p_price: null,
  p_category: "",
  p_condition: "",
  p_photo: null,
});

let editModal = null;

async function postProduct() {
  try {
    console.log("Form data:", productForm.value);
    const formData = new FormData();
    formData.append("p_name", productForm.value.p_name);
    formData.append("p_description", productForm.value.p_description);
    formData.append("p_price", productForm.value.p_price);
    formData.append("p_category", productForm.value.p_category);
    formData.append("p_condition", productForm.value.p_condition);
    if (productForm.value.p_photo) {
      formData.append("p_photo", productForm.value.p_photo);
      console.log("Appending file:", productForm.value.p_photo);
    }
    await productStore.createProduct(formData);
    productForm.value = {
      p_name: "",
      p_description: "",
      p_price: null,
      p_category: "",
      p_condition: "",
      p_photo: null,
    };
    document.getElementById("product-image").value = "";
    alert("Product posted successfully (pending approval)");
  } catch (err) {
    console.error("Failed to post product:", err.response?.data || err);
    alert(
      `Failed to post product: ${
        err.response?.data?.error || err.response?.data?.details || err.message
      }`
    );
  }
}

function handleFileChange(event) {
  productForm.value.p_photo = event.target.files[0];
  console.log("Selected file:", productForm.value.p_photo);
}

function handleEditFileChange(event) {
  editForm.value.p_photo = event.target.files[0];
  console.log("Selected edit file:", editForm.value.p_photo);
}

async function fetchProducts() {
  try {
    await productStore.fetchUserProducts();
    products.value = productStore.products;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    alert("Failed to fetch products");
  }
}
function openEditModal(product) {
  console.log('Opening edit modal for product:', product);
  editForm.value = {
    id: product.id,
    p_name: product.p_name,
    p_description: product.p_description || '',
    p_price: product.p_price,
    p_category: product.p_category,
    p_condition: product.p_condition,
    p_photo: product.p_photo || null, // Handle null p_photo
  };
  const modalElement = document.getElementById('editProductModal');
  if (modalElement && window.bootstrap?.Modal) {
    editModal = new window.bootstrap.Modal(modalElement, { backdrop: 'static', keyboard: false });
    editModal.show();
  } else {
    console.error('Bootstrap Modal not available or modal element not found');
    alert('Failed to open edit modal. Please ensure Bootstrap is loaded.');
  }
}

function closeEditModal() {
  if (editModal) {
    editModal.hide();
    editModal = null;
  }
}
async function submitEdit() {
  try {
    console.log("Edit form data:", editForm.value);
    const formData = new FormData();
    formData.append("p_name", editForm.value.p_name);
    formData.append("p_description", editForm.value.p_description);
    formData.append("p_price", editForm.value.p_price);
    formData.append("p_category", editForm.value.p_category);
    formData.append("p_condition", editForm.value.p_condition);
    if (editForm.value.p_photo instanceof File) {
      formData.append("p_photo", editForm.value.p_photo);
      console.log("Appending edit file:", editForm.value.p_photo);
    }
    await productStore.updateProduct(editForm.value.id, formData);
    closeEditModal();
    alert("Product updated successfully");
  } catch (err) {
    console.error("Failed to update product:", err.response?.data || err);
    alert(
      `Failed to update product: ${
        err.response?.data?.error || err.response?.data?.details || err.message
      }`
    );
  }
}

// In <script setup>, replace confirmDelete with deleteProduct
async function deleteProduct(id, name) {
  if (confirm(`Are you sure you want to delete ${name}?`)) {
    try {
      console.log('Attempting to delete product ID:', id);
      const response = await productStore.deleteProduct(id);
      console.log('Delete product success:', response);
      
      // 🧠 Dynamically update the UI
      products.value = products.value.filter(product => product.id !== id);
      
      alert('Product deleted successfully');
    } catch (err) {
      console.error('Failed to delete product:', err);
     products.value = products.value.filter(product => product.id !== id);
    }
  }
}

// Reactive states for frontend functionality

const editProfile = ref(false);
const profileForm = ref({
  name: user?.name || "",
  email: user?.email || "",
  address: "",
  password: "",
});

// Placeholder function to avoid errors (no backend submission)
const saveProfile = () => {
  editProfile.value = false; // Reset form visibility
};

async function logout() {
  try {
    await authStore.logout();
    router.push("/login");
  } catch (err) {
    console.error("Logout failed:", err);
  }
}

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

.form-container {
  max-width: 900px;
}
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-header {
  background: linear-gradient(90deg, #ffc107, #e0a800);
}
.nav-tabs {
  background: #f8f9fa;
}
.nav-tabs .nav-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  padding: 12px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
}
.nav-tabs .nav-link:hover {
  background: #fff3cd;
  color: #e0a800;
}
.nav-tabs .nav-link.active {
  background: #ffc107;
  color: #fff !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.form-control,
.form-select {
  font-size: 0.9rem;
  border-color: #e5e7eb;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.form-control:focus,
.form-select:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.2);
}
.form-label {
  font-weight: 600;
  color: #374151;
}
.btn-warning {
  font-weight: 600;
  background: #ffc107;
  border: none;
  transition: all 0.3s ease;
}
.btn-warning:hover {
  background: #e0a800;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.btn-outline-warning {
  border-color: #ffc107;
  color: #ffc107;
  font-weight: 600;
}
.btn-outline-warning:hover {
  background: #e0a800;
  color: #fff;
  transform: translateY(-2px);
}
.btn-outline-secondary {
  border-color: #6b7280;
  color: #6b7280;
}
.btn-outline-secondary:hover {
  background: #6b7280;
  color: #fff;
}
.table {
  border-collapse: separate;
  border-spacing: 0;
}
.table th {
  font-weight: 600;
  color: #374151;
  background: #f8f9fa;
}
.table td {
  vertical-align: middle;
}
.table-hover tbody tr:hover {
  background: #fff3cd;
}
.list-group-item {
  transition: background 0.3s ease;
}
.list-group-item:hover {
  background: #fff3cd;
  transform: translateX(5px);
}
.badge {
  font-weight: 600;
}
</style>
