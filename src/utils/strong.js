// 存储数据到本地
export const setitem = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)

}




// 获取本地存储的数据

export const getitem = (key) => {
    try {
        const data = window.localStorage.getItem(key)
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}









// 删除本地数据
export const removeitem = (key) => {
    window.localStorage.removeItem(key)
}