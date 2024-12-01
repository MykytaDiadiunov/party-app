export function getFormatedDate(date: Date): string {
    return `${date.getDate() <= 9 ? '0' : ''}${date.getDate()}.${date.getMonth() + 1 <= 9 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()}`
}

export function getFormatedTime(date: Date): string {
     return `${date.getHours()}:${date.getMinutes() <= 9 ? '0' : ''}${date.getMinutes()}`
}