<script setup>
import CodePresenter from './CodePresenter.vue';
</script>

<template>
  <div class="fixed-top border-dark border-bottom p-2 text-white text-center user-select-none" id="AppNameRow">
    <h1>Code Presentation Tool <i class="bi bi-code-slash"></i></h1>
  </div>

  <div class="row mt-5">
    <div class="col-lg-1"></div>
    <CodePresenter />
    <div class="col-lg-1"></div>
  </div>

  <div class="row fixed-bottom border-dark border-top user-select-none">
    <div class="col-md-12 text-center d-flex justify-content-center align-items-center">
      <p class="pt-1">Made with <i class="bi bi-heart-fill text-danger"></i> by <a
          href="https://github.com/MzMix">Mikołaj Zuziak</a></p>
    </div>
  </div>
</template>

<style scoped>
#AppNameRow {
  background-color: #6f2dfa;
}
</style>
