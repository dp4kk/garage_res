const Storage=(serviceItems)=>{
    localStorage.setItem('service',JSON.stringify(serviceItems.length>0? serviceItems :[]))
}

export const totalServices=(serviceItems)=>{
    Storage(serviceItems)
    let totalCount=serviceItems.reduce((total,service)=>total+service,0)
    return {totalCount}
}

export const ServiceReducer=(state,action)=>{
    switch(action.type){
        case 'ADD_SERVICE':{
            if(!state.serviceItems.find(Item=>Item.id===action.payload.id)){
                state.serviceItems.push({...action.payload})
            }
            return{
                ...state,
                ...totalServices(state.serviceItems),
                serviceItems:[...state.serviceItems]
            }
        }
        case 'REMOVE':{
            return{
                ...state,
                ...totalServices(state.serviceItems.filter(item=>item.id!==action.payload.id)),
                serviceItems:[...state.serviceItems.filter(item=>item.id!==action.payload.id)]
            }
        }
        default : return state
    }
}