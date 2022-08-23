<template>
  <AppHeader/>
  <LineChart/>
</template>

<script>
//import SignUp from './SignUp.vue'
import AppHeader from './AppHeader.vue'
import LineChart from './LineChart.vue';
export default {
  name: 'HelloWorld',
  components: {
    AppHeader,
    LineChart,
   // SignUp
    
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
