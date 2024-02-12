export const getRandomContact = contacts => {
    const randomContact = contacts[(Math.floor(Math.random() * contacts.length))]
    return randomContact
}