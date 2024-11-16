namespace IHome {
  export interface IState {
    html: string
    image_path: string | null
  }
  export interface IButtonHome {
    id: string | null
    buttonTextHome: string | null
  }
}
export default IHome
