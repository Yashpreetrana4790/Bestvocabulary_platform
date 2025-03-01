import MainSidebar from "@/components/sidebar/sidebar";


export default function DictionaryLayout({ children }) {
  return (
    <>
      <MainSidebar />
      {children}
    </>

  );
}
