export function formateDate(ms) {
    const d = new Date(ms);
    
    let day = d.getDate();
    day = (day <= 9) ? '0' + day : day;
    
    let month = d.getMonth();
    month = (month <= 9) ? '0' + month : month;
    
    let hours = d.getHours();
    hours = (hours <= 9) ? '0' + hours : hours;
    
    let minutes = d.getMinutes();
    minutes = (minutes <= 9) ? '0' + minutes : minutes;
    
    let seconds = d.getSeconds();
    seconds = (seconds <= 9) ? '0' + seconds : seconds;
    
    return `${day}.${month}.${d.getFullYear()} at ${hours}:${minutes}.${seconds}`;
}