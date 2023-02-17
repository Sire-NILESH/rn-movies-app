// import { useEffect, useState } from "react";
// import useAuth from '../hooks/useAuth'
import { View, Text, Image } from "react-native";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Header() {
  const navigation = useNavigation();

  const headerLinksItems = [
    { title: "Movies", screenName: "Movies" },
    { title: "TV Shows", screenName: "TV Shows" },
    { title: "Favorites", screenName: "TV Shows" },
  ];

  function renderHeaderLink(title: string, screenName: string) {
    return (
      <View
        key={title + String(Math.random() * 10)}
        className="flex-1 py-1"
        // className="flex-1 bg-stone-200 ml-2 rounded-md py-1"
      >
        <Pressable
          onPress={() => {
            // @ts-ignore
            navigation.navigate(screenName);
          }}
        >
          <Text className="text-stone-100 text text-center font-semibold px-1">
            {title}
          </Text>
        </Pressable>
      </View>
    );
  }

  //   const [isScrolled, setIsScrolled] = useState(false);
  //   const { logout } = useAuth()
  //   const router = useRouter()

  // upon scroll change the color of the header
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       if (window.scrollY > 0) {
  //         setIsScrolled(true)
  //       } else {
  //         setIsScrolled(false)
  //       }
  //     }

  //     window.addEventListener('scroll', handleScroll)

  //       // cleanup function
  //     return () => {
  //       window.removeEventListener('scroll', handleScroll)
  //     }
  //   }, [])

  return (
    <View className="flex-row justify-between items-center w-[100%] h-[80]  px-4 ">
      <View className="flex-4">
        <Text className="font-semibold text-3xl text-yellow-50">
          🍿 Popcorn
        </Text>
      </View>

      <View className="w-[62%] flex-row items-center justify-between ml-2">
        {/* <SearchIcon className="hidden h-6 w-6 sm:inline" /> */}
        {/* <Text className="hidden">Kids</Text> */}
        {/* <BellIcon className="h-6 w-6" /> */}
        {/* <Link href="/account"> */}
        {/* <Image
          source={require("../../assets/images/profile/user.png")}
          className="w-10 h-10 object-contain rounded-md"
        /> */}

        {/* </Link> */}

        {headerLinksItems.map((link) =>
          renderHeaderLink(link.title, link.screenName)
        )}
      </View>
    </View>
  );
}

export default Header;
