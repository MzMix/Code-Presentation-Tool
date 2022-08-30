<script setup>
// import { onMounted } from "vue";

defineProps({
    hCode: String,
    hLang: String
})

// onMounted(() => {
//     document.querySelectorAll('pre code').forEach((el) => {
//         hljs.highlightElement(el);
//     });
// })
</script>

<template>
    <pre><code>{{     props.hCode     }}</code></pre>
</template>