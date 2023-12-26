<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit Departments</h4>
      </div>
      <div class="card-body">
        <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
          <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">{{ error[0] }}</li>
        </ul>
        <div class="mb-3">
          <label for="name">Department</label>
          <input type="text" id="name" class="form-control" v-model="model.departments.department" autocomplete="name">
        </div>
        <div class="mb-3">
          <button type="button" @click="updateDepartments" class="btn btn-primary">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>  

<script>
import axios from 'axios';

export default{
  name: 'departmentsEdit',
  data(){
        return{
          departmentsId: '',
            errorList: '',
            model: {
              departments: {
                        department: '',
                      },
                    },
        };
  },
  methods: {

    getDepartmentsData(departmentsId){

      axios.get(`http://127.0.0.1:8000/api/departments/${departmentsId}/edit`)
      .then(res => {
        console.log(res.data);

        this.model.departments = res.data.departments;
      })
      .catch(function (error){

            if (error.response) {

            if (error.response.status == 404) {

                  alert(error.response.data.message);
              }
            } 
          });
    },

    updateDepartments(){

          var mythis = this;
          axios.put(`http://127.0.0.1:8000/api/departments/${this.departmentsId}/edit`, this.model.departments)
          .then(res =>{

              console.log(res.data)
              alert(res.data.message);
              
              this.errorList = ''
          })
          .catch(function (error){

              if (error.response) {

              if (error.response.status == 422) {

                  mythis.errorList = error.response.data.errors;
              }

              if (error.response.status == 404) {

                  alert(error.response.data.message);
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

    //console.log(this.$route.params.id);
    this.departmentsId = this.$route.params.id;
    this.getDepartmentsData(this.$route.params.id);

  },
}

</script>