'use client'

import Select from "@/components/form/Select";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  budget: string;
}

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K"
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K"
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K"
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K"
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Front-end Developer",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K"
  },
];

  const status = [
                              { value: "Delivered", label: "تم التسليم" },
                              { value: "Pending", label: "قيد الانتظار" },
                              { value: "Active", label: "نشط" },
                              { value: "Cancel", label: "ملغي" }
                            ]

export default function Lawyers() {

    const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        قائمة الممارسين الصحيين
                    </h3>
                </div>

                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700
                    shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]
                    dark:hover:text-gray-200">
                        <svg className="stroke-current fill-white dark:fill-gray-800" width="20" height="20" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.29004 5.90393H17.7067" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.7075 14.0961H2.29085" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172
                            7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z" fill="" stroke="" strokeWidth="1.5" />
                            <path d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883
                            15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z" fill="" stroke="" strokeWidth="1.5" />
                        </svg>
                    تصنيف حسب
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700
                    shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]
                    dark:hover:text-gray-200">
                        الكل
                    </button>
                </div>
            </div>
            <div className="max-w-full overflow-x-auto">
                <Table>
                {/* Table Header */}
                <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                    <TableRow>
                    <TableCell
                        isHeader
                        className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                        اسم الممارس الصحي
                    </TableCell>
                    <TableCell
                        isHeader
                        className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                        رقم الترخيص المهني
                    </TableCell>
                    <TableCell
                        isHeader
                        className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                       التخصص الطبي
                    </TableCell>
                    <TableCell
                        isHeader
                        className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                       اسم جهة العمل
                    </TableCell>
                    <TableCell
                        isHeader
                        className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                        حالة الحساب
                    </TableCell>
                    </TableRow>
                </TableHeader>

                {/* Table Body */}

                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {tableData.map((product) => (
                    <TableRow key={product.id} className="">
                        <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                            <div>
                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                {product.projectName}
                            </p>
                            <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                                {product.budget}
                            </span>
                            </div>
                        </div>
                        </TableCell>
                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {product.budget}
                        </TableCell>
                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {product.budget}
                        </TableCell>
                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {product.budget}
                        </TableCell>
                        <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <Select
                            options={status}
                            onChange={handleSelectChange}
                          />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
        </div>
    );
}
