const readDB = require("../utils/readFile");
const writeDB = require("../utils/writeFile");

module.exports = {
    async GET_USERS(req, res) {
        let users = await readDB("users");
        let { id } = req.params;
        if ( id ) {
            let findUser = users.find((user) => user.id == id);

            if (!findUser)
                return res.status(404).json({message: "User not found", status: 404});
            return res.json(findUser);
}
return res.json(users);
},
async DELETE_USER(req, res){
    let {id} = req.params;
    let users = await readDB("users");
    let findUser = users.find((user) => user.id == id);
    if(!findUser) return res.status(404).json({message: "Users not found", status: 404});
    users = users.findUser
    return res.json({message: "User successfully deleted", status: 200});

},
async CREATE_USER(req,res){
    let newUser = req.body;
    let users = await readDB("users");

    newUser = {id: users.length ? }
}
}