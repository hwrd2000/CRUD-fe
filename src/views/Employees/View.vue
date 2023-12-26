<template>
  <div class="container">
    <div>
      <div class="card">
        <div class="card-header">
            <h4>
                Employees
                <RouterLink to="/employees/create" class="btn btn-primary float-end">Add Employees</RouterLink>
            </h4>
        </div>
        <div class="card-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Department</th>
                        <th>Photo</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody v-if="this.employees.length > 0">
                    <tr v-for="(employees, index) in this.employees" :key="index">  
                        <td>{{ employees.id }}</td>
                        <td>{{ employees.name }}</td>
                        <td>{{ employees.email }}</td>
                        <td>{{ employees.phone }}</td>
                        <td>{{ employees.address }}</td>
                        <td>{{ getDepartmentName(employees.department_id) }}</td>
                        <td>
                            <img :src="getEmployeePhotoUrl(employees.photo)" alt="Employee Photo" width="100" height="100" />
                        </td>
                        <td>{{ employees.created_at }}</td>
                        <td>
                            <RouterLink :to="{ path: '/employees/'+employees.id+'/edit' }" class="btn btn-success">
                                Edit
                            </RouterLink>
                            &#160;
                            <button type="button" @click="deleteEmployees(employees.id)" class="btn btn-danger">
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
    name: 'employees',
    data(){
    return {
        employees: [],
        departments: [], // To store department names
    }
    },
        mounted(){
            this.getEmployees();
            this.getDepartments(); // Fetch department names
        },
        methods: {
        getEmployees(){
            axios.get('http://127.0.0.1:8000/api/employees').then(res => {
                this.employees = res.data.employees;
                console.log(this.employees);
            });
        },
        getDepartments() {
        axios.get('http://127.0.0.1:8000/api/departments').then((res) => {
            this.departments = res.data.departments;
            console.log(this.departments);
        });
        },
        getDepartmentName(department_id) {
        // Find the department name based on the department_id
        const department = this.departments.find((d) => d.id === department_id);
        return department ? department.department : 'Loading...'; // Return department name or 'Loading...'
        },
        deleteEmployees(employeesId){
            if(confirm('Are you sure you want to delete the employee?')){
                // console.log(employeesId);
                axios.delete(`http://127.0.0.1:8000/api/employees/${employeesId}/delete`)
                .then( res=> {
                    alert(res.data.message);
                    this.getEmployees();
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
        computed: {
            getEmployeePhotoUrl() {
                return (photo) => {
                if (photo) {
                    return `http://127.0.0.1:8000/storage/${photo}`;
                } else {
                    // If the employee doesn't have a photo, use a default "no photo" image
                    return 'No available photo'; // Replace with the actual path to your default "no photo" image
                }
                };
            },
            },
        };
</script>