//存储
export function localSave (value,key='token'){
    window.sessionStorage.setItem(key,value)
}

//获取
export function localGet (key='token'){
    return window.sessionStorage.getItem(key)
}

//删除
export function localRemove (key='token'){
    window.sessionStorage.removeItem(key)
}