export interface Crop {

    id: number,

    name: string

}

export interface ColorMode {

    light: string,

    error: string,

    text: string,

    primary: string,

    placeholder: string,

    secondary: string,

    background: string, paper: string

}

export interface Mode {

    light: ColorMode,

    dark: ColorMode
}

export interface ConstantsInterface {

    API_LINK: string,

    mode: Mode

}

export interface Tokens {

    access?: string,

    refresh?: string

}

export interface User {

    id?: number | null,

    is_logged_in?: boolean,

    tokens?: Tokens,

    username?: string,

    contact?: string,

    photo?: string

}

export interface DataInterface {

    user: User

}

export interface NotificationInterface {

    username: string,

    id: number,

    action: string,

    action_taker: number,

    is_viewed: boolean,

    receiver: number,

    user_photo?: string,

    time: string,

}

export interface Article {

    id: number,

    user_photo?: "string",

    username: "string",

    time: string,

    author: number,

    image?: string,

    title: string,

    caption: string,

    org_name: string,

    organization?: string,

    comments: number

}

export interface ThemeInterface {

    theme_name?: string,

    theme: ColorMode

}

export interface CommentInterface {

    id: number,

    username: string,

    user_photo?: string,

    user_role: string,

    body: string,

    time: string,

    author: number,

    post: number

}

export interface ChatBuddy {
    id: 3,

    username: string,

    photo: string,

    last_login: string,

    new_messages_count: number

}

export interface Message {

    id: number,

    body: string,

    time: string,

    chatroom?: number,

    sender?: number,

    viewers?: number[]

}

export interface ChatRoom {

    id: number,

    participants: number[],

    chat_buddy: ChatBuddy,

    messages: Message[]

}

export interface Information {

    crop_name?: string,

    id: number,

    username: string,

    org_name: string,

    equipment_name?: string,

    pest_name?: string,

    user_photo: string,

    title: string,

    description: string,

    instructions: string,

    tutorial: string,

    category: string,

    time: string,

    author: number,

    crop: number,

    organization: number,

    pest?: number,

    equipment?: number

}

export interface Organization {

    id: number,

    name: string,

    address: string,

    contact: string,

    is_active: boolean,

    officer: number,

    username: string,

    user_photo: string

}

export interface OnlineResource {

    position: number,

    title: string,

    snippet: string,

    link: string

}





