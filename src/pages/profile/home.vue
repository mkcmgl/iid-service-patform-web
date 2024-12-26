<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[20px] font-medium tracking-wider text-[#333333] leading-none"
        >
            概览
        </h1>
    </div>
    <div class="w-full flex flex-col">
        <div class="h-52 w-full min-w-[800px] flex">
            <div
                class="flex mr-5 min-w-[500px] topLeft p-4 rounded-xl max-w-[calc(100%-320px)] min-w-[calc(100%-420px)]"
            >
                <div class="w-full ml-6 mt-4">
                    <div class="mb-3 font-bold text-[24px]">欢迎回来!</div>
                    <div class="text-[16px] text-[#333] w-[72%]">
                        基于自研区块链底层技术，提供<span
                            class="text-[#2F88FF] font-bold"
                            >分布式身份创建与验证、可验证凭证签发与验证等</span
                        >功能，实现分布式的数字证书签发与用户身份安全可控，解决传统数字身份存在的数据隐私与安全等问题，推动数据共享与业务办同
                    </div>
                </div>
            </div>
            <div
                class="bg-white w-80 p-4 rounded-xl flex-1 max-w-[400px] min-w-[300px]"
            >
                <div class="flex justify-between mb-8">
                    <div class="font-bold text-[#333333] flex items-center">
                        <i class="leftLine"></i><span>账户中心</span>
                    </div>
                    <el-button @click="toAc">前往</el-button>
                </div>
                <div class="flex">
                    <img
                        src="@/assets/images/user.png"
                        class="w-[80px] h-[80px] mr-5"
                    />
                    <div class="truncate">
                        <div class="text-[14px]">
                            <span class="text-[#999]">账号:</span
                            >{{ authStore.user.userName }}
                        </div>
                        <div class="text-[14px] truncate my-3">
                            <span class="text-[#999]">did:</span
                            >{{ authStore.user.did }}
                        </div>
                        <div class="text-[14px]">
                            {{ authStore.user.orgName }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-50 bg-white my-4 w-ful rounded-xl p-4 pb-8">
            <div
                class="mb-4 text-[#333333] text-[16px] font-bold flex items-center"
            >
                <i class="leftLine"></i><span>数据概览</span>
            </div>
            <div class="flex justify-between">
                <div class="flex createApp flex-1 mr-5 py-6">
                    <img
                        src="@/assets/images/home/appLeft.png"
                        class="w-[80px] h-[80px] mr-5 ml-10"
                    />

                    <div
                        @click="
                            () => {
                                router.push({
                                    name: 'AppManagement'
                                });
                            }
                        "
                        style="cursor: pointer"
                    >
                        <div class="text-[16px]">创建应用数</div>
                        <div class="ml-3 text-[#333] font-bold text-[32px]">
                            {{ authStore.userDataNum.appNum }}
                            <span class="text-[16px]"> 个</span>
                        </div>
                    </div>
                </div>
                <div class="flex templateNum flex-1 mr-5 py-6">
                    <img
                        src="@/assets/images/home/templateLeft.png"
                        class="w-[80px] h-[80px] mr-5 ml-10"
                    />
                    <div>
                        <div class="text-[16px]">凭证模板数</div>
                        <div class="ml-3 text-[#333] font-bold text-[32px]">
                            {{ authStore.userDataNum.templateNum }}
                            <span class="text-[16px]"> 个</span>
                        </div>
                    </div>
                </div>
                <div class="flex issueNum flex-1 py-6">
                    <img
                        src="@/assets/images/home/issueLeft.png"
                        class="w-[80px] h-[80px] mr-5 ml-10"
                    />
                    <div>
                        <div class="text-[16px]">签发凭证数</div>
                        <div class="ml-3 text-[#333] font-bold text-[32px]">
                            {{ authStore.userDataNum.claimNum
                            }}<span class="text-[16px]"> 个</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-[450px] bg-white w-ful rounded-xl p-4">
            <div
                class="mb-4 text-[#333333] text-[16px] font-bold flex items-center"
            >
                <i class="leftLine"></i><span>体验指引</span>
            </div>
            <div class="flex justify-around items-center">
                <div class="flex flex-col items-center">
                    <img
                        src="@/assets/images/home/01.png"
                        class="w-[100px] h-[100px]"
                    />
                    <div class="flex items-center my-4">
                        <!-- <div
                            class="w-[20px] bg-[rgb(22,93,255)] text-white h-[20px] text-center leading-[18px] rounded-[50%] text-[14px]"
                        >
                            1
                        </div> -->
                        <div
                            class="ml-2 font-bold text-[16px] leading-[20px] align-baseline"
                        >
                            01&nbsp创建应用数
                        </div>
                    </div>
                    <div class="w-[180px] text-[14px] text-[#999] text-center">
                        作为应用部署方为其它用户创建DID、管理凭证模板等
                    </div>
                    <el-button
                        type="primary"
                        class="mt-2"
                        link
                        @click="
                            () => {
                                router.push({
                                    name: 'AppManagement'
                                });
                            }
                        "
                        >创建应用</el-button
                    >
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13.36"
                    viewBox="0 0 13 13.36"
                >
                    <g transform="translate(-633.034 -2234.037)">
                        <g transform="translate(633.034 2234.037)">
                            <path
                                class="a"
                                style="fill: #636161"
                                d="M952.513,229.584a.886.886,0,0,1-.693-.362,1.475,1.475,0,0,1,0-1.747l3.628-4.572-3.628-4.572a1.471,1.471,0,0,1,0-1.747.844.844,0,0,1,1.386,0l4.32,5.444a1.474,1.474,0,0,1,0,1.746l-4.321,5.445A.884.884,0,0,1,952.513,229.584Z"
                                transform="translate(-951.532 -216.224)"
                            />
                        </g>
                        <g transform="translate(639.754 2234.037)">
                            <path
                                class="b"
                                style="fill: #d4d4d4"
                                d="M952.513,229.584a.886.886,0,0,1-.693-.362,1.475,1.475,0,0,1,0-1.747l3.628-4.572-3.628-4.572a1.471,1.471,0,0,1,0-1.747.844.844,0,0,1,1.386,0l4.32,5.444a1.474,1.474,0,0,1,0,1.746l-4.321,5.445A.884.884,0,0,1,952.513,229.584Z"
                                transform="translate(-951.532 -216.224)"
                            />
                        </g>
                    </g>
                </svg>

                <div class="flex flex-col items-center">
                    <img
                        src="@/assets/images/home/02.png"
                        class="w-[100px] h-[100px]"
                    />
                    <div class="flex items-center my-4">
                        <!-- <div
                            class="w-[20px] bg-[rgb(22,93,255)] text-white h-[20px] text-center leading-[18px] rounded-[50%] text-[14px]"
                        >
                            2
                        </div> -->
                        <div
                            class="ml-2 font-bold text-[16px] leading-[20px] align-baseline"
                        >
                            02&nbsp创建凭证模板
                        </div>
                    </div>
                    <div class="w-[180px] text-[#999] text-[14px] text-center">
                        根据业务场景定义可验证凭证模板，包括模板名称、数据结构等
                    </div>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13.36"
                    viewBox="0 0 13 13.36"
                >
                    <g transform="translate(-633.034 -2234.037)">
                        <g transform="translate(633.034 2234.037)">
                            <path
                                class="a"
                                style="fill: #636161"
                                d="M952.513,229.584a.886.886,0,0,1-.693-.362,1.475,1.475,0,0,1,0-1.747l3.628-4.572-3.628-4.572a1.471,1.471,0,0,1,0-1.747.844.844,0,0,1,1.386,0l4.32,5.444a1.474,1.474,0,0,1,0,1.746l-4.321,5.445A.884.884,0,0,1,952.513,229.584Z"
                                transform="translate(-951.532 -216.224)"
                            />
                        </g>
                        <g transform="translate(639.754 2234.037)">
                            <path
                                class="b"
                                style="fill: #d4d4d4"
                                d="M952.513,229.584a.886.886,0,0,1-.693-.362,1.475,1.475,0,0,1,0-1.747l3.628-4.572-3.628-4.572a1.471,1.471,0,0,1,0-1.747.844.844,0,0,1,1.386,0l4.32,5.444a1.474,1.474,0,0,1,0,1.746l-4.321,5.445A.884.884,0,0,1,952.513,229.584Z"
                                transform="translate(-951.532 -216.224)"
                            />
                        </g>
                    </g>
                </svg>
                <div class="flex flex-col items-center">
                    <img
                        src="@/assets/images/home/03.png"
                        class="w-[100px] h-[100px]"
                    />
                    <div class="flex items-center my-4">
                        <!-- <div
                            class="w-[20px] bg-[rgb(22,93,255)] text-white h-[20px] text-center leading-[18px] rounded-[50%] text-[14px]"
                        >
                            3
                        </div> -->
                        <div
                            class="ml-2 font-bold text-[16px] leading-[20px] align-baseline"
                        >
                            03 申请凭证
                        </div>
                    </div>
                    <div class="w-[180px] text-[#999] text-[14px] text-center">
                        向发证方申请签发可验证凭证
                    </div>
                    <el-button
                        type="primary"
                        class="mt-2"
                        link
                        @click="
                            () => {
                                router.push({
                                    name: 'Certificate'
                                });
                            }
                        "
                        >申请凭证</el-button
                    >
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13.36"
                    viewBox="0 0 13 13.36"
                >
                    <g transform="translate(-633.034 -2234.037)">
                        <g transform="translate(633.034 2234.037)">
                            <path
                                class="a"
                                style="fill: #636161"
                                d="M952.513,229.584a.886.886,0,0,1-.693-.362,1.475,1.475,0,0,1,0-1.747l3.628-4.572-3.628-4.572a1.471,1.471,0,0,1,0-1.747.844.844,0,0,1,1.386,0l4.32,5.444a1.474,1.474,0,0,1,0,1.746l-4.321,5.445A.884.884,0,0,1,952.513,229.584Z"
                                transform="translate(-951.532 -216.224)"
                            />
                        </g>
                        <g transform="translate(639.754 2234.037)">
                            <path
                                class="b"
                                style="fill: #d4d4d4"
                                d="M952.513,229.584a.886.886,0,0,1-.693-.362,1.475,1.475,0,0,1,0-1.747l3.628-4.572-3.628-4.572a1.471,1.471,0,0,1,0-1.747.844.844,0,0,1,1.386,0l4.32,5.444a1.474,1.474,0,0,1,0,1.746l-4.321,5.445A.884.884,0,0,1,952.513,229.584Z"
                                transform="translate(-951.532 -216.224)"
                            />
                        </g>
                    </g>
                </svg>
                <div class="flex flex-col items-center">
                    <img
                        src="@/assets/images/home/04.png"
                        class="w-[100px] h-[100px]"
                    />
                    <div class="flex items-center my-4">
                        <!-- <div
                            class="w-[20px] bg-[rgb(22,93,255)] text-white h-[20px] text-center leading-[18px] rounded-[50%] text-[14px]"
                        >
                            4
                        </div> -->
                        <div
                            class="ml-2 font-bold text-[16px] leading-[20px] align-baseline"
                        >
                            04 签发凭证
                        </div>
                    </div>
                    <div class="w-[180px] text-[14px] text-[#999] text-center">
                        对申请的可验证凭证进行审核和签发
                    </div>
                    <el-button
                        type="primary"
                        class="mt-2"
                        link
                        @click="
                            () => {
                                router.push({
                                    name: 'CertificateIssuance'
                                });
                            }
                        "
                        >签发凭证</el-button
                    >
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13.36"
                    viewBox="0 0 13 13.36"
                >
                    <g transform="translate(-633.034 -2234.037)">
                        <g transform="translate(633.034 2234.037)">
                            <path
                                class="a"
                                style="fill: #636161"
                                d="M952.513,229.584a.886.886,0,0,1-.693-.362,1.475,1.475,0,0,1,0-1.747l3.628-4.572-3.628-4.572a1.471,1.471,0,0,1,0-1.747.844.844,0,0,1,1.386,0l4.32,5.444a1.474,1.474,0,0,1,0,1.746l-4.321,5.445A.884.884,0,0,1,952.513,229.584Z"
                                transform="translate(-951.532 -216.224)"
                            />
                        </g>
                        <g transform="translate(639.754 2234.037)">
                            <path
                                class="b"
                                style="fill: #d4d4d4"
                                d="M952.513,229.584a.886.886,0,0,1-.693-.362,1.475,1.475,0,0,1,0-1.747l3.628-4.572-3.628-4.572a1.471,1.471,0,0,1,0-1.747.844.844,0,0,1,1.386,0l4.32,5.444a1.474,1.474,0,0,1,0,1.746l-4.321,5.445A.884.884,0,0,1,952.513,229.584Z"
                                transform="translate(-951.532 -216.224)"
                            />
                        </g>
                    </g>
                </svg>
                <div class="flex flex-col items-center">
                    <img
                        src="@/assets/images/home/05.png"
                        class="w-[100px] h-[100px]"
                    />
                    <div class="flex items-center my-4">
                        <!-- <div
                            class="w-[20px] bg-[rgb(22,93,255)] text-white h-[20px] text-center leading-[18px] rounded-[50%] text-[14px]"
                        >
                            5
                        </div> -->
                        <div
                            class="ml-2 font-bold text-[16px] leading-[20px] align-baseline"
                        >
                            05 验证凭证
                        </div>
                    </div>
                    <div class="w-[180px] text-[14px] text-[#999] text-center">
                        对可验证凭证的有效性进行验证
                    </div>
                    <el-button
                        type="primary"
                        class="mt-2"
                        link
                        @click="
                            () => {
                                router.push({
                                    name: 'VerifyGroupList'
                                });
                            }
                        "
                        >验证凭证</el-button
                    >
                </div>
            </div>

            <div
                class="flex my-10 min-w-[500px] bg-[rgb(247,248,250)] p-4 rounded-xl"
            >
                <div class="w-full flex">
                    <div class="mr-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="47"
                            viewBox="0 0 24 47"
                        >
                            <g transform="translate(-346 -941.576)">
                                <rect
                                    class="a"
                                    style="fill: #86bbfd"
                                    width="24"
                                    height="47"
                                    rx="4"
                                    transform="translate(346 941.576)"
                                />
                                <text
                                    class="b"
                                    style="fill: #fff; font-size: 14px"
                                    transform="translate(351 960.576)"
                                >
                                    <tspan x="0" style="" y="0">说</tspan>
                                    <tspan x="0" style="" y="18">明</tspan>
                                </text>
                            </g>
                        </svg>
                    </div>
                    <div>
                        <div class="text-[14px] text-[#666]">
                            1.体验环境下，仅可以申请自己创建的凭证，仅可以对自己签发可验证凭证
                        </div>
                        <div class="text-[14px] text-[#666]">
                            2.申请前请确保浏览器中已安装钱包插件，并在插件中登录当前用户DID
                        </div>
                        <el-button
                            type="primary"
                            link
                            class="ml-3"
                            @click="toDownloadDidLocation"
                            >下载浏览器钱包插件</el-button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
const router = useRouter();
const authStore = useAuthStore();
const toAc = () => {
    router.push({
        name: 'AccountCenter'
    });
};

const toDownloadDidLocation = () => {
    window.open('/resources/iid-browser-wallet.zip');
};
</script>
<style lang="scss" scoped>
.topLeft {
  background-image: url("@/assets/images/banner01.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
<style lang="scss" scoped>
.leftLine {
    border: 2px solid #2f88ff;
    height: 16px;
    display: block;
    width: 1px;
    margin-right: 5px;
    line-height: 15px;
    border-radius: 20%;
}
</style>
<style lang="scss" scoped>
.createApp {
    background-image: url('@/assets/images/home/appCreateBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.issueNum {
    background-image: url('@/assets/images/home/issueNumBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.templateNum {
    background-image: url('@/assets/images/home/templateNumBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
