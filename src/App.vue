<script setup>
import { onMounted, ref } from 'vue';

import 'highlight.js/lib/common';

const startOfFile = 1;

const fileContent = ref([]);
const visibleLines = ref(startOfFile);

let CodeBox;

onMounted(() => {
  CodeBox = document.getElementById("CodeBox")
});

function onFileChange(e) {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  let LoadedFile = files[0];
  ReadFile(LoadedFile);
  visibleLines.value = startOfFile;
}
function ReadFile(file) {
  let reader = new FileReader();
  reader.onload = e => {
    fileContent.value = e.target.result.split(/\r?\n/);
  };
  reader.readAsText(file);
  console.log(file.type);
}

function showMore() {
  if (visibleLines.value < fileContent.value.length) {
    visibleLines.value++;
  }

  CodeBox.scrollTop = CodeBox.scrollHeight;
}

function showLess() {
  if (visibleLines.value > 0) {
    visibleLines.value--;
  }
}

function AddLeadingZero(num) {
  return num < 10 ? '0' + num : num;
}

</script>

<template>
  <div class="row fixed-top border-dark border-bottom p-2 text-white text-center user-select-none" id="AppNameRow">
    <div class="col-md-12">
      <h1>Code Presentation Tool <i class="bi bi-code-slash"></i></h1>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-2 col-md-3"></div>

    <div class="col-lg-8 col-md-6 col-sm-12">
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <div class="border border-dark p-1" id="CodeBox">

            <span v-for="line in fileContent.slice(0, visibleLines)" :key="fileContent.indexOf(line)" class="line">
              <span class="line-number user-select-none">{{ AddLeadingZero(fileContent.indexOf(line) + 1) }}</span>
              <highlightjs language="js" :code=line />
            </span>

          </div>
        </div>

        <div class=" mb-3 user-select-none">
          <label for="formFile" class="form-label">Wczytaj plik do wyświetlenia</label>
          <input class="form-control" type="file" id="formFile" @change="onFileChange">
        </div>

        <div class="mb-3 d-flex" id="ActionButtons">
          <button class="btn btn-secondary" @click="showLess"><i class="bi bi-arrow-bar-up"></i> Ukryj ostatnią
            linijkę</button>
          <button class="btn btn-primary" @click="showMore">Pokaż następną linijkę <i
              class="bi bi-arrow-bar-down"></i></button>
        </div>
      </form>
      <div class="col-lg-2 col-md-3"></div>
    </div>
  </div>

  <div class="row fixed-bottom border-dark border-top user-select-none">
    <div class="col-md-12 text-center d-flex justify-content-center align-items-center">
      <p class="pt-1">Made with <i class="bi bi-heart-fill text-danger"></i> by Mikołaj Zuziak</p>
    </div>
  </div>
</template>

<style scoped>
#AppNameRow {
  background-color: #6f2dfa;
}

#CodeBox {
  min-height: 25vh !important;
  height: 55vh;
  max-height: 55vh;
  overflow-y: scroll;

  background-color: #f6f6f6;
  transition: all 0.2s ease-in-out;

}

#ActionButtons {
  justify-content: space-between;
}

.line {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.line-number {
  font-weight: lighter;
  border-right: 1px solid #000;
  text-align: left;
  width: 1.5em;
  margin-right: .5em;
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: #672dfa #5c636a;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  background: #dde0e3;
}

*::-webkit-scrollbar-thumb {
  background-color: #672dfa;
  border-radius: 10px;
  border: 2px solid #000000;
}
</style>
