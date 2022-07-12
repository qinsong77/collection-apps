<template>
  <div class="about">
    <h1>This is combine by two app</h1>
    <div id="app-container-1" style="border: 2px solid red"></div>
    <div id="app-container-2" style="border: 2px solid blue"></div>
  </div>
</template>
<script>
import store from '../store'
import { loadMicroApp } from 'qiankun'
export default {
  mounted () {
    setTimeout(() => {
      console.log('mounted')
      loadMicroApp({
        name: 'app1',
        entry: '//localhost:8012/',
        container: '#app-container-1',
        props: {
          getGlobalState: store // 下发getGlobalState方法
        }
      })
      loadMicroApp({
        name: 'app2',
        entry: '//localhost:8014/subapp/sub-cra-latest/',
        container: '#app-container-2'
      })
    }, 500)
  }
}
</script>
