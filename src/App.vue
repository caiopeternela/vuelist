<template>
    <div id="app">
        <Navbar :logo="logo" :alt="alt"/>
        <router-view/>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar.vue"
    export default {
        components: {
            Navbar
        },
        data() {
            return {
                logo: "/img/logo.png",
                alt: "Vue.js"
            }
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=DynaPuff&display=swap');

    * {
        font-family: 'DynaPuff', cursive;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>
