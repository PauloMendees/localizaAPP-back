import { HandleUser } from "../Handle"

describe("Testando HandleUser", () => {
    const handleUser = new HandleUser()

    test("Getall", async () => {
        const data = await handleUser.getUsers()
        expect(data).toBeDefined()
    })

    test("GetById on success", async () => {
        //Coloque aqui um id que exista no seu bd
        const user = await handleUser.getUserById("3a43974b-1718-4749-aac8-ca4adb83fa0d");
        expect(user?.email).toBe("startgamerr2010@gmail.com");
    })

    test("GetById on fail", async () => {
        //Coloque aqui um id que não exista no seu bd
        const user = await handleUser.getUserById("3a43974b-1718-4749-a2c8-ca4adb83fa0d");
        expect(user?.email).toBe(undefined);
    })

    test("post and delete", async () => {
        const data = await handleUser.postUser("tteste@teste.com.br", "SenhaForte.123", "SenhaForte.123")
        expect(data.data?.email).toBe("tteste@teste.com.br")
        try {
            const id = data.data?.id
            if(!!id){
                await handleUser.deleteUser(id);
                expect(true).toBe(true);
            }
        } catch (e) {
            expect(false).toBe(true)
        }
    })

    test("put on success", async () => {
        try {
            //Coloque aqui um id que exista no seu bd
            const updatedUser = await handleUser.putUser('c454f237-2b4d-4468-8598-42e3d979e914', "Teste@teste.com.br")
            expect(updatedUser.data?.email).toBe("Teste@teste.com.br")
        } catch (e) {
            expect(true).toBe(false)
        }
    })

    test("put on fail", async () => {
        try {
            //Coloque aqui um id que não exista no seu bd
            const updatedUser = await handleUser.putUser('c454f237-2b4d-4468-8598-4222d979e914', "Teste@teste.com.br")
            expect(updatedUser.data?.email).toBe("Teste@teste.com.br")
        } catch (e) {
            expect(true).toBe(true)
        }
    })
})