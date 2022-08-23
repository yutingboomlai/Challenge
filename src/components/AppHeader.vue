<template>

  <header>
      <nav class="header-left-icon">
      
      <router-link to="/signup">
          <button class="icon">
            <font-awesome-icon :icon="['fas', 'long-arrow-alt-left']" />
          </button>
        </router-link>

        <div class="header-right-icon">
          <div>
            <button class="icon" @click="goBack()">
              <font-awesome-icon :icon="['fas', 'heart']" />
            </button>
          </div>

          <div>
            <button class="icon" @click="goBack()">
              <font-awesome-icon :icon="['fas', 'upload']" />
            </button>
          </div>
        </div>

        
        
      </nav>
  </header>







</template>




<script>

export default {
  name: 'AppHeader',

  methods: {
    
  },
}




</script>



<style scoped>
.navbar{
   width: 1024px;
    background-color: white;
    height: 30px;
}
.container{
    width: 1024px;
    margin: 0 auto;
    
}

.header-preview {
  width: 400px;
  background-color: blueviolet;
  align-content: center;
}

.header-left-icon {
    display: flex;
    justify-content: space-between;
}

.header-right-icon {
    display: inline-block;
    float: right;
}


.icon {
  font-size: 30px;
  color: black;
  background-color: white;
  border: none;
  font-weight:bold;
}





</style>