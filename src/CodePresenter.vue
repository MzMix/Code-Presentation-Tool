<script setup>
import { onMounted, ref } from 'vue';

import 'highlight.js/lib/common';

const startOfFile = 1;

const fileContent = ref([]);
const codeToDisplay = ref([]);
const lang = ref([]);
const visibleLines = ref(startOfFile);

let CodeBox;

onMounted(() => {
    CodeBox = document.getElementById("CodeBox");
    window.onresize = HandleResize;
});

//File handler
function onFileChange(e) {
    fileContent.value = [];
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;

    let LoadedFile = files[0];
    ReadFile(LoadedFile);

    visibleLines.value = startOfFile;
    DetectLang(LoadedFile);
}

function DetectLang(file) {
    let fileType = file.type.split('/')[1].split('-');
    if (fileType.length >= 1) lang.value = fileType[fileType.length - 1];
    else lang.value = fileType[0];

    console.log(lang.value)
}

function ReadFile(file) {
    let reader = new FileReader();
    reader.onload = e => {
        fileContent.value = e.target.result.split(/\r?\n/);
        GenerateCodeObjectsAray(fileContent.value);
        BreakText();
    };
    reader.readAsText(file);
}

//Text break and dispaly
function GenerateCodeObjectsAray(code) {
    let num = 1;
    code.forEach(cd => {
        codeToDisplay.value.push({
            code: cd,
            lineNum: num,
            brake: false,
        })
        num++;
    })
}

function BreakText() {
    GenerateCodeObjectsAray(fileContent.value);

    BreakOverflow();
}

function SplitLine(line) {
    let part1, part2;
    let pos = line.code.indexOf(' ', line.code.length / 2);

    part1 = {
        code: line.code.slice(0, pos),
        lineNum: line.lineNum,
        brake: line.brake,
    }

    part2 = {
        code: line.code.slice(pos + 1),
        lineNum: null,
        brake: true,
    }

    let start = codeToDisplay.value.indexOf(line);
    codeToDisplay.value.splice(start, 1, part1, part2);
}

function BreakOverflow() {
    let threshold = Math.floor(document.getElementById('CodeBox').offsetWidth / 8);

    codeToDisplay.value.forEach(line => {
        if (line.code.length > threshold) SplitLine(line);
    })

}

function HandleResize() {
    let hljsLines = document.getElementsByClassName('hljs');
    if (hljsLines.length <= 0) return;

    for (let el of hljsLines) {
        if (checkOverflow(el)) {
            BreakText();
            return;
        }
    }
}

function checkOverflow(el) {
    var curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === "visible")
        el.style.overflow = "hidden";

    var isOverflowing = el.clientWidth < el.scrollWidth
        || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
}

//Next, previous line
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

//Utility
function AddLeadingZero(num) {
    return num < 10 ? '0' + num : num;
}
</script>

<template>
    <div class="col-lg-10 col-md-12">
        <form @submit.prevent="onSubmit">
            <div class="mb-3">
                <div class="border border-dark p-1" id="CodeBox">

                    <span v-for=" line in codeToDisplay.slice(0, visibleLines)" :key="codeToDisplay.indexOf(line)"
                        class="line">
                        <span v-if="!line.brake" class="line-number user-select-none">{{ AddLeadingZero(line.lineNum)
                        }}</span>
                        <span v-else class="tab user-select-none">--</span>
                        <highlightjs :lang="lang" :code=line.code />
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
    </div>
</template>

<style scoped>
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

.line-number,
.tab {
    font-weight: lighter;
    border-right: 1px solid #000;
    text-align: left;
    width: 1.5em;
    margin-right: .5em;
}

.tab {
    margin-right: 1.2em;
    color: transparent;
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