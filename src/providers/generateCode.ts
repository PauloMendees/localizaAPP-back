export async function GenerateCode() {
    return await Math.random().toString(36).substring(2, 6).toUpperCase();
}