export type AvgByProductParams = {
  product: string,
  country: string,
  begin: string,
  end: string
}

export type AvgByProduct = {
  average: number,
  start: string,
  end: string
}

export const sortByStartDate = (a: AvgByProduct, b: AvgByProduct): number => {
  return new Date(a.start).getTime() - new Date(b.start).getTime()
}

const getAvgByProduct = async ({product, country, begin, end}: AvgByProductParams): Promise<Array<AvgByProduct>> => {
  const response = await fetch(
    `https://api.v2.emissions-api.org/api/v2/${product}/average.json?country=${country}&begin=${begin}&end=${end}`
  )
  const data = await response.json()
  return data.sort(sortByStartDate) // TODO: Handle errors
}
  
export default getAvgByProduct