import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '../components/MovieCard'
import { useRouter } from 'expo-router'
import fetchTangina from '@/services/fetchTangina'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '../components/searchBar'

const search = () => {

  const [searchQuery, setSearchQuery] = useState<string>('')

  const router = useRouter();

  const { data: movies, loading, error, refetch: loadMovies, reseet } = fetchTangina(() => fetchMovies({
    query: searchQuery
  }), false)

  useEffect(() => {

    const setTimeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies()
      } else {
        reseet()
      }
    }, 500)

    return () => clearTimeout(setTimeoutId)
  }, [searchQuery])

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0'
        resizeMode='cover'
      />

      <FlatList data={movies} renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>

            <View className='my-5 '>
              <SearchBar placeholder='tanginamo'
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator size='large' color='#ffff00' className='m-3' />
            )}

            {error && (
              <Text className='text-red-500 px-5 my-3 '>Errror:{error.message}</Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search Results for {""}
                <Text className='text-accent'>
                  {searchQuery}
                </Text>
              </Text>
            )}
          </>
        }

        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'>
                <Text className='text-center text-gray-500'>
                  {searchQuery.trim() ? `No results found for ${searchQuery}` : 'Search for movies'}
                </Text>
            </View>
          ) : null
        }

      />
    </View>
  )
}

export default search 