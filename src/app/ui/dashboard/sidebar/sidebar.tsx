"use client";

import {
  MdAnalytics,
  MdAttachMoney,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdOutlineSettings,
  MdPeople,
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdWork,
  MdOutlineStorefront,
  MdOutlineMyLocation,
  MdShareLocation,
  MdBusiness,
  MdKey,
} from "react-icons/md";
import styles from "./sidebar.module.css";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import { logoutUser } from "@/services/staffService";
import { logger } from "@/utils/logger";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { RootState } from "@/store/store";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Stores",
        path: "/dashboard/stores",
        icon: <MdOutlineStorefront />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "State",
        path: "/dashboard/states",
        icon: <MdOutlineMyLocation />,
      },
      {
        title: "District",
        path: "/dashboard/districts",
        icon: <MdShareLocation />,
      },
      {
        title: "Business Category",
        path: "/dashboard/b-category",
        icon: <MdBusiness />,
      },
      {
        title: "License Type",
        path: "/dashboard/l-type",
        icon: <MdKey />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      const responseLogout = await logoutUser();
      logger("Response:", responseLogout);

      if (responseLogout.status === 200) {
        logger("Response logout:", responseLogout.data.message);
        toast.success(responseLogout.data.message);
        dispatch(logout());
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="/noavatar.png"
          alt=""
          width={50}
          height={50}
        />
        <div className={styles.userDetail}>
          <span className={styles.userName}>{user?.name || "Demo"}</span>
          <span className={styles.userTitle}>
            {user?.isAdmin ? "Administrator" : "Guest"}
          </span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((category) => (
          <li key={category.title}>
            <span className={styles.category}>{category.title}</span>
            {category.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.btnLogout} onClick={handleLogout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
