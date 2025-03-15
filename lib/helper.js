'use client'
import { Calculator, Book, Code, Globe, BriefcaseBusiness, PersonStanding, Scale } from "lucide-react";
import qs from "query-string";



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
]

export const UserData = {
  user: {
    name: "Rambler",
    email: "Rambler@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export const Alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


const IconsReturn = (category) => {


  const icons = {
    maths: <Calculator />,
    coding: <Code />,
    world: <Globe />,
    occupation: <BriefcaseBusiness />,
    law: <Scale />,
    anatomy: <PersonStanding />,
  };

  return icons[category] || null;
};


export default IconsReturn



export const formUrlQuery = ({ params, key, value }) => {

  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  },
    { skipNull: true });
}


export const removeKeysFromQuery = ({ params, KeysToRemove }) => {
  const currentUrl = qs.parse(params);
  for (const key of KeysToRemove) {
    delete currentUrl[key];
  }

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  },
    { skipNull: true });
}