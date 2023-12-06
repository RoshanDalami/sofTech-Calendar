"use client";
import { useState, useLayoutEffect } from "react";
// import { Dialog } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  CalendarDaysIcon,
  BriefcaseIcon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
// import { CheckIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const features = [
  {
    name: "Nepali Calendar",
    description:
      "An easy-to-use Nepali calendar for your daily needs, helping you stay organized and informed about important dates and festivals effortlessly.",
    icon: CalendarIcon,
  },
  {
    name: "Create Your Event Accordingly",
    description:
      "Effortlessly organize and coordinate events with our user-friendly Event Management System, simplifying tasks and ensuring seamless execution for memorable experiences.",
    icon: CalendarDaysIcon,
  },
  {
    name: "Get Yearly , Monthly and Weekly Reports",
    description:
      "Generate comprehensive yearly, monthly, and weekly reports effortlessly to gain insights, track progress, and stay informed with our intuitive reporting system. ",
    icon: ArrowPathIcon,
  },
  {
    name: "Track Your Task Progress",
    description:
      "Easily monitor and track your task progress with our intuitive system, ensuring efficiency and clarity in your workflow.",
    icon: BriefcaseIcon,
  },
];

// const tiers = [
//   {
//     name: "Freelancer",
//     id: "tier-freelancer",
//     href: "#",
//     priceMonthly: "$24",
//     description: "The essentials to provide your best work for clients.",
//     features: [
//       "5 products",
//       "Up to 1,000 subscribers",
//       "Basic analytics",
//       "48-hour support response time",
//     ],
//     mostPopular: false,
//   },
//   {
//     name: "Startup",
//     id: "tier-startup",
//     href: "#",
//     priceMonthly: "$32",
//     description: "A plan that scales with your rapidly growing business.",
//     features: [
//       "25 products",
//       "Up to 10,000 subscribers",
//       "Advanced analytics",
//       "24-hour support response time",
//       "Marketing automations",
//     ],
//     mostPopular: true,
//   },
//   {
//     name: "Enterprise",
//     id: "tier-enterprise",
//     href: "#",
//     priceMonthly: "$48",
//     description: "Dedicated support and infrastructure for your company.",
//     features: [
//       "Unlimited products",
//       "Unlimited subscribers",
//       "Advanced analytics",
//       "1-hour, dedicated support response time",
//       "Marketing automations",
//     ],
//     mostPopular: false,
//   },
// ];
const faqs = [
  {
    id: 1,
    question: "What is an Event Management System (EMS)?",
    answer:
      "An Event Management System (EMS) is a software solution designed to assist in planning, organizing, and executing events. It typically includes features such as scheduling, registration, attendee management, and other tools to streamline the entire event management process.",
  },
  {
    id: 2,
    question: "How can an EMS benefit event organizers?",
    answer:
      "An EMS simplifies the event planning process by providing tools for tasks such as online registration, venue management, communication, and analytics. It helps organizers save time, reduce manual efforts, and enhance overall efficiency in executing successful events.",
  },
  {
    id: 3,
    question: "Can I use an EMS for both small and large events?",
    answer:
      "Yes, many EMS platforms are scalable and can be customized to suit events of varying sizes. Whether you're planning a small seminar or a large conference, an EMS can adapt to your requirements.",
  },
  // More questions...
];
const footerNavigation = {
  solutions: [
    { name: "Hosting", href: "#" },
    { name: "Data Services", href: "#" },
    { name: "Uptime Monitoring", href: "#" },
    { name: "Enterprise Services", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Reference", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

function CompanyLogo() {
  return (
    <Link to="/" className="-m-1.5 flex items-center space-x-2 p-1.5">
      <div className="flex text-3xl font-bold text-[#2245D7]">Softech </div>
      {/* <div className="rounded bg-indigo-100  px-2 py-1 text-xs font-semibold text-[#2245D7] shadow-sm hover:bg-indigo-200">
        Beta
      </div> */}
    </Link>
  );
}

export default function Landing() {
  const [, setScrollPosition] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useLayoutEffect(() => {
    function updateScrollPosition() {
      setScrollPosition(window.pageYOffset);
    }
    // Add an event listener to update the scroll position on scroll
    window.addEventListener("scroll", updateScrollPosition);

    // Call the update function initially to get the initial scroll position
    updateScrollPosition();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, []);

  const handleFAQ = () => {
    window.scrollTo({
      top: 2900,
      behavior: "smooth",
    });
  };
  // const handlePricing = () => {
  //   window.scrollTo({
  //     top: 3100,
  //     behavior: "smooth",
  //   });
  // };
  const handleFeatures = () => {
    window.scrollTo({
      top: 1600,
      behavior: "smooth",
    });
  };

  const handleHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigation = [
    { name: "Home", href: "#", onclick: handleHome },
    { name: "Features", href: "#", onclick: handleFeatures },
    // { name: "Pricing", href: "#", onclick: handlePricing },
    { name: "FAQs", href: "#", onclick: handleFAQ },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 font-sans">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 items-center ">
            <CompanyLogo />
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:items-center  lg:gap-x-12">
            {navigation.map((item) => (
              <div
                key={item.name}
                // href={item.href}
                className="cursor-pointer text-sm font-semibold leading-6 text-gray-900"
                onClick={item.onclick}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="hidden lg:items-center gap-4 lg:flex lg:flex-1 lg:justify-end  ">
            {/* <Link
              to="/"
              className="text-sm  rounded-md px-3.5 py-2.5  font-semibold leading-6 text-[#2245D7] "
            >
              For Job Poster <span aria-hidden="true"></span>
            </Link> */}
<Link to={'/login'}>
            <button className="text-sm font-semibold leading-6 text-gray-900">
              Sign in <span aria-hidden="true">&rarr;</span>
            </button>
</Link>
            {/* ) : (
              <Link
              to="/sign-in"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </Link>
            )} */}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <CompanyLogo />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                 
                <Link to={'/login'} >
                  <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Sign in
                  </button>
                </Link>
                  {/* ) : (
                    <Link
                      to="/sign-in"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Sign in
                    </Link>
                  )} */}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-14">
          <img src="https://web-static.wrike.com/tp/storage/uploads/4bbe8695-1639-4af5-8a0e-516061e33c8b/rebrand-hero-illustration-homepage-screenshots-white-desktop.svg" alt="" className="absolute -top-8" />
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-6xl text-center ">
                <h1 className="mx-auto bg-gradient-to-r  text-indigo-600   text-4xl font-bold leading-10 tracking-tight  sm:text-7xl ">
                  One platform to streamline all workflows
                </h1>
                <p className="mx-auto  mt-6  text-md  max-w-3xl text-lg leading-8 text-gray-600">
                  Simplify event planning with our streamlined Event Management
                  System.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-4">
                  <Link
                    to="/login"
                    className="flex rounded-md bg-[#2245D7]  px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1e3cb8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3cb8] "
                  >
                    Get started{" "}
                    <span className="ml-2 hidden md:block ">&rarr;</span>
                  </Link>
                  <Link
                    to="#"
                    className="flex items-center gap-2 rounded-md bg-gray-300  px-8 py-2.5 text-sm font-semibold text-black/50 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400  "
                  >
                    Learn more{" "}
                    <span aria-hidden="true">
                      {" "}
                      <QuestionMarkCircleIcon className="hidden h-5 w-5 md:block" />{" "}
                    </span>
                  </Link>
                </div>
              </div>
              <div className="mt-16 flow-root sm:mt-36">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <img
                    src="/calendar.png"
                    width={2432}
                    height={1442}
                    alt="App screenshot"
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>

        {/* Logo cloud */}

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
              alt="Reform"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
              alt="Tuple"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
              alt="SavvyCal"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
              alt="Statamic"
              width={158}
              height={48}
            />
          </div>
          {/* <div className="mt-16 flex justify-center">
            <p className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-900/10 hover:ring-gray-900/20">
              <span className="hidden md:inline">
                Transistor saves up to $40,000 per year, per employee by working
                with us.
              </span>
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" /> Read
                our case study <span aria-hidden="true">&rarr;</span>
              </a>
            </p>
          </div> */}
        </div>

        {/* Feature section */}
        <div className="mx-auto mt-32 max-w-7xl  px-6 sm:mt-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Manage your events
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to start managing your events
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              "Discover a complete solution designed to effortlessly kickstart
              your event management journey, offering all the essential tools
              you need."
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2245D7] ">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Testimonial section */}
        <div className="mx-auto mt-32 max-w-7xl sm:mt-32 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gray-900 px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
            <img
              className="absolute inset-0 h-full w-full object-cover brightness-150 saturate-0"
              src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
              width={1216}
              height={760}
              alt=""
            />
            <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
            <div
              className="absolute -left-80 -top-56 transform-gpu blur-3xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div
              className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div className="relative mx-auto max-w-2xl lg:mx-0">
              <img
                className="h-12 w-auto"
                src="https://tailwindui.com/img/logos/workcation-logo-white.svg"
                width={240}
                height={48}
                alt=""
              />
              <figure>
                <blockquote className="mt-6 text-lg font-semibold text-white sm:text-xl sm:leading-8">
                  <p>
                    “ Experience seamless event coordination with our Event
                    Management System. From intuitive planning tools to
                    real-time updates, our system simplifies the complexities of
                    event organization, ensuring smooth execution and memorable
                    experiences.”
                  </p>
                </blockquote>
                <figcaption className="mt-6 text-base text-white">
                  <div className="font-semibold">Judith Black</div>
                  <div className="mt-1">CEO of Tuple</div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Pricing section */}
        {/* <div className="py-24 sm:pt-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Pricing
              </h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Pricing plans for teams of&nbsp;all&nbsp;sizes
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
              Unlock Your Recruitment Potential with Budget-Friendly Plans and
              Endless Opportunities.
            </p>
            <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {tiers.map((tier, tierIdx) => (
                <div
                  key={tier.id}
                  className={classNames(
                    tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                    tierIdx === 0 ? "lg:rounded-r-none" : "",
                    tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                    "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between gap-x-4">
                      <h3
                        id={tier.id}
                        className={classNames(
                          tier.mostPopular ? "text-[#2245D7]" : "text-gray-900",
                          "text-lg font-semibold leading-8"
                        )}
                      >
                        {tier.name}
                      </h3>
                      {tier.mostPopular ? (
                        <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-[#2245D7]">
                          Most popular
                        </p>
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                      {tier.description}
                    </p>
                    <p className="mt-6 flex items-baseline gap-x-1">
                      <span className="text-4xl font-bold tracking-tight text-gray-900">
                        {tier.priceMonthly}
                      </span>
                      <span className="text-sm font-semibold leading-6 text-gray-600">
                        /month
                      </span>
                    </p>
                    <ul
                      role="list"
                      className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            className="h-6 w-5 flex-none text-[#2245D7]"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? "bg-[#2245D7] text-white shadow-sm hover:bg-[#1e3cb8] "
                        : "text-[#2245D7] ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                      "mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3cb8] "
                    )}
                  >
                    Buy plan
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* FAQs */}
        <div className="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32 my-10 ">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"
              >
                <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">
                  {faq.question}
                </dt>
                <dd className="mt-4 lg:col-span-7 lg:mt-0">
                  <p className="text-base leading-7 text-gray-600">
                    {faq.answer}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTA section */}
        <div className="relative -z-10  mt-16 px-6 md:mt-16  lg:px-8  ">
          <div
            className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 transform-gpu justify-center overflow-hidden blur-3xl sm:bottom-0 sm:right-[calc(50%-6rem)] sm:top-auto sm:translate-y-0 sm:transform-gpu sm:justify-end"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-25"
              style={{
                clipPath:
                  "polygon(73.6% 48.6%, 91.7% 88.5%, 100% 53.9%, 97.4% 18.1%, 92.5% 15.4%, 75.7% 36.3%, 55.3% 52.8%, 46.5% 50.9%, 45% 37.4%, 50.3% 13.1%, 21.3% 36.2%, 0.1% 0.1%, 5.4% 49.1%, 21.4% 36.4%, 58.9% 100%, 73.6% 48.6%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-3xl  text-center   font-bold tracking-tight text-gray-900 sm:text-4xl">
              Optimize Your Event Managing process !
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              {/* Ease your job search process and discover a range of opportunities
              tailored to your preferences on Startup Hire. */}
              Ease your event planning and managing process with Softech Event management system.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/login"
                className="rounded-md bg-[#2245D7] px-16 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1e3cb8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e3cb8]"
              >
                Get started
              </Link>
              {/* <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a> */}
            </div>
          </div>
          <div
            className="absolute left-1/2 right-0 top-full -z-10 hidden -translate-y-1/2 transform-gpu overflow-hidden blur-3xl sm:block"
            aria-hidden="true"
          >
            <div
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="mx-auto  max-w-7xl   px-6 lg:px-8">
        <footer
          aria-labelledby="footer-heading"
          className="relative mt-12 border-t border-gray-900/10 sm:mt-32    sm:py-12"
        >
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mt-8 xl:grid xl:grid-cols-3 xl:gap-8   ">
            <CompanyLogo />
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    Solutions
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.solutions.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    Support
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.support.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    Company
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    Legal
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
