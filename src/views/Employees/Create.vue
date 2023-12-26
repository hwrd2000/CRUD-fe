<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>Add Employees</h4>
        </div>
        <div class="card-body">
          <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
            <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">{{ error[0] }}</li>
          </ul>
          <div class="mb-3">
          <label for="name">Name</label>
          <input type="text" id="name" class="form-control" v-model="model.employees.name" autocomplete="name" />
        </div>
        <div class="mb-3">
          <label for="email">Email</label>
          <input type="text" id="email"  class="form-control" v-model="model.employees.email" autocomplete="email" />
        </div>
        <div class="mb-3">
          <label for="phone">Phone</label>
          <input type="text" id="phone"  class="form-control" v-model="model.employees.phone" autocomplete="phone" />
        </div>
        <div class="mb-3">
          <label for="address">Address</label>
          <input type="text"  id="address" class="form-control" v-model="model.employees.address" autocomplete="address" />
        </div>
        <div class="mb-3">
          <label for="department_id">Department</label>
          <select class="form-control"  id="department_id" v-model="model.employees.department_id" autocomplete="department_id">
            <option value="" disabled>Select a department</option>
            <option v-for="department in departments" :value="department.id" :key="department.id">{{ department.department }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="photo">Photo</label>
          <input type="file" class="form-control" id="photo" @change="handleFileUpload" accept="image/*" />
        </div>
          <div class="mb-3">
            <button type="button" @click="saveEmployees" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>  

<script>
import axios from 'axios';

export default{
    name: 'employeesCreate',
    data(){
        return{
            errorList: '',
            model: {
                employees: {
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    department_id: '',
                    photo: '',
                },
            },
            departments: [],
        };
    },
    methods: {
        saveEmployees(){

            var mythis = this;
            axios.post('http://127.0.0.1:8000/api/employees', this.model.employees)
            .then(res =>{

                console.log(res.data)
                alert(res.data.message);
                this.model.employees = {
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    department_id: '',
                    photo: '',
                }
                this.errorList = ''
            })
            .catch(function (error){

                if (error.response) {

                if (error.response.status == 422) {

                    mythis.errorList = error.response.data.errors;
                }

                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);

                } else if (error.request) {
                console.log(error.request);
                } else {
                console.log('Error', error.message);
                }
            });
        }
    },
    //added this from chatgpt
    mounted() {
    // Fetch the list of departments from your API
    axios.get('http://127.0.0.1:8000/api/departments')
      .then((res) => {
        this.departments = res.data.departments; // Assuming the API response is an array of departments
      })
      .catch((error) => {
        console.error('Error fetching departments:', error);
      });
    },
    //added this from chatgpt
    handleFileUpload(event) {
      // Update the 'photo' property with the selected file
      this.model.employees.photo = event.target.files[0];
    },
}

</script>