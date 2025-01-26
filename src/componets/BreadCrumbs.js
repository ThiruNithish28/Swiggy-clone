import { useLocation, Link } from "react-router";
const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <div className="flex container text-[#FFC300] capitalize px-7 mt-5">
      <Link to="/">home</Link>
      {console.log(pathnames)}
      {pathnames.map((path, index) => 
        index === pathnames.length - 1 ? (
          <p className="text-gray-500">/{path}</p>
        ) : (
          <Link to={`/${path}`}> {console.log(path)}
            /{path}
          </Link>
        )
      )}
    </div>
  );
};
export default BreadCrumbs;
