import "./Loading.css";

const LoadingContacts = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="loader"></div>
        <h4 className="text-lg font-semibold mt-2">Loading...</h4>
    </div>
  )
}

export default LoadingContacts