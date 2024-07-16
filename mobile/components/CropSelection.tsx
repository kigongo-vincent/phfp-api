import { router } from 'expo-router'
import { FlatList, TouchableOpacity } from 'react-native'

import { useSelector } from 'react-redux'

import { View, Text } from 'tamagui'

import { getTheme } from '~/model/theme'

import { ColorMode, Crop } from '~/utilities/types'

export interface Props {

    crops: Crop[]
}

const CropSelection = (props: Props) => {

    const UI = useSelector(getTheme)

    const theme: ColorMode = UI?.theme

    return (

        <View >

            <Text fontWeight={700} marginVertical={"$4"} lineHeight={36} fontSize={"$8"} color={theme?.text}>Select a crop you want to know more about</Text>

            {

                props?.crops?.length == 0

                    ?

                    <Text color={theme?.text} opacity={.5}>No crops found, try searching for solutions</Text>

                    :

                    <FlatList horizontal data={props?.crops}

                        renderItem={({ item }) =>

                            <TouchableOpacity

                                onPress={() => router.navigate(`extras/articles/${item?.id}-${item?.name}`)}

                                style={{

                                    backgroundColor: item?.id == 1 ? theme?.primary : theme?.paper,

                                    borderRadius: 100,

                                    paddingHorizontal: 30,

                                    paddingVertical: 10,

                                    marginRight: item?.id == 1 ? 7 : 0
                                }}>

                                <Text color={item?.id == 1 ? "aliceblue" : theme?.text} key={item?.id}>{item?.name}</Text>

                            </TouchableOpacity>


                        }


                    />

            }

        </View>

    )
}

export default CropSelection