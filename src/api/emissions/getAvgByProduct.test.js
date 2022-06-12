import getAvgByProduct, { sortByStartDate } from './getAvgByProduct'

beforeAll(() => jest.spyOn(window, 'fetch'))

test('shoudld handle 200 OK response', async () => {
  const mockData = [{ average: 1.546, start: '2020-09-03T14:19:41.295000Z', end: '2020-09-03T14:19:41.295000Z'}]
  window.fetch.mockResolvedValueOnce({ json: async () => mockData })
  const avgByProductParams = {
    product: 'methane',
    country: 'DE',
    begin: '2020-09-02T14:19:41.295000Z',
    end: '2020-09-02T14:19:41.295000Z'
  }
  const avgByProduct = await getAvgByProduct(avgByProductParams);
  expect(window.fetch).toHaveBeenCalledTimes(1);
  expect(avgByProduct).toEqual(mockData)
});

test('should sort by start date', () => {
  const data = [
    {start: '2020-09-05T14:19:41.295000Z' },
    {start: '2020-09-03T14:19:41.295000Z' },
    {start: '2020-09-02T14:19:41.295000Z' }
  ]
  
  const sortedData = [
    {start: '2020-09-02T14:19:41.295000Z' },
    {start: '2020-09-03T14:19:41.295000Z' },
    {start: '2020-09-05T14:19:41.295000Z' }
  ]

  expect(data.sort(sortByStartDate)).toEqual(sortedData)
})