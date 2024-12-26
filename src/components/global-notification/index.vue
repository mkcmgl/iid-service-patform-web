<template>
    <notifications
        class="fixed mt-4"
        position="top center"
        width="400px"
        :max="3"
        :duration="6000"
    >
        <template #body="{ item, close }">
            <div
                class="mb-4 backdrop-blur border-2 shadow px-2 py-2 rounded relative w-full"
                :class="{
                    'bg-green-100 border-green-600/50': item.type === 'success',
                    'bg-orange-100 border-orange-600/50':
                        item.type === 'warning',
                    'bg-red-100 border-red-600/50': item.type === 'error',
                    'bg-blue-100 border-blue-600/50': item.type === 'info'
                }"
            >
                <div
                    class="px-2"
                    :class="[
                        item.hideClose === true
                            ? 'w-full'
                            : `w-[calc(100%-theme('spacing.10'))]`
                    ]"
                >
                    <h5 v-if="item.title" class="text-md leading-8 font-bold">
                        {{ item.title }}
                    </h5>

                    <p v-if="item.text" class="text-[90%]" v-html="item.text" />
                </div>

                <span
                    v-if="item.hideClose !== true"
                    class="absolute right-2 top-1/2 -translate-y-1/2"
                >
                    <button
                        type="button"
                        class="block w-8 h-8 rounded clickable hoverable relative"
                        @click="close"
                    >
                        ×
                    </button>
                </span>
            </div>
        </template>
    </notifications>
</template>
