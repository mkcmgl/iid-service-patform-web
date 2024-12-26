<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[20px] font-medium tracking-wider text-[#333333] leading-none"
        >
            概览
        </h1>
    </div>
    <div class="w-full py-[20px] overflow-auto bg-white">
        <div class="flex flex-col items-baseline pl-6 my-[20px]">
            <span class="font-bold">认证指引</span>
            <span class="text-[#9ca3af] text-[12px] mt-[10px]"
                >机构用户凭机构证照信息进行实名认证，并作为发证方入驻平台，可在平台创建分布式身份应用及可验证凭证模板，在第三方业务系统签发凭证</span
            >
        </div>
        <div class="flex items-center justify-center mt-[100px] w-full">
            <div class="flex flex-col items-center mx-[30px]">
                <img
                    src="@/assets/images/profile/profileUser.png"
                    class="w-[100px] h-[100px] rounded-[10px]"
                />
                <span class="my-[10px]">机构实名认证</span>
                <span class="text-[#9ca3af] text-[14px]"
                    >提交机构证照信息进</span
                >
                <span class="text-[#9ca3af] text-[14px]">行机构实名认证</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13.36"
                viewBox="0 0 13 13.36"
                class="mx-10"
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
            <div class="flex flex-col items-center mx-[30px]">
                <img
                    src="@/assets/images/profile/profileDid.png"
                    class="w-[100px] h-[100px] rounded-[10px]"
                />
                <span class="my-[10px]">创建DID</span>
                <span class="text-[#9ca3af] text-[14px]"
                    >以用户自持的方式创</span
                >
                <span class="text-[#9ca3af] text-[14px]">建分布式身份DID</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13.36"
                viewBox="0 0 13 13.36"
                class="mx-10"
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
            <div class="flex flex-col items-center mx-[30px]">
                <img
                    src="@/assets/images/profile/profileUserId.png"
                    class="w-[100px] h-[100px] rounded-[10px]"
                />
                <span class="my-[10px]">发证方入驻</span>
                <span class="text-[#9ca3af] text-[14px]"
                    >提交入驻申请成为发</span
                >
                <span class="text-[#9ca3af] text-[14px]">证方</span>
            </div>
        </div>
        <div
            class="flex items-center justify-center mt-[50px] mb-[40px] w-full"
        >
            <el-button
                style="border-radius: 16px"
                type="primary"
                class="w-[240px]"
                @click="toIssuing"
                >成为发证方</el-button
            >
        </div>
        <div class="flex items-center mt-[100px] mb-5 px-[20px] w-full">
            <div
                class="profileLeft flex-1 h-[150px] mr-5 bg-[rgb(247,248,250)] p-[20px] rounded-xl overflow-hidden text-ellipsis"
            >
                <div class="w-full ml-5">
                    <div class="mb-3 font-bold text-[20px]">
                        分布式数字<span class="text-[#2F88FF]">身份</span>
                    </div>
                    <div class="text-[14px] mr-24">
                        具备全局唯一性、可解析性和加密可验证性，用于标记主体的特定实例，可促进实体之间创建持久加密的专用通道
                    </div>
                </div>
            </div>
            <div
                class="profileRight flex-1 h-[150px] bg-[rgb(247,248,250)] p-[20px] rounded-xl overflow-hidden text-ellipsis"
            >
                <div class="w-full ml-5">
                    <div class="mb-3 font-bold text-[20px]">
                        可验证<span class="text-[#2F88FF]">凭证</span>
                    </div>
                    <div class="text-[14px] mr-24">
                        使用可验证凭证来表示现实世界的属性，由发证方签名加密，具备防篡改的特点，并支持以基于密码学的方式验证，确保凭证的权威性和隐私保护性
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const toIssuing = () => {
    router.push({
        path: 'profile/issuingParty'
    });
};
</script>
<style lang="scss" scoped>
.profileLeft {
    background-image: url('@/assets/images/profile/left.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.profileRight {
    background-image: url('@/assets/images/profile/right.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
