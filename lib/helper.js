export function capitalizeString(str) {
  return str?.split(' ')?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}


export const navbarlinks = [

  {
    name: "Home",
    href: "/",
  },
  {
    name: "Dictionary",
    href: "/dictionary",
  },
  {
    name: "Word of the Day",
    href: "/wordofday",
  },
  {
    name: "Learn",
    href: "/learn"
  },
  {
    name: "Words",
    href: "/words"
  }
]

export const UserData = {
  user: {
    name: "Rambler",
    email: "Rambler@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export const Alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
