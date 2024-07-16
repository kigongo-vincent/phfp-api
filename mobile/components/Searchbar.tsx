import { Ionicons } from "@expo/vector-icons"

import { router } from "expo-router"

import { useState } from "react"

import { TouchableOpacity } from "react-native-gesture-handler"

import { useSelector } from "react-redux"

import { Input, XStack } from "tamagui"

import { getTheme } from "~/model/theme"

import { ColorMode } from "~/utilities/types"

export interface Props {

    query: string,

    setQuery: any

}



const Searchbar = (props: Props) => {

    const [query, setQuery] = useState("")

    const UI = useSelector(getTheme)

    const theme: ColorMode = UI?.theme

    return (
        <XStack alignItems="center" marginTop="$5" justifyContent="center" height={"$5"} borderRadius={"$2"} backgroundColor={theme?.paper}>

            <TouchableOpacity

                style={{
                    height: "65%", width: 45,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                <Ionicons name="search" size={22} color={"aliceblue"} />

            </TouchableOpacity>

            <Input
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={() => { router.navigate(`extras/search/${query ? `${query}` : "all"}`); setQuery("") }}
                borderWidth={0}
                flex={1}
                marginRight={5}
                placeholderTextColor={theme?.placeholder}
                padding={0}
                placeholder="what are you looking for"
                backgroundColor={theme?.paper} />

        </XStack>
    )
}

export default Searchbar