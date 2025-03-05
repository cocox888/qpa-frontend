const customFetch = async (uri: string,
    method: "POST" | "GET" | "DELETE" | "PUT") => {
    const token = localStorage.getItem('refresh_token');
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}${uri}`,
        {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        }
    );
    const res = await response.json();
    return res;
}

export default customFetch;

