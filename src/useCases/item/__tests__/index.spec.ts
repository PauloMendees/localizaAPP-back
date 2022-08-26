import { HandleItem } from "../Handle"
import { PutResponse } from "../IHandleItems"

describe("Testing handle items", () => {
    const handleItems = new HandleItem()

    test('testando get items', async () => {
        const data = await handleItems.getAll()
        expect(data).toBeDefined();
    })

    test('testando post', async () => {
        const item = await handleItems.post("123", "123",  "plaqueta", "andar", "loc", "describe", "dono", "lido", "tipo")
        expect(item.sequencial_localiza).toBe("123")
        await handleItems.delete(item.id)
    })

    test('testando getById on success', async () => {
        //Coloque aqui um id que exista no seu banco de dados.
        const item = await handleItems.getById("022c0ab9-2dca-466d-84f4-be2e2e9dcfe3");
        expect(item?.plaqueta).toBe('plaqueta');
    })

    test('testando getById on fail', async () => {
        //Coloque aqui um id que exista no seu banco de dados.
        const item = await handleItems.getById("022c0ab9-2dca-466d-84f4-be222e9dcfe3");
        expect(item?.plaqueta).toBe(undefined);
    })

    test('testando put on success', async () => {
        //Coloque aqui um id que exista no seu banco de dados.
        const data = await handleItems.put("022c0ab9-2dca-466d-84f4-be2e2e9dcfe3", "123", "123",  "plaqueta", "andar", "loc", "describe", "dono", "lido", "tipo");
        const item = data.data;
        expect(item?.sequencial_localiza).toBe("123")
    })

    test('testando put on success', async () => {
        try {
            //Coloque aqui um id que NÃO exista no seu banco de dados.
            const data = await handleItems.put("022c0ab9-2dca-466d-84f4-be2e2e9123e3", "123", "123",  "plaqueta", "andar", "loc", "describe", "dono", "lido", "tipo");
            const item = data.data;
            expect(item?.sequencial_localiza).toBe("123")
        } catch (e) {
            expect(true).toBe(true)
        }
    })
})