import fetch from 'node-fetch';

export async function invoke(path, method = 'GET', body) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com${path}`,
      {
        body: body ? JSON.stringify(body) : null,
        json: true,
        method
      }
    );

    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
