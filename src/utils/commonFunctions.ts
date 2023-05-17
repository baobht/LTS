
export const convertTimeVideo = (duration = 0)=>{
    const timeInMinutes = Math.floor(duration / 60) >= 10 ? Math.floor(duration / 60) : `0${Math.floor(duration / 60)}`;
    const iimeInSeconds = Math.floor(duration % 60) >= 10 ? Math.floor(duration % 60) : `0${Math.floor(duration % 60)}`;

    return `${timeInMinutes}:${iimeInSeconds}`;
}