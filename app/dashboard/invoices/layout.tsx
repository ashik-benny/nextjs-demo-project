 
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
        </div>
        <div style={{backgroundColor:"gray"}}>{children}</div>
      </div>
    );
  }