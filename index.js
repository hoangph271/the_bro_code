new Vue({
  el: '#app',
  data: {
    keyword: '',
    toastText: '',
    toastTimeout: null,
  },
  computed: {
    codes() {
      return codes.filter(code => code.content.toLowerCase().includes(this.keyword.toLowerCase()))
    }
  },
  methods: {
    async handleCopyCode(code) {
      try {
        const { state } = await navigator.permissions.query({ name: 'clipboard-write' })

        if (['granted', 'prompt'].includes(state)) {
          const { number, content } = code
          const copyContent = `Article ${number}: ${content}`

          await navigator.clipboard.writeText(copyContent)
          this.showToast(copyContent)
        }
      } catch (error) {
        console.error(error)
        this.showToast('Copy failed...!')
      }
    },
    showToast(text) {
      this.toastText = ''
      clearTimeout(this.toastTimeout)
      this.$nextTick(() => this.toastText = text)
      this.toastTimeout = setTimeout(() => this.toastText = '', 3000)
    }
  }
})
