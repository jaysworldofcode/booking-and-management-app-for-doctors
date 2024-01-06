<template>
    <div>
        <a-row>
            <a-col :span="24">
                <div>
                    <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture-card"
                    :file-list="fileList"
                    @preview="onImagePreview"
                    @change="onImageChange"
                >
                <div v-if="fileList.length < 8">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">
                    Attach file
                    </div>
                </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="closePreviewModal">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
            </div>
            </a-col>
            <a-col :span="24">
                <a-comment>
                    <div slot="content">
                        <a-form-item>
                            <a-textarea :rows="4" v-model="new_comment" />
                        </a-form-item>
                        <a-form-item>
                            <a-button html-type="submit" :loading="is_loading" type="primary" @click="submitComment">
                                Add Comment
                            </a-button>
                        </a-form-item>
                    </div>
                </a-comment>
            </a-col>
        </a-row>
    </div>
</template>
<script>
export default {
    name: 'NewComment',
    props: [
        'appointment_id',
        'onCommentSubmit',
        'index'
    ],
    data() {
        return {
            new_comment: null,
            is_loading: false,
            is_comment_submitting: false,
            previewVisible: false,
            previewImage: '',
            fileList: [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-2',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-3',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-4',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
            ],
        };
    },
    components: {
    },
    computed: {
    },
    methods: {
        async submitComment(){
            await this.onCommentSubmit(
                this.new_comment,
                this.appointment_id,
                this.index
            )

            this.new_comment = null
        },
        closePreviewModal() {
            this.previewVisible = false;
        },
        async onImagePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await this.getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        async getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        onImageChange({ fileList }) {
            this.fileList = fileList;
        },
    },
}
</script>
<style scoped>
</style>