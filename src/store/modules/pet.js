import axios from 'axios'
const pet = {
    state: {
        petdata:[{
            id: 1,
            name: "doggie",
            photoUrls: "doggie",
            status: "available",
            task: "tasklaji",
            category: [
                {
                    "sx_name": "sx_name",
                    "sx_value": "sx_value"
                }
            ]
        }]
    },
    mutations: {
        SET_PETDATA:(state, petdata) => {
            state.petdata = petdata
        }
    },
    actions: {
        SET_PETDATA_init({ commit }){
            axios.get("api/pet").then(response => {
                let res = response.data.data
                commit('SET_PETDATA',res)
            }).catch(error => {
                console.log('获取不到pet!')
            })
        }

    }
}

export default pet
