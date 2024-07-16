import { View, Text, ScrollView, YStack } from 'tamagui'

import React, { useCallback, useEffect, useState } from 'react'

import { Article, DataInterface, Information, OnlineResource, Organization, ThemeInterface, User } from '~/utilities/types'

import { useSelector } from 'react-redux'

import { getTheme } from '~/model/theme'

import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'

import { StatusBar } from 'expo-status-bar'

import { RefreshControl } from 'react-native-gesture-handler'

import { GET } from '~/utilities/GET'

import { TouchableOpacity } from 'react-native'

import ArticleComponent from '~/components/Article'

import Post from '~/components/Post'

import UserProfile from '~/components/UserProfile'

import { constants } from '~/utilities/constants'

import { getData } from '~/model/data'

import OrganizationComponent from '~/components/Organization'

import TestData from '~/assets/test/data.json'
import OnlineArticle from '~/components/OnlineArticle'

export interface Result {

    articles?: Information[],

    posts?: Article[],

    users?: User[],

    organizations?: Organization[],

    google: OnlineResource[]

}

export interface Category {

    name: string,

    count?: number

}


const Search = () => {


    const data: DataInterface = useSelector(getData)

    const { query } = useLocalSearchParams()

    const UI: ThemeInterface = useSelector(getTheme)

    const [onlineResults, setOnlineResults] = useState<OnlineResource[]>([])

    const [category, setCategory] = useState("Articles")

    const [refresh, setRefresh] = useState(false)

    const [error, setError] = useState(false)

    const [result, setResult] = useState<Result>({})

    const [categories, setCategories] = useState<Category[]>([])


    const getOnlineData = async () => {

        const q = query

        console.log("fetching..")

        try {

            const response = await fetch(`https://google.serper.dev/search`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    'X-API-KEY': '024698f6d1cf2534a4e250a56faf99c8c2824b34',
                },
                body: JSON.stringify({
                    q: `hint: please relate the response to post-harvest techniques or pest control measures for maize or groundnuts, ${q}`
                })
            })

            if (response.status == 200) {
                const data = await response.json()
                setOnlineResults(data?.organic)
            }

            console.log("done")
        }

        catch (err) {

            console.log(err)

        }

    }



    const updatePosts = (postID: number) => {

        setResult(

            {
                ...result, posts: result?.posts?.map(

                    post => post?.id == postID

                        ?

                        { ...post, comments: post?.comments + 1 }

                        :

                        post

                )
            }

        )

    }

    const onRefresh = useCallback(() => {

        GET(setRefresh, setError, setResult, `search/${query}`)

        getOnlineData()

    }, [])


    useFocusEffect(useCallback(() => {

        getOnlineData()

        GET(setRefresh, setError, setResult, `search/${query}`)

    }, []))

    useEffect(() => {

        setCategories(categories.map(category => category?.name == "Results from Google" ? { ...category, count: onlineResults?.length } : category))

    }, [onlineResults])

    useEffect(() => {

        if (result) {

            setCategories([

                {
                    name: "Organizations", count: result?.organizations?.length
                },

                {

                    name: "Posts", count: result?.posts?.length

                },

                {

                    name: "Articles", count: result?.articles?.length

                },

                {

                    name: "User accounts", count: result?.users?.length

                },

                {

                    name: "Results from Google", count: onlineResults?.length

                }

            ])

        }

    }, [result])



    const RenderComponent = (props: Category) => {

        return <TouchableOpacity

            onPress={() => setCategory(props.name)}

            style={{

                display: 'flex', alignItems: 'center', flexDirection: "row",

                backgroundColor: category == props?.name ? UI?.theme?.primary : UI?.theme?.paper, padding: 10, borderRadius: 10,

                marginHorizontal: 5

            }}

        >

            <Text color={UI?.theme?.text}>{props?.name}</Text>

            <View

                marginLeft="$2"

                paddingVertical="$1"

                paddingHorizontal="$2"

                borderRadius={10}

                display='flex'

                alignItems='center'

                justifyContent='center'

                backgroundColor={category == props?.name ? UI?.theme?.text : UI?.theme?.error}>

                <Text color={category == props?.name ? UI?.theme?.primary : UI?.theme?.text}>

                    {props?.count}

                </Text>

            </View>

        </TouchableOpacity>

    }

    return (

        <ScrollView

            refreshControl={<RefreshControl

                colors={[UI?.theme?.text]}

                progressBackgroundColor={UI?.theme?.light}

                refreshing={refresh}

                onRefresh={onRefresh

                } />}

            backgroundColor={UI?.theme?.background} padding="$3">

            <StatusBar style='light' />

            <Stack.Screen

                options={{

                    animation: "fade_from_bottom",

                    title: "Search results",

                    headerStyle: {

                        backgroundColor: UI?.theme?.paper

                    },

                    headerTintColor: UI?.theme?.text

                }}

            />

            <Text color={UI?.theme?.text} marginBottom="$4" backgroundColor={UI?.theme?.paper} padding="$4" borderRadius={10}>

                you searched for

                "{query}"

            </Text>

            {/* categories  */}

            <View height={50}>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                    {

                        !refresh && categories?.map(category => <RenderComponent key={category?.name} name={category?.name} count={category?.count} />)

                    }

                </ScrollView>

            </View>

            {/* content  */}


            {

                !refresh && category

                &&


                <YStack marginVertical="$5" >

                    {

                        category == "Articles"

                            ?

                            result?.articles?.length == 0

                                ?

                                <Text fontWeight={500} fontSize={24} textAlign='center' color={UI?.theme?.text}>No results found</Text>

                                :

                                result.articles?.map(article => <ArticleComponent isSearcResult={true} article={article} key={article?.id} />)

                            :

                            category == "Posts"

                                ?

                                result?.posts?.length == 0

                                    ?

                                    <Text fontWeight={500} fontSize={24} textAlign='center' color={UI?.theme?.text}>No results found</Text>

                                    :

                                    result.posts?.map(post => <Post updatePosts={updatePosts} post={post} key={post?.id} />)

                                :

                                category == "User accounts"

                                    ?

                                    result?.users?.length == 0

                                        ?

                                        <Text fontWeight={500} fontSize={24} textAlign='center' color={UI?.theme?.text}>No results found</Text>

                                        :

                                        result.users?.map(user => <View marginBottom="$2" backgroundColor={UI?.theme?.paper} padding='$3' borderRadius={10} key={user?.id} >

                                            <UserProfile username={user?.username} id={user?.id} photo={`${constants?.API_LINK}${user?.photo}`} />

                                        </View>)

                                    :

                                    category == "Organizations"

                                        ?

                                        result?.organizations?.length == 0

                                            ?

                                            <Text fontWeight={500} fontSize={24} textAlign='center' color={UI?.theme?.text}>No results found</Text>

                                            :

                                            result.organizations?.map(organization => <OrganizationComponent organization={organization} key={organization?.id} />)

                                        :

                                        <>

                                            {

                                                onlineResults?.length == 0

                                                    ?

                                                    <Text fontWeight={500} fontSize={24} textAlign='center' color={UI?.theme?.text}>No results found</Text>

                                                    :

                                                    <YStack marginBottom='$5'>

                                                        <Text marginVertical="$4" color={UI?.theme?.text}>Online Articles</Text>

                                                        {onlineResults?.map(article => <OnlineArticle article={article} key={article?.position} />)}

                                                    </YStack>

                                            }




                                        </>

                    }


                </YStack>


            }


        </ScrollView>

    )
}

export default Search