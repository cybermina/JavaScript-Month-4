require("dotenv").config();
const http = require("http");
const readDB = require("./utils/readFile");
const writeDB = require("./utils/writeFile");

const server = http.createServer((req, res) => {
    let url = req.url.toLocaleLowerCase();
    let method = req.method.toLocaleUpperCase();

    if(url.startsWith("/api")){
        if(url == "/api/auth/register" && method == "POST"){
            let newUser = '';
            req.on("newUser", (chunk) => {
                newUser += chunk;
            });

            req.on("end", async () =>  { 
                newUser = JSON.parse(newUser);
                let users = readDB("users.json");

                let checkUser = users.some((user) => user.email == newUser.email);

                if(checkUser){
                    res.writeHead(400, {"content-type": "application/json"});
                    return res.end(JSON.stringify( {message: "User already exists", status: 400} ) );
                };

                newUser = {id: users.length ? users.at(-1).id + 1: 1, ...newUser, createdAt: new Date().toLocaleDateString()};

                user.push(newUser);

                await writeDB("users.json", users);

                res.writeHead(201,{"content-type": "application/json"} );
                return res.end(JSON.stringify( { message: "User successfully registered", status: 201}))
         })
        };

        if(url == "/api/auth/login" && method == "POST"){
            let user = '';

            req.on("data", (chunk) => {
                user += chunk;
            });

            req.on("end", async () => {
                user = JSON.parse(user);

                let users = await readDB("users.json");

                let findUser = users.find((u) => u.email == user.email);

                if(!findUser) {
                    res.writeHead(404,{"content-type": "application/json"});
                    return res.end(JSON.stringify({message: "User not found", status: 404} ) );
                };

                if(!findUser) {
                    res.writeHead(404,{"content-type": "application/json"});
                    return res.end(JSON.stringify({message: "User not found", status: 404} ) );
                };

                res.writeHead(200, {"content-type": "application/json"});
                return res.end(JSON.stringify( { message: "User successfully logged in", status: 200 } ) )
            });
        }
    }
});

let PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on ${PORT}-port`));