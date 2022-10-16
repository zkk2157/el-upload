<template>
    <div class="container">
      <div class="upload" @click="choose">
        <input ref="input" type="file" @change="getFiles" />
        选择文件
      </div>
      <div class="tag">
        <el-tag
          v-for="tag in files"
          :key="tag"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag.name }}
        </el-tag>
      </div>
      <div class="PRogress">
        <div class="Progress">
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="percentage"
            status="success"
          />
        </div>
      </div>
  
      <div class="Upload">
        <el-button type="success" @click="UpLoad">点击上传</el-button>
      </div>
    </div>
  </template>
  
  <script>
  import { indexOf } from "lodash";
  import { reactive, ref } from "vue";
  import http from '../service/index.js'
  export default {
    name: "UpLoadFiles",
  
    setup() {
      const files = reactive([]);
      const input = ref(null);
      let percentage = ref(0);
      function choose() {
        input.value.click();
      }
      function getFiles(event) {
        files.push(event.target.files[0]);
        // console.log(event.target.files[0]);
        // Size.value += event.target.files[0].size;
        // console.log(Size.value);
      }
      function handleClose(tag) {
        files.splice(indexOf(tag), 1);
      }
      async function UpLoad() {
        const fileData = new FormData();
  
        files.forEach((file) => {
          fileData.append(file.name, file);
        });
        let config = {
          onUploadProgress: (progressEvent) => {
            let persent =
              ((progressEvent.loaded / progressEvent.total) * 100) | 0; //上传进度百分比
            // console.log(persent);
            percentage.value = persent;
          },
        };
  
        const info = await http.post("/upload", fileData,config);
        setTimeout(()=>{
          percentage.value = 0;
        },1000);
        if(info.data.success){
          ElMessage({
            message: "上传成功！",
            type: "success",
          });
        }
      }
      return {
        choose,
        getFiles,
        input,
        files,
        handleClose,
        UpLoad,
        percentage
      };
    },
  };
  </script>
  
  <style scoped lang="scss">
  .upload {
    height: 40px;
    width: 135px;
    font-size: 21px;
    color: #fff;
    background-color: #409eff;
    text-align: center;
    line-height: 40px;
    border-radius: 7px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    input {
      width: 0px;
      height: 0px;
      z-index: -1;
    }
  }
  .Upload {
    margin: auto;
    position: relative;
    margin-top: 30px;
  }
  .tag {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .PRogress {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .Progress {
      width: 400px;
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  </style>