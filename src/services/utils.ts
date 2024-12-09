import { ConvertedToBase64Image } from "@/models";

export function getFormatedDate(date: Date): string {
    return `${date.getDate() <= 9 ? '0' : ''}${date.getDate()}.${date.getMonth() + 1 <= 9 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()}`
}

export function getFormatedTime(date: Date): string {
    return `${date.getHours()}:${date.getMinutes() <= 9 ? '0' : ''}${date.getMinutes()}`
}

export async function convertImgToBase64String(file: File): Promise<ConvertedToBase64Image> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
            if (reader.result) {
                const base64String = (reader.result as string).split(',')[1];
                const convertedImg: ConvertedToBase64Image = {
                    image: (reader.result as string),
                    splitedImage: base64String
                } 
                resolve(convertedImg);
            } else {
                reject(new Error('FileReader result is null'));
            }
        };

        reader.onerror = (error) => reject(error);

        reader.readAsDataURL(file);
    });
}