<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>Project
          <RouterLink to="project/create" class="btn btn-primary float-end">
            add project
          </RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>UserID</th>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody v-if="this.projects.length > 0">
            <tr v-for="(project, index) in paginatedProjects" :key="index">
              <td>{{ project.userId }}</td>
              <td>{{ project.id }}</td>
              <td>{{ project.title }}</td>
              <td>{{ project.completed }}</td>
              <td>
                <RouterLink :to="{path:'/project/'+project.id+'/edit'}" class="btn btn-success float-end">Edit</RouterLink>
                <button type="button" class="btn btn-danger float-end">Delete</button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7">Loading...</td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Page navigation" v-if="totalPages > 1">
          <ul class="pagination">
            <li class="page-item" :disabled="currentPage === 1">
              <a class="page-link" href="#" @click.prevent="changePage(-1)">Previous</a>
            </li>
            <li v-for="n in totalPages" :key="n" class="page-item">
              <a class="page-link" href="#" :class="{ active: currentPage === n }" @click.prevent="selectPage(n)">
                {{ n }}
              </a>
            </li>
            <li class="page-item" :disabled="currentPage === totalPages">
              <a class="page-link" href="#" @click.prevent="changePage(1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'project',
  data() {
    return {
      projects: [],
      currentPage: 1, // Current page number
      pageSize: 10, // Number of projects per page
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.projects.length / this.pageSize);
    },
    paginatedProjects() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = Math.min(startIndex + this.pageSize, this.projects.length);
      return this.projects.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.getProject();
    console.log('i am here');
  },
  methods: {
    getProject() {
      axios.get('https://jsonplaceholder.typicode.com/todos')
        .then((res) => {
          this.projects = res.data;
          console.log(res);
        });
    },
    
    changePage(delta) {
      this.currentPage = Math.max(1, Math.min(this.totalPages, this.currentPage+delta));
      
    },
    selectPage(delta) {
      this.currentPage = Math.max(1, Math.min(this.totalPages, delta));
      
    },

  },
};
</script>

