<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>Add Project</h4>
        </div>
        <div class="card-body">
          <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
            <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
              {{ error[0] }}
            </li>
          </ul>
          <div class="mb-3">
            <label for="projectTitle">Title</label> <input type="text" id="projectTitle" v-model="model.project.title" class="form-control"> </div>
          <div class="mb-3">
            <label for="projectCompleted">Completed</label> <input type="text" id="projectCompleted" v-model="model.project.completed" class="form-control"> </div>
          <div class="mb-3">
            <button type="button" @click="saveProject" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
import axios from 'axios';

export default {
  name: 'projectCreate',
  data() {
    return {
      errorList: '',
      model: {
        project: {
          title: '',
          completed: ''
        }
      }
    };
  },
  methods: {
    saveProject() {
      axios.post('https://jsonplaceholder.typicode.com/todos', this.model.project)
        .then(res => {
          console.log(res.data);
          alert(res.data.message);
          this.model.project = { title: '', completed: '' };
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 422) {
              this.errorList = error.response.data.errors;
            }
          } else {
            console.error('Error', error.message);
          }
          console.log(error.config);
        });
    }
  }
};

</script>