import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import useUser from "../helper/useUser";
// import InstallPWA from "./InstallBtn";
// import UserSettings from "./UserSettings";
import { classNames } from "../helper/utils";
// import Logo from "../../public/logo.png";
import { useEffect, useState } from "react";
import NepaliDate from "nepali-date-converter";


function englishToNepaliDigitConverter(englishText:string) {
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

  // Replace each English digit with its Nepali equivalent
  for (let i = 0; i < englishDigits.length; i++) {
    const regex = new RegExp(englishDigits[i], 'g');
    englishText = englishText.replace(regex, nepaliDigits[i]);
  }

  return englishText;
}



export default function Navbar() {
  // find current route
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Calendar", href: "/:pageType?/:BSYear?/:BSMonth?" },
    { name: "Events", href: "/events" },
    // { name: "navbar.Date_Converter", href: "/converter" },
    // { name: "navbar.About", href: "/about" },
  ];
  const location = useLocation();

  // const isCalendarPage = location.pathname.split("/")[1] === "calendar";
  // console.log(isCalendarPage,"variable");

  const { t } = useTranslation();
  const [time, setTime] = useState(new Date());
  const [date , setDate] = useState(new NepaliDate())

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
    setDate(new NepaliDate())
  }, []);

  const nepaliDays = ['आइतबार','सोमबार','मंगलबार','बुधवार','विहीवार','शुक्रबार','शनिवार']
  // const englishDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  // const { data, status } = useUser();
  return (
    <div className=" ">
      <Disclosure
        as="nav"
        className="flex justify-between border-b-2 border-black shadow-lg px-2 border-r-2 border-l-2 bg-blue-500 border-transparent items-center  shadow-current  "
      >
        {({ open }) => (
          <div className="">
            <div className="px-2  sm:px-6 lg:px-8 ">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:text-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className=" flex items-center justify-center">
                    <Link to={"/"}>
                      <img src={'/logo.png'} alt="logo" className=" h-6 rounded-md " />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex items-center space-x-4">
                      {navigation.map((item) => {
                       
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.href === location.pathname
                                ? "bg-gray-300 "
                                :  "text-gray-900",
                              "rounded-md px-3 py-2 text-lg font-medium"
                            )}
                          >
                            {t(item.name)}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-lg  absolute right-4 top-3">
              <p>

              Time: { englishToNepaliDigitConverter( time.toLocaleTimeString())}
              </p>
              <div>

              Date: {`${ englishToNepaliDigitConverter( JSON.stringify( date.getBS().year))}/${ englishToNepaliDigitConverter(JSON.stringify(date.getBS().month)) }/${ englishToNepaliDigitConverter(JSON.stringify(date.getBS().date)) }`} {nepaliDays[date.getBS().day!]}
              </div>
            </div>
            

            <Disclosure.Panel className="sm:hidden">
              <div className=" px-2 pb-3 pt-2 ">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="div"
                    aria-current={
                      item.href === location.pathname ? "page" : undefined
                    }
                  >
                    <Link to={item.href}>{t(item.name)}</Link>
                  </Disclosure.Button>
                ))}
                {/* <LanguageChangeDropDown /> */}
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
