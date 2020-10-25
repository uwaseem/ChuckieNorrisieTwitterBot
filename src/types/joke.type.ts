// { "type": "success", "value": { "id": 39, "joke": "Chuck Norris will attain statehood in 2009. His state flower will be the Magnolia.", "categories": [] } }
export interface JokeType {
  id: string
  joke: string
  categories?: string[]
}

export interface JokeResponse {
  type: string
  value: JokeType
}
