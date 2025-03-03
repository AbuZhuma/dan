const generateRandomID = (length) => {
    length = length 
    let id = '';
    const characters = '0123456789qwertyuiopasdfghjklzxcvbnm';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return id;
}

module.exports = generateRandomID