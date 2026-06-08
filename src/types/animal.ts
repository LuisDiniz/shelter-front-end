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
  imageUrl: string
  medicalHistory: string
  vaccinations: string
  admissionDate: string
}

export interface AnimalPayload {
  name: string
  species: Species
  gender: Gender
  age: number
  description: string
  breed: string
  imageUrl: string
  imageFile?: File | null
  medicalHistory: string
  vaccinations: string
}
