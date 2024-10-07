namespace IAbout {
  type TClient = {
    name: string
    image: string
  }
  type TSection = {
    id: string
    name: string
    html: string
  }
  export type IState = {
    clients: TClient[]
    sections: TSection[]
  }
}
export default IAbout
