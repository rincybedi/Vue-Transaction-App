<template>
  <div>
    <md-dialog-confirm
      :md-active.sync="showModal"
      :md-title="title"
      :md-content="content"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    showModal: {
      type: Boolean,
    },
  },
  name: "ConfirmDialog",
  data: () => ({
    active: false,
    value: null,
  }),
  methods: {
    onConfirm() {
      this.$emit("on-callback", true);
    },
    onCancel() {
      this.$emit("on-callback", false);
    },
  },
};
</script>
