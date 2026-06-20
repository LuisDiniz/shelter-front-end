export type Species = 'dog' | 'cat'
export type Gender = 'male' | 'female'

export interface Animal {
  id: string
  name: string
  species: Species
  gender: Gender
  age: number
  description: string
  breed: string
  coverImageUrl: string
  images: string[]
  medicalHistory: string
  vaccinations: string
  admissionDate: string
}

export type AnimalImagePayload =
  | { url: string; isCover: boolean }
  | { file: File; isCover: boolean }

export interface AnimalPayload {
  name: string
  species: Species
  gender: Gender
  age: number
  description: string
  breed: string
  images: AnimalImagePayload[]
  medicalHistory: string
  vaccinations: string
}
