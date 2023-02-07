// import { BellIcon, SearchIcon } from '@heroicons/react/solid'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
// import useAuth from '../hooks/useAuth'
// import BasicMenu from './BasicMenu'

// function Header() {
//   const [isScrolled, setIsScrolled] = useState(false)
//   const { logout } = useAuth()
//   const router = useRouter()

//   // upon scroll change the color of the header
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 0) {
//         setIsScrolled(true)
//       } else {
//         setIsScrolled(false)
//       }
//     }

//     window.addEventListener('scroll', handleScroll)

//     //   cleanup function
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   return (
//     <header className={`${isScrolled && 'bg-[#141414]'}`}>
//       <div>
//         <div className="flex items-center space-x-2 md:space-x-10">
//           <img
//             src="https://rb.gy/ulxxee"
//             width={100}
//             height={100}
//             className="cursor-pointer object-contain"
//             onClick={() => router.push('/')}
//           />

//           <BasicMenu />

//           <ul className="hidden space-x-4 md:flex">
//             <li className="headerLink" onClick={() => router.push('/')}>
//               Home
//             </li>
//             <li className="headerLink" onClick={() => router.push('/tv')}>
//               TV shows
//             </li>
//             <li className="headerLink" onClick={() => router.push('/movie')}>
//               Movies
//             </li>
//             <li className="headerLink" onClick={() => router.push('/')}>
//               New & Popular
//             </li>
//             <li className="headerLink" onClick={() => router.push('/mylist')}>
//               My List
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="flex items-center space-x-4 text-sm font-light">
//         <SearchIcon className="hidden h-6 w-6 sm:inline" />
//         <p className="hidden lg:inline">Kids</p>
//         <BellIcon className="h-6 w-6" />
//         {/* <Link href="/account"> */}
//         <img
//           src="https://rb.gy/g1pwyx"
//           onClick={logout}
//           alt=""
//           className="cursor-pointer rounded"
//         />
//         {/* </Link> */}
//       </div>
//     </header>
//   )
// }

// export default Header
