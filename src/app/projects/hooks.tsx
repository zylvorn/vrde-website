import axios from 'axios'
import { useState } from 'react'

export type TTag = {
  name: string
  group: string
  id: string
}
export type TProject = {
  id: string
  client: string
  date: Date
  tags: TTag[]
  team: string
  images: string[]
  name: string
  location: string
}
export type TData = {
  projects: TProject[]
  tags: (TTag & { selected: boolean })[]
  html: string
}

const useProjects = () => {
  const [projectState, setProjectState] = useState<TData>({
    projects: [],
    tags: [],
    html: '',
  })
  const getProjects = async () => {
    try {
      const { data } = await axios.get<TData>('/api/projects')
      setProjectState({
        ...data,
        tags: data.tags.map((e) => ({ ...e, selected: false })),
      })
    } catch (error) {
      console.log(error)
    }
  }
  return {
    projectState,
    getProjects,
    setProjectState,
  }
}
export default useProjects
