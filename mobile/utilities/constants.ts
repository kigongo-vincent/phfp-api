import Constants from "expo-constants";

import { ConstantsInterface } from './types'


export const constants: ConstantsInterface = {

    API_LINK: `http://${Constants?.expoConfig?.hostUri?.split(":")[0]}:8888/`,

    mode: {

        light: {

            light: "#F5F5F5",

            text: "#0F1018",

            primary: "#1FCF6B",

            secondary: "#D79B28",

            background: "#FAFBFD",

            paper: "#FFFFFF",

            placeholder: "grey",

            error: "#F22949",


        },

        dark: {

            light: "#27323E",

            error: "#F22949",

            text: "aliceblue",

            primary: "#298BD5",

            secondary: "#1C252F",

            background: "#131C27",

            paper: "#1F2A36",

            placeholder: "#FFFFFf"

        }

    }

}