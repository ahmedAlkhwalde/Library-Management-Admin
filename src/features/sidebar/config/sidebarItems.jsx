import {
  DashboardOutlined,
  MenuBookOutlined,
  FolderOutlined,
  PeopleOutline,
  LibraryBooksOutlined,
  LogoutOutlined,
  PersonOutline
} from "@mui/icons-material";

export const sidebarItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    to: "/app/dashboard",
  },
  {
    key: "books",
    label: "Books",
    icon: <MenuBookOutlined />,
    to: "/app/books",
  },
   {
     key: "categories",
     label: "Categories",
     icon: <FolderOutlined />,
     to: "/app/categories",
   },
  {
    key: "users",
    label: "Users",
    icon: <PeopleOutline />,
    to: "/app/users",
  },
  {
    key: "borrow-requests",
    label: "Borrow Requests",
    icon: <LibraryBooksOutlined />,
    to: "/app/borrow-requests",
  },
  {
  key: "profile",
  label: "Profile",
  icon: <PersonOutline />,
  to: "/app/profile",
},
  {
    key: "logout",
    label: "Logout",
    icon: <LogoutOutlined />,
    action: "logout",
  },
];
