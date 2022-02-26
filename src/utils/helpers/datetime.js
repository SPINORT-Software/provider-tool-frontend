const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const convert_backend_datetime_to_ui = (datetime) => {
    const convertedDate = new Date(Date.parse(datetime))
    return `${months[convertedDate.getMonth()]} ${convertedDate.getDate()}, ${convertedDate.getFullYear()}`
};


export const convert_backend_datetime_to_ui1 = (datetime) => {
    const converted_date = new Date(Date.parse(datetime))
    return `${months[converted_date.getMonth()]}, ${converted_date.getDate()}} `
};
