<template>
    <div class="container">
      <div>
        <div class="card">
          <div class="card-header">
            <h4>
              Projects
              <RouterLink to="/projects/create" class="btn btn-primary float-end">Add Projects</RouterLink>
            </h4>
          </div>
          <div class="card-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project Title</th>
                  <th>Project Description</th>
                  <th>Project Status</th>
                  <th>Employees</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="projects.length > 0">
                <tr v-for="(projects, index) in projects" :key="projects.index">
                  <td>{{ projects.id }}</td>
                  <td>{{ projects.project_title }}</td>
                  <td>{{ projects.project_description }}</td>
                  <td>{{ projects.project_status }}</td>
                  <td>
                    <ul>
                      <li v-for="(projects, employeeIndex) in projects.employees" :key="employeeIndex">
                        {{ projects.name }} <!-- Display employee names here -->
                      </li>
                    </ul>
                  </td>
                  <!-- <td>
                    <ul>
                      <li v-for="(employees, employeeIndex) in projects.employees" :key="employeeIndex">
                        {{ employees.name }}
                      </li>
                    </ul>
                  </td> -->
                  <td>{{ projects.created_at }}</td>
                  <td>
                    <RouterLink :to="{ path: '/projects/' + projects.id + '/edit' }" class="btn btn-success">
                      Edit
                    </RouterLink>
                    &#160;
                    <button type="button" @click="deleteProjects(projects.id)" class="btn btn-danger">
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
  
  export default {
    name: 'projects',
    data() {
      return {
        projects: [],
      };
    },
    mounted() {
      this.getProjects();
    },
    methods: { 
      getProjects(){
              axios.get('http://127.0.0.1:8000/api/projects').then(res => {
                  this.projects = res.data.projects;
                  console.log(this.projects);
              });
          },
    //  getProjects() {
    //   axios.get('http://127.0.0.1:8000/api/projects').then(async (res) => {
    //     this.projects = res.data.projects;
    //     console.log(this.projects);

    //     // Fetch employees for each project
    //     for (const projects of this.projects) {
    //       projects.employees = await this.getEmployeesForProject(projects.id);
    //     }
    //   });
    // },
    // async getEmployeesForProject(project_id) {
    //   try {
    //     const response = await axios.get(`http://127.0.0.1:8000/api/projects/${project_id}`);
    //     const employee_id = response.data.employee_id;

    //     // Fetch employee data using the employee IDs
    //     const employeesResponse = await axios.get(`http://127.0.0.1:8000/api/employees?ids=${employee_id}`);
    //     return employeesResponse.data.employees;
    //   } catch (error) {
    //     console.error(error);
    //     return [];
    //   }
    // },
      deleteProjects(projectsId) {
        if (confirm('Are you sure you want to delete the project?')) {
          axios
            .delete(`http://127.0.0.1:8000/api/projects/${projectsId}/delete`)
            .then((res) => {
              alert(res.data.message);
              this.getProjects();
            })
            .catch(function (error) {
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
  