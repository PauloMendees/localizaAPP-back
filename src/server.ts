import { app } from "./app";
import { onStart } from "./onStart";

async function run(){
    await onStart()
    app.listen(process.env.PORT || 8080, () => console.log("Server running fine on port 8080."))
}

run().catch(console.error)