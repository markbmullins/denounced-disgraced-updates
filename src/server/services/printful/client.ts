const API_KEY = process.env.PRINTFUL_API_KEY;
const BASE_URL = "https://api.printful.com";

interface ApiCallOptions {
  body?: any;
}

export const createPrintfulClient = () => {
  const fetchResource = async <T>(
    endpoint: string,
    method: string,
    options?: ApiCallOptions,
  ): Promise<T> => {
    if (!API_KEY) throw new Error("No printful API key provided");

    const { body } = options || {};
<<<<<<< HEAD
    try {
=======

    console.log(body)
    try {

      console.log(`${BASE_URL}/${endpoint}`)
>>>>>>> master
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          ...(body && { "Content-Type": "application/json" }),
        },
        ...(body && { body: JSON.stringify(body) }), // body is now correctly placed outside of headers
      });

<<<<<<< HEAD
=======

>>>>>>> master
      const resJson = await response.json();
      const products = resJson?.result;

      return products;
    } catch (error) {
      if (error instanceof Error) {
<<<<<<< HEAD
        throw new Error(`Failed to make Printful API call: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred");
=======
        console.log(`Failed to make Printful API call: ${error.message}`);
      } else {
        console.log("An unknown error occurred");
>>>>>>> master
      }
    }
  };

  return {
    get: <T>(url: string): Promise<T> => fetchResource(url, "GET"),
    post: <T>(url: string, options?: ApiCallOptions): Promise<T> =>
      fetchResource(url, "POST", options),
    put: <T>(url: string, options?: ApiCallOptions): Promise<T> =>
      fetchResource(url, "PUT", options),
    delete: <T>(url: string, options?: ApiCallOptions): Promise<T> =>
      fetchResource(url, "DELETE", options),
  };
};
