let users = [];

const addUsers = ({id, name,room}) => {
    console.log(users)
    //if there is no name and room
    if (!name || !room) {
        return {
            error: "Name and room is required"
        }
    }
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //if there is a duplicate user
    if(users.length) {
        const existingUser = users.find(each => each.name === name && each.room === room);

        if (existingUser) {
            return {
                error: "User already exists"
            }
        }
    }
    //add user
    const user = {id, name, room}
    users.push(user)

    return {user}
}

const removeUser = (id) => {
    // find users whose ids match and remove
    const findIdx = users.findIndex(each =>each.id == id);

    if(findIdx >=0){
        return users.splice(findIdx,1)[0]
    }
}

const getUser = (id) => {
    // find users whose ids match and remove
    return users.find(each =>each.id == id);
}

const getUsersInRoom = (room) => {
    return users.filter(each => each.room == room);
}

module.exports = {
    addUsers,
    removeUser,
    getUser,
    getUsersInRoom,
}