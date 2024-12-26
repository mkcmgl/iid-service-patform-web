<template>
    <div class="w-[100%] my-[20px] flex items-center justify-between">
        <h1
            class="text-[20px] font-medium tracking-wider text-[#333333] leading-none"
        >
            概览
        </h1>
    </div>
    <div class="w-full p-[20px] overflow-auto bg-white">
        <div>成为发证方</div>

        <div class="flex items-center justify-center my-[30px] w-full">
            <div class="flex items-center mx-[30px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 48 48"
                >
                    <g transform="translate(-765 -120)">
                        <g
                            class="a"
                            :class="step >= 1 ? 'highBgColor' : 'lowBgColor'"
                            transform="translate(769 124)"
                        >
                            <circle class="d" cx="20" cy="20" r="20" />
                            <circle class="e" cx="20" cy="20" r="19.5" />
                        </g>
                        <text
                            class="b"
                            style="fill: #fff; font-size: 22px"
                            transform="translate(784 152)"
                        >
                            <tspan x="-1" y="0">1</tspan>
                        </text>
                        <g
                            class="c"
                            :class="step >= 1 ? 'highBgColorC' : 'lowBgColorC'"
                            transform="translate(765 120)"
                        >
                            <circle
                                class="d"
                                style="stroke: none"
                                cx="24"
                                cy="24"
                                r="24"
                            />
                            <circle
                                class="e"
                                style="fill: none"
                                cx="24"
                                cy="24"
                                r="23.5"
                            />
                        </g>
                    </g>
                </svg>
                <span class="ml-[10px]">机构认证申请</span>
            </div>
            <div class="flex items-center mx-[30px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 48 48"
                >
                    <g transform="translate(-765 -120)">
                        <g
                            class="a"
                            :class="step >= 2 ? 'highBgColor' : 'lowBgColor'"
                            transform="translate(769 124)"
                        >
                            <circle class="d" cx="20" cy="20" r="20" />
                            <circle class="e" cx="20" cy="20" r="19.5" />
                        </g>
                        <text
                            class="b"
                            style="fill: #fff; font-size: 22px"
                            transform="translate(784 152)"
                        >
                            <tspan x="-1" y="0">2</tspan>
                        </text>
                        <g
                            :class="step >= 2 ? 'highBgColorC' : 'lowBgColorC'"
                            transform="translate(765 120)"
                        >
                            <circle
                                class="d"
                                style="stroke: none"
                                cx="24"
                                cy="24"
                                r="24"
                            />
                            <circle
                                class="e"
                                style="fill: none"
                                cx="24"
                                cy="24"
                                r="23.5"
                            />
                        </g>
                    </g>
                </svg>
                <span class="ml-[10px]">认证审核</span>
            </div>
            <div class="flex items-center mx-[30px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 48 48"
                >
                    <g transform="translate(-765 -120)">
                        <g
                            class="a"
                            :class="step >= 3 ? 'highBgColor' : 'lowBgColor'"
                            transform="translate(769 124)"
                        >
                            <circle class="d" cx="20" cy="20" r="20" />
                            <circle class="e" cx="20" cy="20" r="19.5" />
                        </g>
                        <text
                            class="b"
                            style="fill: #fff; font-size: 22px"
                            transform="translate(784 152)"
                        >
                            <tspan x="-1" y="0">3</tspan>
                        </text>
                        <g
                            :class="step >= 3 ? 'highBgColorC' : 'lowBgColorC'"
                            transform="translate(765 120)"
                        >
                            <circle
                                class="d"
                                style="stroke: none"
                                cx="24"
                                cy="24"
                                r="24"
                            />
                            <circle
                                class="e"
                                style="fill: none"
                                cx="24"
                                cy="24"
                                r="23.5"
                            />
                        </g>
                    </g>
                </svg>
                <span class="ml-[10px]">创建DID</span>
            </div>
            <div class="flex items-center mx-[30px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 48 48"
                >
                    <g transform="translate(-765 -120)">
                        <g
                            class="a"
                            :class="step >= 4 ? 'highBgColor' : 'lowBgColor'"
                            transform="translate(769 124)"
                        >
                            <circle class="d" cx="20" cy="20" r="20" />
                            <circle class="e" cx="20" cy="20" r="19.5" />
                        </g>
                        <text
                            class="b"
                            style="fill: #fff; font-size: 22px"
                            transform="translate(784 152)"
                        >
                            <tspan x="-1" y="0">4</tspan>
                        </text>
                        <g
                            :class="step == 4 ? 'highBgColorC' : 'lowBgColorC'"
                            transform="translate(765 120)"
                        >
                            <circle
                                class="d"
                                style="stroke: none"
                                cx="24"
                                cy="24"
                                r="24"
                            />
                            <circle
                                class="e"
                                style="fill: none"
                                cx="24"
                                cy="24"
                                r="23.5"
                            />
                        </g>
                    </g>
                </svg>
                <span class="ml-[10px]">发证方入驻申请</span>
            </div>
            <div class="flex items-center mx-[30px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 48 48"
                >
                    <g transform="translate(-765 -120)">
                        <g
                            class="a"
                            :class="step >= 5 ? 'highBgColor' : 'lowBgColor'"
                            transform="translate(769 124)"
                        >
                            <circle class="d" cx="20" cy="20" r="20" />
                            <circle class="e" cx="20" cy="20" r="19.5" />
                        </g>
                        <text
                            class="b"
                            style="fill: #fff; font-size: 22px"
                            transform="translate(784 152)"
                        >
                            <tspan x="-1" y="0">5</tspan>
                        </text>
                        <g
                            :class="step == 5 ? 'highBgColorC' : 'lowBgColorC'"
                            transform="translate(765 120)"
                        >
                            <circle
                                class="d"
                                style="stroke: none"
                                cx="24"
                                cy="24"
                                r="24"
                            />
                            <circle
                                class="e"
                                style="fill: none"
                                cx="24"
                                cy="24"
                                r="23.5"
                            />
                        </g>
                    </g>
                </svg>
                <span class="ml-[10px]">入驻审核</span>
            </div>
        </div>
        <div class="mt-[50px] mb-[40px] w-full">
            <div
                v-if="step == 1"
                class="flex flex-col items-center justify-center"
            >
                <el-form
                    ref="applyFormRef"
                    :model="state.form"
                    :rules="rules"
                    size="large"
                    label-position="left"
                    label-width="120px"
                    class="w-[500px]"
                    :hide-required-asterisk="true"
                >
                    <el-row :gutter="35">
                        <el-col
                            :xs="24"
                            :sm="24"
                            :md="24"
                            :lg="24"
                            :xl="24"
                            class="mb22"
                        >
                            <el-form-item
                                label="机构名称"
                                prop="orgName"
                                class="leftFormTip"
                            >
                                <el-input
                                    v-model="state.form.orgName"
                                    placeholder="请输入机构名称"
                                    clearable
                                ></el-input>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item
                                label="统一信用代码"
                                prop="orgCode"
                                class="leftFormTip"
                            >
                                <el-input
                                    v-model="state.form.orgCode"
                                    placeholder="请输入统一信用代码"
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="机构证照"
                                prop="url"
                                class="leftFormTip"
                            >
                                <el-upload
                                    class="uploadImg"
                                    multiple
                                    v-model:file-list="fileList"
                                    :action="_UPLOAD_URL_"
                                    :headers="headers"
                                    :on-remove="handleRemove"
                                    :on-preview="handlePictureCardPreview"
                                    :limit="limitNum"
                                    :class="{
                                        uploadImgDisabled: uploadDisabled1
                                    }"
                                    :before-upload="beforeAvatarUpload"
                                    :on-success="handleAvatarSuccess"
                                    :on-exceed="handleExceed"
                                    :on-error="handleUploadError"
                                    list-type="picture-card"
                                >
                                    <div class="flex justify-around">
                                        <el-icon><Plus /></el-icon>
                                    </div>
                                </el-upload>
                                <div
                                    class="text-[12px] text-[#9ca3af] leading-5 mt-1"
                                >
                                    请上传《组织机构代码证》、《事业单位法人证书》或《营业执照》，格式限JPG、JPEG和PNG，大小不超过5M
                                </div>
                            </el-form-item>

                            <el-form-item
                                label="地址"
                                prop="orgAddress"
                                class="leftFormTip"
                            >
                                <el-input
                                    v-model="state.form.orgAddress"
                                    placeholder="请输入地址"
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="联系人姓名"
                                prop="contactName"
                                class="leftFormTip"
                            >
                                <el-input
                                    v-model="state.form.contactName"
                                    placeholder="请输入联系人姓名"
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="联系人手机号"
                                prop="contactPhone"
                                class="leftFormTip"
                            >
                                <el-input
                                    v-model="state.form.contactPhone"
                                    placeholder="请输入联系人手机号"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div>
                    <el-button
                        type="primary"
                        class="w-[100px]"
                        @click="toHome"
                        plain
                        >取消认证</el-button
                    >
                    <el-button
                        type="primary"
                        class="w-[100px]"
                        :loading="formLoading"
                        @click="onSubmit"
                        >提交申请</el-button
                    >
                </div>
            </div>
            <div
                v-if="step == 2"
                class="flex flex-col items-center justify-center"
            >
                <div
                    class="flex flex-col items-center justify-center my-5"
                    v-if="
                        userDetail.authState == '1' ||
                        userDetail.authState == '2'
                    "
                >
                    <img
                        class="w-[80px] h-[90px]"
                        src="@/assets/images/profile/success.png"
                    />
                    <span class="my-2">{{
                        userDetail.authState == '1'
                            ? '认证申请提交成功，等待审核中'
                            : '认证申请审核成功'
                    }}</span>
                    <span class="text-[#9ca3af] text-[14px]">{{
                        userDetail.authState == '1'
                            ? '审核结果将以短信方式进行通知'
                            : '接下来您可以创建DID，提交发证方入驻申请'
                    }}</span>
                </div>
                <div
                    class="flex flex-col items-center justify-center my-5"
                    v-if="userDetail.authState == '3'"
                >
                    <img
                        class="w-[80px] h-[80px]"
                        src="@/assets/images/profile/errorIcon.png"
                    />
                    <span class="my-2"
                        >认证申请审核失败，请查看驳回原因并<button
                            class="text-[#165dff]"
                            @click="resubmit1"
                        >
                            重新提交
                        </button></span
                    >
                    <span class="text-[#9ca3af] text-[14px]"
                        >驳回原因：{{ userDetail.remark }}</span
                    >
                </div>

                <el-form
                    ref="roleDialogFormRef"
                    :model="state.form"
                    size="large"
                    label-position="left"
                    label-width="120px"
                    class="w-[800px] bg-[#F6FBFF] p-5"
                >
                    <el-row :gutter="35">
                        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                            <el-form-item
                                label="机构名称"
                                prop="name"
                                class="leftFormTip"
                                style="margin-bottom: 0px"
                            >
                                <span>{{ userDetail.orgName }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item
                                label="机构证照"
                                class="leftFormTip"
                                style="margin-bottom: 0px"
                            >
                                <el-button
                                    link
                                    type="primary"
                                    @click="showImg = true"
                                >
                                    查看
                                </el-button>
                            </el-form-item>
                            <el-form-item
                                label="联系人姓名"
                                class="leftFormTip"
                                style="margin-bottom: 0px"
                            >
                                <span>{{ userDetail.contactName }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col
                            :xs="12"
                            :sm="12"
                            :md="12"
                            :lg="12"
                            :xl="12"
                            class="mb22"
                        >
                            <el-form-item
                                label="统一信用代码"
                                class="leftFormTip"
                                style="margin-bottom: 0px"
                            >
                                <span>{{ userDetail.orgCode }}</span>
                            </el-form-item>

                            <el-form-item
                                label="地址"
                                class="leftFormTip"
                                style="margin-bottom: 0px"
                            >
                                <span>{{ userDetail.orgAddress }}</span>
                            </el-form-item>
                            <el-form-item
                                label="联系人手机号"
                                class="leftFormTip"
                                style="margin-bottom: 0px"
                            >
                                <span>{{ userDetail.contactPhone }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="my-20">
                    <el-button
                        type="primary"
                        v-if="userDetail.authState == '2'"
                        @click="toStep3"
                        >下一步</el-button
                    >
                </div>
            </div>
            <div
                v-if="step == 3"
                class="flex flex-col items-center justify-center"
            >
                <div class="flex items-center justify-center my-5">
                    <span class="mr-5">分布式身份DID</span>
                    <span
                        v-if="userDetail.hasDid == '1'"
                        class="text-[12px] text-[#9ca3af]"
                        >{{ userDetail.did }}</span
                    >
                    <el-button
                        v-else
                        type="primary"
                        link
                        class="text-[#165dff] text-[14px]"
                        @click="handleCreateDid"
                        :loading="didLoading"
                        >立即创建</el-button
                    >
                </div>
                <div
                    class="flex flex-1 h-[150px] w-[90%] items-center mt-20 bg-[rgb(247,248,250)] p-[20px] rounded-xl overflow-hidden text-ellipsis"
                >
                    <div class="w-full">
                        <div class="mb-3 font-bold">DID创建说明</div>
                        <div class="text-[14px]">
                            提供<el-button
                                type="primary"
                                link
                                style="vertical-align: baseline"
                                class="text-[#165dff] text-[14px]"
                                @click="handleCreateDidLocation"
                                :loading="loading"
                                >DID浏览器插件</el-button
                            >，您可先在本地构建DID，并通过导入DID文档的方式在平台导入DID，此时私钥由您自持，安全性较高
                        </div>
                    </div>
                </div>
                <div class="mt-10">
                    <el-button type="primary" plain @click="toStep2"
                        >上一步</el-button
                    >
                    <el-button
                        type="primary"
                        @click="toStep4"
                        :disabled="userDetail.hasDid == '0'"
                        >下一步</el-button
                    >
                </div>
            </div>
            <div
                v-if="step == 4"
                class="flex flex-col items-center justify-center"
            >
                <el-form
                    ref="settleFormRef"
                    :model="state.settleForm"
                    :rules="settleRules"
                    size="large"
                    label-position="left"
                    label-width="120px"
                    class="w-[500px]"
                    :hide-required-asterisk="true"
                >
                    <el-row :gutter="35">
                        <el-col
                            :xs="24"
                            :sm="24"
                            :md="24"
                            :lg="24"
                            :xl="24"
                            class="mb22"
                        >
                            <el-form-item label="申请账户" class="leftFormTip">
                                <span class="truncate">{{
                                    userDetail.userName +
                                    '(' +
                                    userDetail.did +
                                    ')'
                                }}</span>
                            </el-form-item>
                            <el-form-item label="申请机构" class="leftFormTip">
                                <span>{{ userDetail.orgName }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>

                            <el-form-item
                                label="申请事项"
                                prop="settleDesc"
                                class="leftFormTip"
                            >
                                <el-input
                                    type="textarea"
                                    v-model="state.settleForm.settleDesc"
                                    placeholder="请填写申请事项"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div>
                    <el-button
                        type="primary"
                        class="w-[100px]"
                        @click="fourToStep3"
                        plain
                        >上一步</el-button
                    >
                    <el-button
                        type="primary"
                        :loading="state.settleForm.loading"
                        class="w-[100px]"
                        @click="toStep5"
                        >提交申请</el-button
                    >
                </div>
            </div>
            <div
                v-if="step == 5"
                class="flex flex-col items-center justify-center"
            >
                <div
                    class="flex flex-col items-center justify-center my-5"
                    v-if="
                        userDetail.settleState == '1' ||
                        userDetail.settleState == '2'
                    "
                >
                    <img
                        class="w-[80px] h-[90px]"
                        src="@/assets/images/profile/success.png"
                    />
                    <span class="my-2">{{
                        userDetail.settleState == '1'
                            ? '入驻申请提交成功，等待审核中'
                            : '入驻申请审核成功'
                    }}</span>
                    <span class="text-[#9ca3af] text-[14px]">{{
                        userDetail.settleState == '1'
                            ? '审核结果将以短信方式进行通知'
                            : '审核通过'
                    }}</span>
                </div>
                <div
                    class="flex flex-col items-center justify-center my-5"
                    v-if="userDetail.settleState == '3'"
                >
                    <img
                        class="w-[80px] h-[80px]"
                        src="@/assets/images/profile/errorIcon.png"
                    />
                    <span class="my-2"
                        >认证申请审核失败，请查看驳回原因并<button
                            class="text-[#165dff]"
                            @click="resubmit4"
                        >
                            重新提交
                        </button></span
                    >
                    <span class="text-[#9ca3af] text-[14px]"
                        >驳回原因：{{ userDetail.settleRemark }}</span
                    >
                </div>

                <el-form
                    :model="state.form"
                    size="large"
                    label-position="left"
                    label-width="120px"
                    class="w-[800px] bg-[#F6FBFF] p-5"
                >
                    <el-row :gutter="35">
                        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                            <el-form-item
                                label="申请账户:"
                                prop="name"
                                class="leftFormTip"
                                style="margin-bottom: 0"
                            >
                                <span>{{ userDetail.userName }}</span>
                                <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                            </el-form-item>
                            <el-form-item
                                label="申请事由:"
                                class="leftFormTip"
                                style="margin-bottom: 0"
                            >
                                <span>{{ userDetail.settleDesc }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col
                            :xs="12"
                            :sm="12"
                            :md="12"
                            :lg="12"
                            :xl="12"
                            class="mb22"
                        >
                            <el-form-item
                                label="申请机构:"
                                class="leftFormTip"
                                style="margin-bottom: 0"
                            >
                                <span>{{ userDetail.orgName }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
    <el-dialog v-model="showImg" title="查看图片" width="800">
        <div class="w-full flex justify-center">
            <img :src="businessFilePath" />
        </div>
    </el-dialog>
    <el-dialog
        v-model="showCreateDid"
        title="创建DID"
        width="800"
        @close="handleCreateDidClose"
    >
        <div class="w-full">
            <el-form
                ref="createDidFormRef"
                :model="state.createDidForm"
                :rules="createDidRules"
                size="large"
                label-position="left"
                label-width="120px"
                class="w-[500px]"
                :hide-required-asterisk="true"
            >
                <el-row :gutter="35">
                    <el-col
                        :xs="24"
                        :sm="24"
                        :md="24"
                        :lg="24"
                        :xl="24"
                        class="mb22"
                    >
                        <el-form-item label="创建方式" class="leftFormTip">
                            <span>导入已有DID</span>
                            <!-- <span style="margin-top: 5px; line-height: 1.6; font-size: 14px; color: #b8b8b8"> 6-32个字符，只能由英文字母、数字及!"'”组成 </span> -->
                        </el-form-item>
                        <el-form-item
                            label="DID文档"
                            prop="fileDid"
                            class="leftFormTip"
                        >
                            <el-upload
                                class="upload-demo"
                                action=""
                                :http-request="handleFileUpload"
                                :before-upload="beforeUpload"
                                :on-remove="handleRemoveTest"
                                :file-list="fileListTest"
                                multiple
                                :limit="1"
                                :on-exceed="handleExceed"
                                accept=".txt,.json"
                            >
                                <div class="w-full flex flex-col">
                                    <el-button
                                        slot="trigger"
                                        size="small"
                                        type="primary"
                                        style="width: 100px"
                                        >选取文件</el-button
                                    >
                                    <div
                                        class="text-[12px] text-[#9ca3af] leading-5 mt-1"
                                    >
                                        请上传txt、json文件，大小不超过500kb
                                    </div>
                                </div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="showCreateDid = false">取消</el-button>
                <el-button
                    type="primary"
                    :loading="createDidLoading"
                    @click="createDid"
                >
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { notify } from '@kyvg/vue3-notification';
import { useRouter } from 'vue-router';
import { ExtendImportMeta } from '@/types/index';
import { useAuthStore } from '@/store/auth';
import axios from '@/plugins/axios';
import { User } from '@/types/user';
const authStore = useAuthStore();
const router = useRouter();
function setDataUploadUrl() {
    let locationObj = window.location;
    let urlStr =
        locationObj.protocol +
        '//' +
        locationObj.host +
        (import.meta as ExtendImportMeta).env.VITE_API_URL;
    return urlStr + '/common/upload';
}
const _UPLOAD_URL_ = setDataUploadUrl();
const userDetail = ref(<User>{});
const uploadDisabled1 = ref(false);
const headers = computed(() => {
    return { Authorization: 'Bearer ' + authStore.token };
});
const flag = ref(0);
const flag4 = ref(0);
const flag1 = ref(0);
const showImg = ref(false);
const faceFilePath = ref('');
const backFilePath = ref('');
const IdFaceFilePath = ref('');
const businessFilePath = ref('');
const didLoading = ref(false);
const showCreateDid = ref(false);
const createDidLoading = ref(false);
const limitNum = ref(1);
const roleDialogFormRef = ref<FormInstance>();
const settleFormRef = ref<FormInstance>();
const applyFormRef = ref<FormInstance>();
const createDidFormRef = ref<FormInstance>();
const fileListTest = ref<any[]>([]);
const fileContent = ref<string>('');
const step = ref(1);
const loading = ref(false);
const formLoading = ref(false);
const state = reactive({
    form: {
        orgName: '',
        orgCode: '',
        orgAddress: '',
        contactName: '',
        contactPhone: '',
        expire: 0,
        loading: false,
        fileName: '',
        url: ''
    },
    settleForm: {
        settleDesc: '',
        loading: false
    },
    createDidForm: {
        fileDid: ''
    }
});
const formReset = () => {
    state.form = {
        orgName: '',
        orgCode: '',
        orgAddress: '',
        contactName: '',
        contactPhone: '',
        expire: 0,
        loading: false,
        fileName: '',
        url: ''
    };
    applyFormRef.value?.resetFields();
};
const createDidFormReset = () => {
    state.createDidForm = {
        fileDid: ''
    };
    fileListTest.value = [];
    createDidFormRef.value?.resetFields();
};
const fileList = ref<UploadUserFile[]>();

const enterpriseName = computed(() => {
    if (authStore.user.authState == '0') {
        return (step.value = 1);
    } else if (
        authStore.user.authState != '0' &&
        authStore.user.settleState == '0'
    ) {
        return (step.value = 2);
    } else if (
        authStore.user.authState != '0' &&
        authStore.user.settleState != '0'
    ) {
        return (step.value = 5);
    }
});

onMounted(() => {
    getDetail();
});
const validatecreditCode = (rule: any, value: any, callback: any) => {
    //使用正则表达式进行社会码
    if (!/^[A-Za-z0-9]+$/.test(value)) {
        callback(new Error('请输入正确的统一信用代码！'));
    } else {
        callback();
    }
};
const validateNoSpace = (rule: any, value: any, callback: any) => {
    if (/^\s+$/gi.test(value)) {
        callback(new Error('不能全输入空格'));
    } else {
        callback();
    }
};
const validatePhone = (rule: any, value: any, callback: any) => {
    //使用正则表达式进行验证手机号码
    if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号格式！'));
    } else {
        callback();
    }
};
const settleRules = reactive<FormRules>({
    settleDesc: [
        { required: true, message: '请输入申请事项', trigger: 'blur' },
        { required: true, validator: validateNoSpace, trigger: 'blur' },
        { min: 1, max: 100, message: '1-100字符', trigger: 'blur' }
    ]
});
const createDidRules = reactive<FormRules>({
    fileDid: [{ required: true, message: '请上传文件', trigger: 'blur' }]
});
const rules = reactive<FormRules>({
    orgName: [
        { required: true, message: '请输入机构名称', trigger: 'blur' },
        { required: true, validator: validateNoSpace, trigger: 'blur' },
        { min: 1, max: 50, message: '1-50字符', trigger: 'blur' }
    ],
    orgCode: [
        { required: true, trigger: 'blur', message: '请输入统一信用代码' },
        { required: true, validator: validatecreditCode, trigger: 'blur' },
        { required: true, validator: validateNoSpace, trigger: 'blur' },
        { min: 18, max: 18, message: '长度为18位', trigger: 'blur' }
    ],
    url: [{ required: true, message: '请上传文件', trigger: 'change' }],
    orgAddress: [
        { required: true, message: '请输入地址', trigger: 'blur' },
        { required: true, validator: validateNoSpace, trigger: 'blur' },
        { min: 1, max: 100, message: '长度为18位', trigger: 'blur' }
    ],

    contactName: [
        { required: true, message: '请输入联系人姓名', trigger: 'blur' },
        { required: true, validator: validateNoSpace, trigger: 'blur' },
        { min: 1, max: 20, message: '长度为20位', trigger: 'blur' }
    ],
    contactPhone: [
        { required: true, message: '请输入联系人电话', trigger: 'blur' },
        { required: true, validator: validatePhone, trigger: 'blur' }
    ]
});

const handleUploadError: UploadProps['onError'] = () => {
    ElMessage.warning('上传文件失败，请重试');
    // state.ruleForm.loading?.close();
};
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (
        rawFile.type == 'image/png' ||
        rawFile.type == 'image/jpeg' ||
        rawFile.type == 'image/jpg'
    ) {
        if (rawFile.size / 1024 / 1024 < 5) {
            return true;
        } else {
            notify({
                type: 'error',
                text: '图片不得超过5M'
            });
            return false;
        }
    } else {
        notify({
            type: 'error',
            text: '上传文件格式务必PNG|JPG|JPEG'
        });
        return false;
    }
};
const handlerStep = (data: any) => {
    if ((data.authState === '0' || data.authState == '3') && flag1.value == 1) {
        return (step.value = 1);
    } else if (
        (data.authState == '1' || data.authState == '3') &&
        flag1.value == 0
    ) {
        return (step.value = 2);
    } else if (
        data.authState == '2' &&
        flag.value == 0 &&
        (data.settleState === '0' || data.settleState === null)
    ) {
        return (step.value = 3);
    } else if (
        data.authState === '2' &&
        (data.settleState === '0' || data.settleState === null) &&
        data.hasDid === '1' &&
        flag.value == 1
    ) {
        return (step.value = 4);
    } else if (
        data.authState === '2' &&
        data.hasDid === '1' &&
        (data.settleState === '1' ||
            data.settleState === '2' ||
            data.settleState === '3') &&
        flag4.value == 0
    ) {
        return (step.value = 5);
    } else if (
        data.authState === '2' &&
        data.hasDid === '1' &&
        (data.settleState === '1' ||
            data.settleState === '2' ||
            data.settleState === '3') &&
        flag4.value == 1
    ) {
        return (step.value = 4);
    }
};
const getDetail = async () => {
    try {
        const { data } = await axios.get('/system/user/detail', {
            params: { userId: authStore.user.userId }
        });
        if (data.code == 200) {
            userDetail.value = data.data;
            data.data.attachments.forEach((item: any) => {
                if (item.fileType == 0) {
                    IdFaceFilePath.value = item.filePath;
                } else if (item.fileType == 1) {
                    backFilePath.value = item.filePath;
                } else if (item.fileType == 2) {
                    faceFilePath.value = item.filePath;
                } else if (item.fileType == 3) {
                    businessFilePath.value = item.filePath;
                }
            });
            await handlerStep(userDetail.value);
        } else {
            ElMessage.error(data.msg);
        }
    } catch (error) {
        throw error;
    }
};

const handlePictureCardPreview = (file: any) => {
    // dialogImageUrl.value = file.url!;
    // dialogVisible.value = true;
};

const handleFileUpload = async (request: any) => {
    const file = request.file;
    const reader = new FileReader();

    reader.onload = (e: any) => {
        try {
            const jsonData = JSON.parse(e.target.result);
            if (jsonData.id) {
                fileContent.value = jsonData.id;
                state.createDidForm.fileDid = jsonData.id;
            } else {
                throw new Error('上传文件不是分布式身份DID文件');
            }
            ElMessage.success('文件上传并解析成功');
        } catch (error: any) {
            ElMessage.error('文件解析失败: ' + error.message);
            fileListTest.value = [];
            fileContent.value = '';
            state.createDidForm.fileDid = '';
        }

        // 这里不需要实际发送请求到服务器，因为我们只是解析文件内容
        request.onSuccess();
    };

    reader.readAsText(file);

    // 阻止默认的上传行为
    return false;
};
const parsedId = ref<string | null>(null);
const errorMessage = ref<string | null>(null);
const beforeUpload = (file: any) => {
    const isTxtOrJson =
        file.type === 'text/plain' || file.type === 'application/json';
    const isLt500K = file.size / 1024 / 1024 < 0.5;
    if (!isTxtOrJson) {
        ElMessage.error('上传文件只能是 txt、json 格式!');
    }
    if (!isLt500K) {
        ElMessage.error('上传文件大小不能超过 500KB!');
    }
    return isTxtOrJson && isLt500K;
};

const handleRemoveTest = (file: any, fileList: any[]) => {
    fileListTest.value = [];
    fileContent.value = '';
    state.createDidForm.fileDid = '';
};

const handleRemove = (file: any, fileList: any) => {
    uploadDisabled1.value = false;
    state.form.fileName = '';
    state.form.url = '';
};
const handleAvatarSuccess = (response: any, uploadFile: any) => {
    if (response.code == 200) {
        state.form.fileName = response.fileName;
        state.form.url = response.url;
        uploadDisabled1.value = true;
    } else {
        notify({ type: 'error', text: response.msg });
    }
};
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    ElMessage.warning('上传文件数量超出限制');
};
const onSubmit = () => {
    applyFormRef.value?.validate(async (valid: any) => {
        if (valid) {
            formLoading.value = true;
            try {
                const { data } = await axios.post('/system/user/submitAudit', {
                    orgName: state.form.orgName,
                    orgCode: state.form.orgCode,
                    orgAddress: state.form.orgAddress,
                    contactName: state.form.contactName,
                    contactPhone: state.form.contactPhone,
                    attachments: [
                        {
                            fileName: state.form.fileName,
                            filePath: state.form.url
                        }
                    ]
                });
                if (data.code == 200) {
                    ElMessage.success('提交成功');
                    step.value = 2;
                    getDetail();
                } else {
                    ElMessage.error(data.msg);
                }
            } catch (error) {
                throw error;
            } finally {
                formLoading.value = false;
            }
        }
    });
};
const handleCreateDidClose = () => {
    didLoading.value = false;
    createDidLoading.value = false;
    createDidFormReset();
};
const createDid = () => {
    createDidFormRef.value?.validate(async (valid: any) => {
        if (valid) {
            createDidLoading.value = true;
            try {
                const { data } = await axios.post(
                    `/did/iid/add/${fileContent.value}`
                );

                if (data.code == 200) {
                    createDidLoading.value = false;
                    showCreateDid.value = false;
                    notify({ type: 'success', text: 'DID创建成功' });
                    getDetail();
                    handleCreateDidClose();
                } else {
                    notify({ type: 'error', text: `操作失败 ${data.msg}` });
                    didLoading.value = false;
                }
            } catch (error) {
                didLoading.value = false;
                createDidLoading.value = false;
            } finally {
                didLoading.value = false;
                showCreateDid.value = false;
            }
        }
    });
};
const handleCreateDid = () => {
    didLoading.value = true;
    showCreateDid.value = true;
};
const handleCreateDidLocation = () => {
    window.open('/resources/iid-browser-wallet.zip');
};
const toStep3 = () => {
    step.value = 3;
    flag.value = 0;
};
const fourToStep3 = () => {
    step.value = 3;
};
const toStep2 = () => {
    step.value = 2;
};
const resubmit1 = () => {
    step.value = 1;
    flag1.value = 1;
    getDetail();
    state.form.orgName = userDetail.value.orgName as string;
    state.form.orgCode = userDetail.value.orgCode as string;
    state.form.orgAddress = userDetail.value.orgAddress as string;
    state.form.contactName = userDetail.value.contactName as string;
    state.form.contactPhone = userDetail.value.contactPhone as string;
    state.form.fileName = userDetail.value.attachments[0].fileName;
    state.form.url = userDetail.value.attachments[0].filePath;
    fileList.value = [
        {
            name: state.form.fileName,
            url: state.form.url
        }
    ];
};
const resubmit4 = () => {
    step.value = 4;
    flag4.value = 1;
    getDetail();
    state.settleForm.settleDesc = userDetail.value.settleDesc as string;
};
const toStep4 = () => {
    getDetail();
    step.value = 4;
    flag.value = 1;
};
const toStep5 = () => {
    settleFormRef.value?.validate(async (valid: any) => {
        if (valid) {
            state.settleForm.loading = true;
            try {
                const { data } = await axios.post(
                    '/system/settle/submitApply',
                    {
                        settleDesc: state.settleForm.settleDesc
                    }
                );

                if (data.code == 200) {
                    ElMessage.success('提交成功');
                    step.value = 5;
                    getDetail();
                } else {
                    ElMessage.error(data.msg);
                }
            } catch (error) {
                throw error;
            } finally {
                state.settleForm.loading = false;
            }
        }
    });
};
const toHome = () => {
    router.push({
        path: '/profile'
    });
};
</script>
<style lang="scss" scoped>
.lowBgColor {
    fill: #bbd2f1;
    stroke: #bbd2f1;
}
.highBgColor {
    fill: #2f88ff;
    stroke: #2f88ff;
}
.lowBgColorC {
    fill: none;
    stroke: #bbd2f1;
}
.highBgColorC {
    fill: none;
    stroke: #2f88ff;
}
.leftFormTip {
    ::v-deep(.el-form-item__content) {
        font-size: 16px;
    }
}
.uploadImg {
    margin-right: 1rem;
    ::v-deep(.el-upload-dragger) {
        height: 100%;
    }
    ::v-deep(.el-icon--close-tip) {
        display: none !important;
    }
}
.uploadImgDisabled {
    ::v-deep(.el-upload--picture-card) {
        display: none;
    }
}
</style>
