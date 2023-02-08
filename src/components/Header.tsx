// import { useEffect, useState } from "react";
// import useAuth from '../hooks/useAuth'
import { View, Text, Image } from "react-native";

function Header() {
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
    //  <View className={`${isScrolled && "bg-[#141414]"}`}>
    <View className="flex-row justify-between items-start w-[100%] h-[100] pt-4 px-4 z-30 ">
      <View className="">
        <Text className="font-semibold text-3xl text-yellow-50">
          🍿 Popcorn
        </Text>

        {/* <ul className="hidden space-x-4 md:flex">
            <li className="headerLink" onClick={() => router.push('/')}>
              Home
            </li>
            <li className="headerLink" onClick={() => router.push('/tv')}>
              TV shows
            </li>
            <li className="headerLink" onClick={() => router.push('/movie')}>
              Movies
            </li>
            <li className="headerLink" onClick={() => router.push('/')}>
              New & Popular
            </li>
            <li className="headerLink" onClick={() => router.push('/mylist')}>
              My List
            </li>
          </ul> */}
      </View>

      <View className="flex items-center space-x-4 text-sm font-light">
        {/* <SearchIcon className="hidden h-6 w-6 sm:inline" /> */}
        <Text className="hidden">Kids</Text>
        {/* <BellIcon className="h-6 w-6" /> */}
        {/* <Link href="/account"> */}
        <Image
          source={require("../../assets/images/profile/user.png")}
          className="w-10 h-10 object-contain rounded-md"
        />
        {/* </Link> */}
      </View>
    </View>
  );
}

export default Header;
