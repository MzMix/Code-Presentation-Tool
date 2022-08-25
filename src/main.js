import { createApp } from 'vue'
import App from './App.vue'

import "bootstrap"

import './style.css'

import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'


import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";

const app = createApp(App)
app.use(hljsVuePlugin)
app.mount('#app')