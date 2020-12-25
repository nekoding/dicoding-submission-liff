Vue.component('x-products', {
    template: `<div class="row">
                    <div class="col-sm-12 col-md-9 col-lg-10">
                        <h4>{{ name }}</h4>
                        <hr>
                        <p>{{ description }}</p>
                    </div>
        
                    <div class="col-sm-12 col-md-3 col-lg-2 mb-3">
                        <p class="d-flex">
                            <span class="d-block d-sm-none pe-2">Harga : </span>
                            <b>{{ priceFormated }}</b>
                        </p>
                        <button class="btn btn-warning" @click="addCart">Add to cart</button>
                    </div>
                </div>`,
    props: {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    methods: {
        addCart() {
            this.$emit('add-to-cart')
        }
    },
    computed: {
        priceFormated() {
            return this.price.toLocaleString('id-ID', {style:'currency', currency:'IDR'})
        }
    }
})
