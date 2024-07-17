import { RiBook2Line, RiGlobeLine, RiBriefcaseLine, RiEyeCloseLine, RiLaptopLine, RiBalanceScaleLine, RiHeartLine, RiPlaneLine, RiTreeLine, RiPaintBrushLine } from 'react-icons/ri';


export const sidebarLinks = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/words",
    label: "Words",
  },
  {
    route: "/trendingwords",
    label: "Trending Words",
  },
  {
    route: "/askai",
    label: "Ask AI",
  }
];



export const filterItems = [
  { label: 'Basic Vocabulary', icon: 'pi pi-book', value: 'basic' },
  { label: 'Advanced Vocabulary', icon: 'pi pi-globe', value: 'advanced' },
  { label: 'Business Vocabulary', icon: 'pi pi-briefcase', value: 'business' },
  { label: 'Academic Vocabulary', icon: 'pi pi-eye-slash', value: 'academic' },
  { label: 'Technical Vocabulary', icon: 'pi pi-laptop', value: 'technical' },
  { label: 'Science Vocabulary', icon: <RiBalanceScaleLine />, value: 'science' },
  { label: 'Health Vocabulary', icon: <RiHeartLine />, value: 'health' },
  { label: 'Travel Vocabulary', icon: <RiPlaneLine />, value: 'travel' },
  { label: 'Environment Vocabulary', icon: <RiTreeLine />, value: 'environment' },
  { label: 'Arts Vocabulary', icon: <RiPaintBrushLine />, value: 'arts' },
];