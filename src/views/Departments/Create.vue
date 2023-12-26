<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>Add Departments</h4>
        </div>
        <div class="card-body">
          <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
            <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">{{ error[0] }}</li>
          </ul>
          <div class="mb-3">
          <label for="name">Department</label>
          <input type="text" id="name" class="form-control" v-model="model.departments.department" autocomplete="name" />
        </div>
          <div class="mb-3">
            <button type="button" @click="saveDepartments" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>  

<script>
import axios from 'axios';

export default{
    name: 'departmentsCreate',
    data(){
        return{
            errorList: '',
            model: {
                departments: {
                    department: '',
                },
            },
        };
    },
    methods: {
        saveDepartments(){

            var mythis = this;
            axios.post('http://127.0.0.1:8000/api/departments', this.model.departments)
            .then(res =>{

                console.log(res.data)
                alert(res.data.message);
                this.model.departments = {
                    name: '',
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
}

</script>