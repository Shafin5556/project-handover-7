<template>
  <main
    class="min-vh-100"
    style="background: linear-gradient(135deg, #fff3cd 0%, #fef9e7 100%)"
  >
    <div class="container py-5">
      <div class="form-container mx-auto">
        <div class="card shadow-lg rounded-4 border-0 overflow-hidden">
          <div class="card-header bg-warning text-white text-center py-3">
            <h2 class="fw-bold mb-0">
              Admin Dashboard - Welcome, {{ user?.name || "Admin" }}!
            </h2>
          </div>
          <div class="card-body p-4 p-md-5">
            <!-- Overview Cards -->
            <div class="row mb-4">
              <div class="col-md-3 mb-3">
                <div class="card bg-white rounded-4 shadow-sm text-center p-3">
                  <h6 class="text-warning fw-semibold mb-2">
                    Total Registered Users
                  </h6>
                  <p class="mb-0 fs-4 fw-bold text-dark">1,234</p>
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="card bg-white rounded-4 shadow-sm text-center p-3">
                  <h6 class="text-warning fw-semibold mb-2">Total Products</h6>
                  <p class="mb-0 fs-4 fw-bold text-dark">567</p>
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="card bg-white rounded-4 shadow-sm text-center p-3">
                  <h6 class="text-warning fw-semibold mb-2">
                    Total Exchange Requests
                  </h6>
                  <p class="mb-0 fs-4 fw-bold text-dark">89</p>
                </div>
              </div>
              <div class="col-md-3 mb-3">
                <div class="card bg-white rounded-4 shadow-sm text-center p-3">
                  <h6 class="text-warning fw-semibold mb-2">
                    Pending Approvals
                  </h6>
                  <p class="mb-0 fs-4 fw-bold text-dark">23</p>
                </div>
              </div>
            </div>

            <!-- Navigation Tabs -->
            <ul
              class="nav nav-tabs nav-fill mb-4 border-0 bg-light rounded-4 p-2 shadow-sm"
            >
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'users' }"
                  @click="activeTab = 'users'"
                >
                  <i class="bi bi-people me-1"></i>User Management
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'products' }"
                  @click="activeTab = 'products'"
                >
                  <i class="bi bi-box me-1"></i>Product Approvals
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'exchange' }"
                  @click="activeTab = 'exchange'"
                >
                  <i class="bi bi-arrow-left-right me-1"></i>Exchange Monitoring
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'sell' }"
                  @click="activeTab = 'sell'"
                >
                  <i class="bi bi-cart me-1"></i>Sell Monitoring
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'reports' }"
                  @click="activeTab = 'reports'"
                >
                  <i class="bi bi-flag me-1"></i>Reports
                </button>
              </li>
              <li class="nav-item">
                <button
                  class="nav-link"
                  :class="{ active: activeTab === 'verification' }"
                  @click="activeTab = 'verification'"
                >
                  <i class="bi bi-check-circle me-1"></i>Verification
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
                  :class="{ active: activeTab === 'settings' }"
                  @click="activeTab = 'settings'"
                >
                  <i class="bi bi-gear me-1"></i>Settings
                </button>
              </li>
            </ul>

            <!-- User Management -->
            <div v-if="activeTab === 'users'">
              <h5 class="fw-semibold text-dark mb-4">User Management</h5>
              <div class="table-responsive">
                <table class="table table-hover bg-white rounded-4 shadow-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Documents</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="u in users" :key="u.id">
                      <td>{{ u.name }}</td>
                      <td>{{ u.email }}</td>
                      <td>
                        <span
                          class="badge bg-warning text-white rounded-pill px-2"
                          >{{ u.stats }}</span
                        >
                      </td>
                      <td>
                        <button
                          v-if="u.nid_photo"
                          class="btn btn-link text-warning p-0"
                          @click="openNidModal(u.nid_photo, u.name)"
                        >
                          View NID
                        </button>
                        <span v-else class="text-muted">No NID</span>
                      </td>
                      <td>
                        <button
                          class="btn btn-outline-warning btn-sm rounded-pill px-3 me-1"
                          @click="updateStatus(u.id, 'active')"
                          :disabled="u.stats === 'active'"
                        >
                          Activate
                        </button>
                        <button
                          class="btn btn-outline-warning btn-sm rounded-pill px-3 me-1"
                          @click="updateStatus(u.id, 'inactive')"
                          :disabled="u.stats === 'inactive'"
                        >
                          Deactivate
                        </button>
                        <button
                          class="btn btn-outline-danger btn-sm rounded-pill px-3 me-1"
                          @click="updateStatus(u.id, 'banned')"
                          :disabled="u.stats === 'banned'"
                        >
                          Ban
                        </button>
                        <button
                          class="btn btn-danger btn-sm rounded-pill px-3"
                          @click="confirmDelete(u.id, u.name)"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- NID Modal -->
            <div
              class="modal"
              id="nidModal"
              tabindex="-1"
              aria-labelledby="nidModalLabel"
              aria-hidden="true"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content rounded-4">
                  <div class="modal-header bg-warning text-white">
                    <h5 class="modal-title fw-bold" id="nidModalLabel">
                      NID Photo - {{ nidUserName }}
                    </h5>
                    <button
                      type="button"
                      class="btn-close btn-close-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body text-center">
                    <img
                      :src="nidPhoto"
                      alt="NID Photo"
                      class="img-fluid rounded shadow-sm"
                      style="max-height: 500px; object-fit: contain"
                    />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-outline-warning rounded-pill px-4"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Product Post Approvals -->
            <!-- Replace the Product Post Approvals section in <template> -->
            <div v-if="activeTab === 'products'">
              <h5 class="fw-semibold text-dark mb-4">Product Post Approvals</h5>
              <div class="mb-3">
                <label for="approval-filter" class="form-label fw-semibold"
                  >Filter by Approval Status</label
                >
                <select
                  v-model="approvalFilter"
                  @change="fetchAdminProducts"
                  class="form-select shadow-sm rounded-4 w-auto"
                  id="approval-filter"
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div class="table-responsive">
                <table class="table table-hover bg-white rounded-4 shadow-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Type</th>
                      <th>Posted By</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in adminProducts" :key="product.id">
                      <td>{{ product.p_name }}</td>
                      <td>Sell</td>
                      <td>{{ product.user?.name || "Unknown" }}</td>
                      <td>
                        <span
                          :class="{
                            'badge bg-warning text-white rounded-pill px-2':
                              product.p_approval === 'pending',
                            'badge bg-success text-white rounded-pill px-2':
                              product.p_approval === 'approved',
                            'badge bg-danger text-white rounded-pill px-2':
                              product.p_approval === 'rejected',
                          }"
                        >
                          {{ product.p_approval }}
                        </span>
                      </td>
                      <td>
                        <select
                          :value="product.p_approval"
                          @change="
                            updateApproval(product.id, $event.target.value)
                          "
                          class="form-select form-select-sm d-inline-block w-auto me-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
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

            <!-- Exchange Request Monitoring -->
            <div v-if="activeTab === 'exchange'">
              <h5 class="fw-semibold text-dark mb-4">
                Exchange Request Monitoring
              </h5>
              <div class="table-responsive">
                <table class="table table-hover bg-white rounded-4 shadow-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Requester</th>
                      <th>Seller</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sample Item</td>
                      <td>John Doe</td>
                      <td>Jane Smith</td>
                      <td>
                        <span
                          class="badge bg-warning text-white rounded-pill px-2"
                          >Pending</span
                        >
                      </td>
                      <td>
                        <button
                          class="btn btn-outline-warning btn-sm rounded-pill px-3 me-1"
                        >
                          View
                        </button>
                        <button
                          class="btn btn-outline-warning btn-sm rounded-pill px-3 me-1"
                        >
                          Warn
                        </button>
                        <button
                          class="btn btn-outline-danger btn-sm rounded-pill px-3"
                        >
                          Block
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Sell Request Processing -->
            <div v-if="activeTab === 'sell'">
              <h5 class="fw-semibold text-dark mb-4">
                Sell Request Processing
              </h5>
              <div class="table-responsive">
                <table class="table table-hover bg-white rounded-4 shadow-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Buyer</th>
                      <th>Seller</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sample Product</td>
                      <td>John Doe</td>
                      <td>Jane Smith</td>
                      <td>$100</td>
                      <td>
                        <button
                          class="btn btn-outline-warning btn-sm rounded-pill px-3 me-1"
                        >
                          Approve
                        </button>
                        <button
                          class="btn btn-outline-danger btn-sm rounded-pill px-3"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Report Handling -->
            <div v-if="activeTab === 'reports'">
              <h5 class="fw-semibold text-dark mb-4">Report Handling</h5>
              <div class="table-responsive">
                <table class="table table-hover bg-white rounded-4 shadow-sm">
                  <thead>
                    <tr>
                      <th>Reported Item</th>
                      <th>Reported By</th>
                      <th>Reason</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sample Product</td>
                      <td>John Doe</td>
                      <td>Inappropriate Content</td>
                      <td>
                        <button
                          class="btn btn-outline-warning btn-sm rounded-pill px-3 me-1"
                        >
                          View
                        </button>
                        <button
                          class="btn btn-outline-danger btn-sm rounded-pill px-3 me-1"
                        >
                          Remove
                        </button>
                        <button
                          class="btn btn-outline-warning btn-sm rounded-pill px-3"
                        >
                          Warn
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Verification Panel -->
            <div v-if="activeTab === 'verification'">
              <h5 class="fw-semibold text-dark mb-4">Verification Panel</h5>
              <div class="table-responsive">
                <table class="table table-hover bg-white rounded-4 shadow-sm">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Document</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Jane Smith</td>
                      <td><a href="#" class="text-warning">View NID</a></td>
                      <td>
                        <span
                          class="badge bg-warning text-white rounded-pill px-2"
                          >Pending</span
                        >
                      </td>
                      <td>
                        <button
                          class="btn btn-outline-warning btn-sm rounded-pill px-3 me-1"
                        >
                          Approve
                        </button>
                        <button
                          class="btn btn-outline-danger btn-sm rounded-pill px-3"
                        >
                          Deny
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Notification System -->
            <div v-if="activeTab === 'notifications'">
              <h5 class="fw-semibold text-dark mb-4">Send Announcements</h5>
              <div class="p-4 bg-white rounded-4 shadow-sm">
                <form>
                  <div class="mb-3">
                    <label
                      for="notification-title"
                      class="form-label fw-semibold"
                      >Title</label
                    >
                    <input
                      type="text"
                      class="form-control shadow-sm rounded-4"
                      id="notification-title"
                      placeholder="Enter announcement title"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label
                      for="notification-message"
                      class="form-label fw-semibold"
                      >Message</label
                    >
                    <textarea
                      class="form-control shadow-sm rounded-4"
                      id="notification-message"
                      rows="4"
                      placeholder="Enter announcement message"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    class="btn btn-warning rounded-pill px-4"
                  >
                    Send Notification
                  </button>
                </form>
              </div>
              <h5 class="fw-semibold text-dark mt-5 mb-3">
                Sent Announcements
              </h5>
              <div class="list-group">
                <div
                  class="list-group-item list-group-item-action bg-white rounded-4 shadow-sm mb-2 p-3"
                >
                  <div
                    class="d-flex w-100 justify-content-between align-items-center"
                  >
                    <h6 class="mb-1 text-dark">System Update</h6>
                    <small class="text-muted">2025-06-11</small>
                  </div>
                  <p class="mb-0 text-muted">
                    New features added to Exchange Bazar.
                  </p>
                </div>
              </div>
            </div>

            <!-- Admin Settings -->
            <div v-if="activeTab === 'settings'">
              <h5 class="fw-semibold text-dark mb-4">Admin Settings</h5>
              <div class="p-4 bg-white rounded-4 shadow-sm">
                <form>
                  <div class="mb-3">
                    <label for="admin-name" class="form-label fw-semibold"
                      >Name</label
                    >
                    <input
                      type="text"
                      v-model="adminForm.name"
                      class="form-control shadow-sm rounded-4"
                      id="admin-name"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="admin-email" class="form-label fw-semibold"
                      >Email</label
                    >
                    <input
                      type="email"
                      v-model="adminForm.email"
                      class="form-control shadow-sm rounded-4"
                      id="admin-email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="admin-password" class="form-label fw-semibold"
                      >New Password</label
                    >
                    <input
                      type="password"
                      v-model="adminForm.password"
                      class="form-control shadow-sm rounded-4"
                      id="admin-password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <button
                    type="button"
                    class="btn btn-warning rounded-pill px-4"
                    @click="saveSettings"
                  >
                    Save Changes
                  </button>
                </form>
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
import { useAuthStore } from "../stores/auth.js";
import { useProductStore } from "../stores/product";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";

const authStore = useAuthStore();
const productStore = useProductStore();
const router = useRouter();
const user = authStore.user;

const adminProducts = ref(productStore.adminProducts);
const approvalFilter = ref("");

const activeTab = ref("users");
const users = ref([]);
const nidPhoto = ref("");
const nidUserName = ref("");
let nidModal = null;

const adminForm = ref({
  name: user?.name || "",
  email: user?.email || "",
  password: "",
});

async function fetchAdminProducts() {
  try {
    console.log(
      "Fetching admin products with filter:",
      approvalFilter.value || "all"
    );
    await productStore.fetchAdminProducts(approvalFilter.value);
    adminProducts.value = productStore.adminProducts;
  } catch (err) {
    console.error("Failed to fetch admin products:", err);
    alert(
      `Failed to fetch products: ${err.error || err.details || "Unknown error"}`
    );
    adminProducts.value = []; // Clear products on error
  }
}

async function updateApproval(id, p_approval) {
  try {
    console.log("Updating approval for product ID:", id, "to:", p_approval);
    await productStore.updateProductApproval(id, p_approval);
    alert("Approval status updated successfully");
  } catch (err) {
    console.error("Failed to update approval:", err);
    alert(
      `Failed to update approval: ${
        err.error || err.details || "Unknown error"
      }`
    );
    await fetchAdminProducts(); // Refresh on error
  }
}

async function deleteProduct(id, name) {
  if (confirm(`Are you sure you want to delete ${name}?`)) {
    try {
      console.log("Deleting product ID:", id);
      await productStore.deleteProduct(id);
      // Remove product from adminProducts
      adminProducts.value = adminProducts.value.filter((p) => p.id !== id);
      alert("Product deleted successfully");
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert(`Error: ${err.error || err.details || "Unknown error"}`);
    }
  }
}

const saveSettings = () => {
  // Placeholder function to avoid errors (no backend submission)
};

function openNidModal(photo, name) {
  nidPhoto.value = `http://localhost:5000${photo}`;
  nidUserName.value = name;
  const modal = new Modal(document.getElementById("nidModal"));
  modal.show();
}

async function fetchUsers() {
  try {
    users.value = await authStore.getUsers();
  } catch (err) {
    console.error("Failed to fetch users:", err);
  }
}

async function updateStatus(userId, stats) {
  try {
    const updatedUser = await authStore.updateUserStatus(userId, stats);
    const index = users.value.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users.value[index] = updatedUser;
    }
  } catch (err) {
    console.error("Failed to update user status:", err);
  }
}

function confirmDelete(userId, userName) {
  if (confirm(`Are you sure you want to delete ${userName}?`)) {
    deleteUser(userId);
  }
}

async function deleteUser(userId) {
  try {
    await authStore.deleteUser(userId);
    users.value = users.value.filter((u) => u.id !== userId);
  } catch (err) {
    console.error("Failed to delete user:", err);
    alert("Failed to delete user");
  }
}

onMounted(() => {
  fetchUsers();
  fetchAdminProducts();
});

// Original logout function preserved
async function logout() {
  try {
    await authStore.logout();
    router.push("/login");
  } catch (err) {
    console.error("Logout failed:", err);
  }
}
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
