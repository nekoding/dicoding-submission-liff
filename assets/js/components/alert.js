Vue.component('x-alert', {
    template: `<div class="alert" role="alert">
                  {{ message }}
               </div>`,
    props: {
        message: {
            type: String,
            required: true
        }
    },
})
