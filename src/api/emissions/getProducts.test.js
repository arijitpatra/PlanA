import getProducts from './getProducts'

beforeAll(() => jest.spyOn(window, 'fetch'))

test('shoudld handle 200 OK response', async () => {
  const mockData = [{ name: 'test', variable_name: 'test' }]
  window.fetch.mockResolvedValueOnce({ json: async () => mockData })
  const products = await getProducts();
  expect(window.fetch).toHaveBeenCalledTimes(1);
  expect(products).toEqual(mockData)
});