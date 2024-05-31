const local = "http://localhost:5173"
const production = "https://rs-ecommerce-server.onrender.com/api"

let base_url = ''
let mode = 'pro'
if (mode === 'pro') {
    base_url = production
} else {
    base_url = local
}

export { base_url }