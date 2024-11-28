export async function requestBody(req, res) {

    const buffers = [] 

    for await(const chunk of req) {

        buffers.push(chunk)
    }

    try{
        req.body = JSON.parse(Buffer.concat(buffers).toString())
        return req.body
    } catch {
        req.body =  []
    }
}