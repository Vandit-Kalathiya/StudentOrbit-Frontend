import Sidebar from './Sidebar'

function Dashboard() {
  return (
    <section id="hero"
    className="w-full min-h-[100vh] relative items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-10 text-black flex justify-between overflow-x-hidden"
        style={{
          background: "rgba(0, 0, 0, 0.01)",
        }}
      >
          <Sidebar />
      </div>
    </section>
  )
}

export default Dashboard
