class ApiClient{
    constructor(){
        this.baseURL = "http://localhost:3000/api/v1";
        this.defaultHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
    }

    async customFecth(endPoint, options = {}){
        try {
            const url = `${this.baseURL}${endPoint}`
            const headers = {...this.defaultHeaders, ...options.headers}

            const config = {
                ...options,
                headers,
                credentials: 'include'
            }
            console.log(`Fetching ${url}`);
            const response = await fetch(url, config)
            const data = await response.json()
            return data
            
        } catch (error) {
            console.error('API Error', error);
            throw error
            
        }
    }

    //Auth endpoints
    async signup(name, email, password){
        return this.customFecth("/users/register", {
            method: "POST",
            body: JSON.stringify({name, email, password})
        })
    }
    async login(email, password){
        return this.customFecth("/users/login", {
            method: "POST",
            body: JSON.stringify({email, password})
        })
    }
    async logout(){
        return this.customFecth("/users/logout", {
            method: "POST",
        })
    }
    async getProfile(){
        return this.customFecth("/users/me", {
        })
    }

}

const apiClient  = new ApiClient()
export default apiClient