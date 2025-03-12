import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { Text, View, Image, ScrollView } from "react-native";
import  SearchBar  from "../components/searchBar";

import { useRouter } from "expo-router";

interface Props {
  placeholder: string;
  onPress?: () => void;
}

export default function Index({placeholder, onPress}: Props) {
  const router = useRouter();
  
  return (
    <View className="flex-1 bg-primary ">
      <Image source={images.bg} className="absolute w-full z-0"/>

      <ScrollView className="flex-1 px-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

        <View className="flex-w mt-5">
          <SearchBar
            onPress={() => {
              router.push("/search");}}
              placeholder="Search a movie"
          />
        </View>
        </ScrollView> 
    </View>
  );
}
