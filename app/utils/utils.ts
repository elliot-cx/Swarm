import { Image, Canvas } from "canvas";

export namespace Utils {

    export function randomString() {
        const charSet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < 16; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    }

    export async function compressImage(url: string): Promise<string | undefined> {
        return new Promise<string | undefined>((resolve) => {
            const image = new Image();
            image.src = url;

            image.onload = () => {
                const maxSize = 128;
                const canvas = new Canvas(maxSize, maxSize);
                const ctx = canvas.getContext("2d");
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                let width = maxSize;
                let height = maxSize;

                if (image.width > image.height) width = Math.round((maxSize * image.width) / image.height);
                else if (image.height > image.width) height = Math.round((maxSize * image.height) / image.width);

                ctx!.drawImage(image, 0, 0, image.width, image.height, (maxSize - width) / 2, (maxSize - height) / 2, width, height);
                let picture: string = "";
                for (let i = 0; i < 5; i++) {
                    const quality = 1 - i / 10;
                    picture = canvas.toDataURL("image/jpeg", quality).substring("data:image/jpeg;base64,".length);
                    if (picture.length <= 10000) {
                        break;
                    }
                }
                URL.revokeObjectURL(url);
                if (picture.length < 10000) {
                    resolve(picture);
                } else {
                    resolve(undefined);
                }
            };

            image.onerror = () => {
                URL.revokeObjectURL(url);
                resolve(undefined);
            };
        });
    }

}