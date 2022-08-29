<template>
    <div>
        <nav>
            <router-link to="/" id="logo-url"><img :src="logo" :alt="alt" id="logo"></router-link>
            <!-- <router-link to="/new">New</router-link> -->
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        props: ["logo", "alt"]
    }
</script>

<style scoped>
    nav {
        background-color: #278cf7;
        border-bottom: 6px solid #41B883;
        padding: 15px 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    nav a {
        color: white;
        font-size: 36px;
        text-decoration: none;
        margin: 12px;
        transition: .5s;
    }

    nav a:hover {
        color: black;
    }

    #logo-url {
        margin: 0 auto;
    }

    #logo {
        width: 80px;
        height: 90px;
    }
</style>