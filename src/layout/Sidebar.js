"use client";

import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { PiGithubLogoLight } from "react-icons/pi";
import { FaGitAlt } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsBoxSeam, BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { VscGithubAction } from "react-icons/vsc";
import { PiNotePencilFill } from "react-icons/pi";
import { FaBoxes } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import Collapse from "@mui/material/Collapse";

const Sidebar = () => {
 
  const [repositoryOpen, setRepositoryOpen] = useState(false); // Estado para controlar la apertura del submenú de Ventas

  const handleRepositoryClick = () => {
    setRepositoryOpen(!repositoryOpen);
  };

  const sidebarItems = [
    {
      text: "Productos",
      link: "/product",
      icon: <FaBoxes className=" text-xl font-bold" />,
    },
    {
      text: "Detalles productos",
      link: "/productDetails",
      icon: <PiNotePencilFill className="m-3 text-xl font-bold" />,
    },
    {
      text: "Inventario",
      icon: <BsBoxSeam className="m-3 text-xl font-bold" />,
      link: "/inventory",
    },
    {
      text: "Clientes",
      link: "/",
      icon: <HiOutlineUserGroup className="m-3 text-xl font-bold" />,
    },
    {
      text: "Empleados",
      link: "/employee",
      icon: <BsFileEarmarkSpreadsheet className="m-3 text-xl font-bold" />,
    },
    {
      text: "categorias",
      link: "/category",
      icon: <BiSolidCategoryAlt className="m-3 text-xl font-bold" />,
    },
    {
      text: "Repositorios",
      onClick: handleRepositoryClick,
      icon: <FaGitAlt className="m-3 text-xl font-bold" />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 z-10 flex  w-28 flex-col items-center bg-white  shadow-md">
      <Typography
        variant="h6"
        sx={{
          mt: "1rem",
          mb: "2rem",
          fontWeight: "bold",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "80%",
        }}
      />
      <List sx={{ width: "100%" }}>
        {sidebarItems.map((item) => (
          <div key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href={item.link}
                onClick={item.onClick}
              >
                {item.icon}
                <ListItemText
                  primary={item.text}
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                />
              </ListItemButton>
            </ListItem>
            {/* Renderizar el submenú si el botón de Inventario se ha hecho clic */}


            {/* Renderizar el submenú de Ventas si el botón de Ventas se ha hecho click */}
            {item.text === "Repositorios" && (
              <Collapse in={repositoryOpen}>
                {/* Agrega tus opciones de submenú de Ventas aquí */}
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component="a" href="https://github.com/Foxy20122012/MF_TEST_API">
                      <VscGithubAction className="m-3 text-xl font-bold" />
                      Bancked
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component="a" href="https://github.com/Foxy20122012/MF_TEST_DEMO">
                      <PiGithubLogoLight className="m-3 text-xl font-bold" />
                      Frontend
                    </ListItemButton>
                  </ListItem>
                  {/* Puedes agregar más opciones de submenú de Ventas según sea necesario */}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;