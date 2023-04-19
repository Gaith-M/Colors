import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-700 to-amber-100
    flex items-center justify-center">
        <div className="text-center">
            <p className="text-[64px] text-white font-bold">{error.status}</p>
            <p className="text-[18px]">
                {error.statusText || error.message}
            </p>
        </div>
    </div>
  );
};

export default ErrorPage;
