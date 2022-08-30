<script setup>
import { computed, onMounted } from "vue";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';

const props = defineProps({
    hCode: String,
    hLang: String
})

const langClass = computed(() => {
    return `language-${props.hLang}`;
})

onMounted(() => {
    window.Prism = window.Prism || {};
    window.Prism.manual = true;
    Prism.highlightAll();
})
</script>

<template>
    <pre class="codeLine"><code :class="langClass">{{    hCode     }}</code></pre>
</template>