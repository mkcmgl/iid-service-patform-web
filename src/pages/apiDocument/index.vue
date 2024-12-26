<template>
    <div class="markdown-body" v-html="compiledMarkdown"></div>
</template>

<script setup>
import { ref } from 'vue';
import 'github-markdown-css';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { usePlatformStore } from '@/store/platform';
import notify from '@/plugins/notify';

const platformStore = usePlatformStore();

function copyToClipboard(button, text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            button.innerHTML = `
                <svg class="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M10 15l-3-3 1.4-1.4 1.6 1.6L16.6 7l1.4 1.4-8 8z" fill="currentColor"></path>
                </svg>
                  已复制
                `;
            setTimeout(() => {
                button.innerHTML = ` <svg  class="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>
               复制代码`;
            }, 2000);
        })
        .catch((err) => {
            console.error('Failed to copy: ', err);
        });
}

class CustomRenderer extends marked.Renderer {
    heading(text) {
        if (text.depth === 1) {
            return `<h1 class="hClass">${text.text}</h1>`;
        } else if (text.depth === 2) {
            return `<h2 class="hClass"> ${text.text}</h2>`;
        } else if (text.depth === 3) {
            return `<h3 class="hClass"> ${text.text}</h3>`;
        } else if (text.depth === 4) {
            return `<h4 class="hClass"> ${text.text}</h4>`;
        } else if (text.depth === 5) {
            return `<h5 class="hClass">${text.text}</h5>`;
        } else if (text.depth === 6) {
            return `<h6 class="hClass"> ${text.text}</h6>`;
        }
    }
    escapeHtml(html) {
        return html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    // toStringHtml(html) {
    //     html = html
    //         .replace(
    //             /&quot;([^"]*)&quot;/g,
    //             '<span class="highlighted-text">"$1"</span>'
    //         )
    //         .replace(
    //             /&#39;([^&#39;]*)&#39;/g,
    //             '<span class="highlighted-text">\'$1\'</span>'
    //         );

    //     // // 匹配对象内部的属性和值
    //     // const processedHtml = html.replace(
    //     //     /{([^}]+)}/g,
    //     //     (match, innerContent) => {
    //     //         return `{${innerContent.replace(
    //     //             /(\w+):\s*([^,}]+)/g,
    //     //             '<span class="method-name">$1</span>: <span class="value">$2</span>'
    //     //         )}}`;
    //     //     }
    //     // );
    //     return html;
    // }

    codeToSpan(code) {
        const codeLines = code.split('\n').map((line) => {
            // 检查是否以 // 开头
            if (line.trim().startsWith('//')) {
                // 将整个行内容（包括注释）包裹在一个 <span> 中
                return `<span class="comment-line">${line.trim()}</span>`;
            }
            // 处理其他行，不做任何特殊处理
            return line;
        });
        return codeLines.join('\n');
    }

    code(code) {
        const escapedCode = this.escapeHtml(code.text);
        // const testStringCode = this.toStringHtml(escapedCode);
        const testCode = this.codeToSpan(escapedCode);
        return `
        <div class="code-wrapper">
          <div>
            <button class="copyButton"  onclick="copyToClipboard(this,\`${escapedCode}\`)">
               <svg  class="mr-1" width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>
               复制代码
            </button>
          </div>

           <pre class="language-" line-numbers"><code>${testCode}</code></pre>
    </div>
  `;
    }
}

const renderer = new CustomRenderer();

const markedOptions = {
    renderer: renderer,
    breaks: true
};

const compiledMarkdown = ref('');

window.copyToClipboard = copyToClipboard;

const initMD = async () => {
    if (!platformStore.platform.filePath) {
        return;
    }

    try {
        const fileBlob = await fetch(platformStore.platform.filePath).then(
            (res) => res.blob()
        );

        const markdownText = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(fileBlob, 'utf-8');

            reader.onload = function () {
                resolve(reader.result);
            };

            reader.onerror = function () {
                reject('转换文件失败');
            };
        });
        compiledMarkdown.value = marked(markdownText, markedOptions);
        Prism.highlightAll();
    } catch (error) {
        notify({
            type: 'error',
            title: '发生错误',
            text: error.message
        });
    }
};

initMD();
</script>

<style lang="scss" scoped>
.markdown-body {
    padding: 20px;
}
.highlighted-text {
    color: #e67e22; /* 你想要的颜色 */
    font-weight: bold; /* 可选: 加粗 */
}
.method-name {
    color: #f8c555; /* 方法名的颜色 */
}

.colon {
    color: #67cdcc; /* 冒号的颜色 */
}
.value {
    color: #e67e22;
}
p,
ul,
ol {
    line-height: 1.7;
}
ul,
ol {
    padding-left: 1.2em;
}
ul {
    display: block;
    list-style-type: disc;
    unicode-bidi: isolate;

    margin-block-end: 1em;
    margin-block-start: 1em;
    margin-inline-end: 0;
    margin-inline-start: 0;
    padding-inline-start: 40px;
}
/* 代码块样式 */
pre {
    position: relative; /* 为行号设置位置 */
    overflow: auto;
    padding: 1em;
    background-color: #282c34 !important; /* 深色背景 */
    border-radius: 5px;
}
pre code {
    color: #fff; /* 代码文本颜色 */
    white-space: pre; /* 保持空格 */
}

/* 行号样式 */
.line-numbers {
    counter-reset: line; /* 重置行计数 */
}

.line-numbers .line {
    padding-left: 30px; /* 左侧留出空间 */
    counter-increment: line; /* 行计数递增 */
}

.line-numbers .line:before {
    content: counter(line); /* 显示行号 */
    position: absolute;
    left: 10px; /* 行号位置 */
    color: #888; /* 行号颜色 */
}

/* 代码高亮 */
[data-language] {
    background-color: transparent; /* 避免重写背景色 */
}
.content pre {
    position: relative;
    padding: 10px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
}
pre .btn-pre-copy {
    position: absolute;
    top: 10px;
    right: 12px;
    color: hsla(0, 0%, 54.9%, 0.8);
    font-size: 12px;
    line-height: 1;
    transition: color 0.1s;
    cursor: pointer;
    user-select: none;

    -khtml-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
:deep() {
    .code-wrapper {
        position: relative;
        background-color: #282c34;
    }

    .copyButton {
        @apply flex text-[12px] leading-3 items-center;

        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1;
        color: green;
    }
}
.comment-line {
    color: #999;
}
.comment-line {
    * {
        color: #999 !important;
    }
}
</style>
