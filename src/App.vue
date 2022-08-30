<script setup>
import CodePresenter from './CodePresenter.vue';
</script>

<template>

  <header>
    <div class="fixed-top border-dark border-bottom p-2 text-white text-center user-select-none mb-5" id="AppNameRow">
      <h1>Code Presentation Tool <i class="bi bi-code-slash"></i></h1>
    </div>
  </header>

  <main>
    <div class="row mt-5">
      <div class="col-xl-2 col-lg-1"></div>
      <CodePresenter />
      <div class="col-xl-2 col-lg-1"></div>
    </div>
  </main>

  <footer>
    <div class="row border-dark border-top user-select-none pt-1">
      <div class="col-md-12 text-center d-flex justify-content-center align-items-center">
        <p class="pt-1">Made with <i class="bi bi-heart-fill text-danger"></i> by <a
            href="https://github.com/MzMix">Mikołaj Zuziak</a></p>
      </div>
    </div>
  </footer>

</template>

<style scoped>
#AppNameRow {
  background-color: #6f2dfa;
  width: 100%;
}
</style>
