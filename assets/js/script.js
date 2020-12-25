const app = new Vue({
    el: "#app",
    data: {
        liffId: '1655318859-VG9rLMYn',
        alertShow: false,
        isLoggedIn: false,
        message: '',
        line: {
            pictureUrl: null,
            userId: '',
            displayName: ''
        },
        cart: [],
        products: [
            {
                "id": 1,
                "name": "Sate Ayam",
                "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda beatae blanditiis consequatur dignissimos, dolorem doloremque eligendi error eum fugiat, iste laboriosam neque nulla obcaecati perferendis, quam rem ullam voluptate!",
                "harga": 10000
            },
            {
                "id": 2,
                "name": "Martabak",
                "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda beatae blanditiis consequatur dignissimos, dolorem doloremque eligendi error eum fugiat, iste laboriosam neque nulla obcaecati perferendis, quam rem ullam voluptate!",
                "harga": 8000
            },
            {
                "id": 3,
                "name": "Bakso bakar",
                "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda beatae blanditiis consequatur dignissimos, dolorem doloremque eligendi error eum fugiat, iste laboriosam neque nulla obcaecati perferendis, quam rem ullam voluptate!",
                "harga": 12000
            },

        ]
    },
    methods: {
        cartUpdate(product) {
            let productInCart = this.cart.filter(item => item.id === product.id)

            if (productInCart.length > 0) {
                productInCart[0].qty += 1
            } else {
                let data = Object.assign({}, product, {qty: 1})
                this.cart.push(data)
            }
        },
        checkout() {
            if (liff.isLoggedIn()) {
                if (liff.isInClient()) {
                    liff.sendMessages([
                        {
                            'type': 'text',
                            'text': 'asu'
                        }
                    ])
                        .then(() => alert('Pesan berhasil dikirimkan'))
                        .catch(error => console.error(error))
                } else {
                    alert('liff messages tidak bisa digunakan di external browser')
                }
            } else {
                this.alertShow = true
                this.message = 'Anda belum login diaplikasi LINE. silahkan login terlebih dahulu'
            }
        },
        showModal(idModal) {
            const modal = document.getElementById(idModal)
            modal.addEventListener('shown.bs.modal',  () => {
                modal.focus()
            })
        },
        deleteItem(index) {
            this.cart.splice(index, 1)
        },
        incrementQuantity(index) {
            this.cart[index].qty += 1
        },
        decrementQuantity(index) {

            if (this.cart[index].qty > 1) {
                this.cart[index].qty -= 1
            }
        },
        login() {
            if (!liff.isLoggedIn()) {
                liff.login()
            }
        },
        logout() {
            if (liff.isLoggedIn()) {
                liff.logout()
                window.location.reload()
            }
        }
    },
    mounted() {
        liff.init({ liffId: this.liffId}, () => console.info('sukses terhubung dengan liff'), () => alert('Gagal terhubung dengan liff'))

        liff.ready.then(() => {
            if (!liff.isLoggedIn()) {
                console.log('silahkan login terlebih dahulu sebelum menggunakan aplikasi')
            } else {
                this.isLoggedIn = true
                liff.getProfile().then(profile => this.line = profile)
            }
        })
    }
})
