"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { logout } from "../../services/auth";
import { Calendar, ChevronDown, LayoutGrid, Table, User } from 'lucide-react'

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <LayoutGrid />,
    name: "الرئيسية",
    path: "/admin"
  },
  {
    icon: <Calendar />,
    name: "جدولة الدعاوى",
    path: "/admin/calendar",
  },
  {
    name: "المحامين",
    icon: <Table />,
    path: "/admin/lawyers"
  },
  {
    name: "الممارسين الصحيين",
    icon: <Table />,
    path: "/admin/practitioners"
  },
  {
    name: "الإشتراكات",
    icon: <Table />,
    path: "/admin/subscriptions"
  },
  {
    icon: <User />,
    name: "الإعدادات",
    path: "/admin/profile"
  }
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen } = useSidebar();
  const pathname = usePathname();
  const route = useRouter();

  async function handleSignout() {
    await logout()
    route.push('/signin')
  }

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col place-content-between gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button onClick={() => handleSubmenuToggle(index, menuType)} className={`menu-item group  ${openSubmenu?.type === menuType && openSubmenu?.index === index
              ? "menu-item-active" : "menu-item-inactive" } cursor-pointer ${ !isExpanded ? "lg:justify-center" : "lg:justify-start" }`}>
              <span className={` ${ openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-icon-active" : "menu-item-icon-inactive" }`}>
                {nav.icon}
              </span>
              {(isExpanded || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isMobileOpen) && (
                <ChevronDown className={`ml-auto w-5 h-5 transition-transform duration-200  ${ openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "rotate-180 text-brand-500" : ""}`} />
              )}
            </button>
            ) : (
            nav.path && (
              <Link href={nav.path} className={`menu-item group ${ isActive(nav.path) ? "menu-item-active" : "menu-item-inactive" }`}>
                <span className={`${ isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive" }`}>
                  {nav.icon}
                </span>
                {(isExpanded || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isMobileOpen) && (
            <div ref={(el) => { subMenuRefs.current[`${menuType}-${index}`] = el; }}
              className="overflow-hidden transition-all duration-300" style={{ height: openSubmenu?.type === menuType && openSubmenu?.index === index
                ? `${subMenuHeight[`${menuType}-${index}`]}px` : "0px"}}>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
  }, [pathname,isActive]);
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 right-0 bg-sky-950 dark:bg-gray-900 dark:border-gray-900 text-gray-900 h-screen transition-all
        duration-300 ease-in-out z-50 border-r border-gray-200 max-sm:-right-48 ${isExpanded || isMobileOpen ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "-translate-x-44" : "-translate-x-full"} lg:translate-x-0`}>
      <div className={`py-8 flex justify-center`}>
        <Image src="/images/logo/logo-white-blue.png" alt="Logo" width={124} height={162} />
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6 flex-grow">
          <div className="flex flex-col gap-4 h-full">
            <div className="flex-grow">{renderMenuItems(navItems, "main")}</div>
            <div className="mt-auto pb-6">
              <button onClick={handleSignout} className="btn no-underline gap-3 px-3 py-2 font-medium text-white rounded-lg group text-theme-sm dark:text-gray-400
              bg-transparent border-none shadow-none">
                <svg className="fill-white dark:group-hover:fill-gray-300" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396
                  13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007
                  3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007
                  4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144
                  3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116
                  12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864
                  7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z"
                  fill=""/>
                </svg>
                { isExpanded || isMobileOpen ? 'تسجيل الخروج' : ''}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;