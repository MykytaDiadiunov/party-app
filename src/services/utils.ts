import { ConvertedToBase64Image, CreateParty, UpdateParty } from "@/models";
import { modalController } from "@ionic/vue";

export function getFormatedDate(date: Date): string {
    const formatedString: string = `${date.getUTCDate() <= 9 ? '0' : ''}${date.getUTCDate()}.${date.getUTCMonth() + 1 <= 9 ? '0' : ''}${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`
    return formatedString
}

export function getFormatedTime(date: Date): string {
    const formatedString: string = `${date.getUTCHours()}:${date.getUTCMinutes() <= 9 ? '0' : ''}${date.getUTCMinutes()}`
    return formatedString
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

export function dateTimeObjectToApiDatetimeString(date: Date): string {
    const dateString: string = `${date.getFullYear()}-${date.getMonth() + 1 <= 9 ? '0' : ''}${date.getMonth() + 1 }-${date.getDate() <= 9 ? '0' : ''}${date.getDate()}T${date.getHours() <= 9 ? '0' : ''}${date.getHours()}:${date.getMinutes() <= 9 ? '0' : ''}${date.getMinutes()}:${date.getMilliseconds() <= 9 ? '0' : ''}${date.getMilliseconds()}Z`
    return dateString
}

export function createPartyModelToUpdatePartyModel(createPartyModel: CreateParty): UpdateParty {
    const updatePartyModel: UpdateParty = {
        title: createPartyModel.title,
        description: createPartyModel.description,
        image: createPartyModel.image,
        startDate: createPartyModel.startDate
    }
    return updatePartyModel
}

export async function closeAllModals() {
    let modal = await modalController.getTop()
    while (modal) {
    await modal.dismiss()
    modal = await modalController.getTop()
    }
}