<template>
    <div class="container">
      <div>
        <div class="card">
          <div class="card-header">
              <h4>
                  Departments
                  <RouterLink to="/departments/create" class="btn btn-primary float-end">Add Employees</RouterLink>
              </h4>
          </div>
          <div class="card-body">
              <table class="table table-bordered">
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Department</th>
                          <th>Created At</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody v-if="this.departments.length > 0">
                      <tr v-for="(departments, index) in this.departments" :key="index">  
                          <td>{{ departments.id }}</td>
                          <td>{{ departments.department }}</td>
                          <td>{{ departments.created_at }}</td>
                          <td>
                              <RouterLink :to="{ path: '/departments/'+departments.id+'/edit' }" class="btn btn-success">
                                  Edit
                              </RouterLink>
                              &#160;
                              <button type="button" @click="deleteDepartments(departments.id)" class="btn btn-danger">
                                  Delete
                              </button>
                          </td>
                      </tr>
                  </tbody>
                  <tbody v-else>
                      <tr>
                          <td colspan="8">No data available</td>
                      </tr>
                  </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  import axios from 'axios';
  
  export default{
      name: 'departmets',
      data(){
      return {
          departments: [],
      }
      },
          mounted(){
              this.getDepartments();
          },
          methods: {
          getDepartments(){
              axios.get('http://127.0.0.1:8000/api/departments').then(res => {
                  this.departments = res.data.departments;
                  console.log(this.departments);
              });
          },
          deleteDepartments(departmentsId){
              if(confirm('Are you sure you want to delete the department?')){
                  // console.log(departmentsId);
                  axios.delete(`http://127.0.0.1:8000/api/departments/${departmentsId}/delete`)
                  .then( res=> {
                      alert(res.data.message);
                      this.getDepartments();
                  }).catch(function (error){
  
                      if (error.response) {
  
                      if (error.response.status == 404) {
  
                          alert(error.response.data.message);
                      }
                      } 
                      });
              }
          },
          },
          };
  </script>