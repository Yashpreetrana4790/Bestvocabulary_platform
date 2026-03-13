export default function WordLayout({ children }) {
  return (
    <>
      <SidebarProvider>

        <WordDetailSidebar />
        <div className="w-full">
          {children}
        </div>
      </SidebarProvider>
    </>

  );
}
