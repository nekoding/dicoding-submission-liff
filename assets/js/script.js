const app = new Vue({
    el: "#app",
    data: {
        liffId: '1655498013-w65bBEl9',
        alertShow: false,
        isLoggedIn: false,
        message: '',
        line: {
            pictureUrl: null,
            userId: '',
            displayName: ''
        },
        total: 0,
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
                    let templateMessage = "Hallo kak, \n"
                    templateMessage += "Terima kasih sudah memesan \n"
                    templateMessage += "Berikut adalah list pesanan yang kakak order mohon dicek ya : \n\n"
                    
                    this.cart.forEach(item => {
                        templateMessage += `*${item.qty} ${item.name}* \n`
                        this.total += item.qty * item.harga
                    });

                    templateMessage += `\n*Total biayanya : ${this.grandTotal}*\n`
                    templateMessage += "\nPesanan kakak akan segera diproses, kami akan memberitahukan jika pesanan sudah bisa diambil \n"
                    templateMessage += "Mohon ditunggu ya"

                    liff.sendMessages([
                        {
                          type: 'text',
                          text: templateMessage
                        }
                      ])
                        .then(() => {
                          alert('Message sent successfully')
                          window.location.reload()
                        })
                        .catch((err) => {
                          console.error(err)
                        });
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
    },
    computed: {
        grandTotal() {
            return this.total.toLocaleString('id-ID', {style:'currency', currency:'IDR'})
        }
    }
})
