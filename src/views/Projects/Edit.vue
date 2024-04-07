<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>Edit Project</h4>
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
            <button type="button" @click="updateProject" class="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
import axios from 'axios';

export default {
  name: 'projectEdit',
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
  mounted(){
    this.getProjectData(this.$route.params.id);
  },
  methods: {
    getProjectData(projectId){
      axios.get(`http://localhost:5173/project/${projectId}/edit`)
      .then(res=>{
          console.log(res.data.project );

          this.model.project = res.data.project
          
      })
      .catch(error => {
          if (error.response) {
            if (error.response.status === 404 ) {
              this.errorList = error.response.data.errors;
            }
          } else {
            console.error('Error', error.message);
          }
          console.log(error.config);
        });
    },
    updateProject() {
      axios.put(`https://jsonplaceholder.typicode.com/todos/${projectId}/edit`, this.model.project)
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