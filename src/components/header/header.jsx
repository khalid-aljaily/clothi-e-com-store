import {
  HoverCard,
  Group,
  UnstyledButton,
  Box,
  Burger,
  Drawer,
  rem,
  Title,
  ActionIcon,
  Tabs,
  Indicator,
  Text,
  Modal,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import classes from "./HeaderMegaMenu.module.css";
import { Link, useNavigate } from "react-router-dom";
import ShopComponent from "./ShopComponent";
import axios from "axios";
import { InputWithButton } from "../Search";
import MobileShopComponent from "./MobileShopComponent";
import profile from '../../assets/profile.svg'
import { cartContext } from "../../App";
import { LoginForm } from "./LoginForm";
import cart from '../../assets/cartblack.svg'

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [categories, setCatigories] = useState();
  const { cartItems } = useContext(cartContext);
  const navigate = useNavigate()
  const links = ["Men", "Women", "Kids & Baby"];

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://kohls.p.rapidapi.com/categories/list",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "kohls.p.rapidapi.com",
      },
    };
    const fetchCategories = async () => {
      try {
        const response = await axios.request(options);
        setCatigories(response.data.payload.categories);
      } catch (err) {
        if (err.response?.status === 429) {
          try {
            const newOptions = {
              ...options,
              headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_API_KEY_2,
                "X-RapidAPI-Host": "kohls.p.rapidapi.com",
              },
            };
            const newResponse = await axios.request(newOptions);
            setCatigories(newResponse.data.payload.categories);
          } catch (err) {
            if (err.response?.status === 429) {
              const newOptions = {
                ...options,
                headers: {
                  "X-RapidAPI-Key": import.meta.env.VITE_API_KEY_3,
                  "X-RapidAPI-Host": "kohls.p.rapidapi.com",
                },
              };

              const newResponse = await axios.request(newOptions);
              setCatigories(newResponse.data.payload.categories);
            }
          }
        } else {
          console.error("Failed to fetch categories:", err.message);
        }
      }
    };
    fetchCategories();
  }, []);

  const handleSearchBtn = () => {
    setSearchMode(!searchMode);
  };
  return (
    <Box py={{ base: 10, xs: 24 }} px={{ md: 70 }}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%" align="center" wrap="nowrap">
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            size={"sm"}
          />
          <Title
            className="text-[18px] h-[36px] leading-[36px]  md:text-[36px]"
            ff={"ntegral CF"}
          >
            {" "}
            <Link to="/">Clothi</Link>
          </Title>

          <Group
            h="100%"
            gap={0}
            visibleFrom="sm"
            className="flex-1 justify-around flex-nowrap"
          >
            {links.map((link, index) => (
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal={false}
                withArrow
                key={index}
              >
                <HoverCard.Target>
                  <Text
                    className={`${classes.link} ${
                      link == "Kids & Baby" && "min-w-[100px]"
                    } cursor-default`}
                  >
                    {link}
                  </Text>
                </HoverCard.Target>

                <HoverCard.Dropdown
                  style={{ overflow: "hidden" }}
                  className="p-4 border-none"
                >
                  <ShopComponent
                    catigory={categories?.filter((cat) => cat.name === link)[0]}
                  />
                </HoverCard.Dropdown>
              </HoverCard>
            ))}
          </Group>
          <InputWithButton
            setSearchMode={setSearchMode}
            searchMode={searchMode}
          />

          <Group>
            <ActionIcon
              hiddenFrom="sm"
              onClick={handleSearchBtn}
              className={`${searchMode ? "hidden" : "block"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M20.7959 19.2041L16.3437 14.75C17.6787 13.0104 18.3019 10.8282 18.087 8.64607C17.8722 6.4639 16.8353 4.44516 15.1867 2.99937C13.5382 1.55357 11.4014 0.788988 9.20984 0.860713C7.01829 0.932437 4.93607 1.8351 3.38558 3.38559C1.83509 4.93608 0.932429 7.0183 0.860705 9.20985C0.78898 11.4014 1.55356 13.5382 2.99936 15.1867C4.44515 16.8353 6.46389 17.8722 8.64606 18.087C10.8282 18.3019 13.0104 17.6787 14.75 16.3438L19.2059 20.8006C19.3106 20.9053 19.4348 20.9883 19.5715 21.0449C19.7083 21.1016 19.8548 21.1307 20.0028 21.1307C20.1508 21.1307 20.2973 21.1016 20.4341 21.0449C20.5708 20.9883 20.695 20.9053 20.7997 20.8006C20.9043 20.696 20.9873 20.5717 21.044 20.435C21.1006 20.2983 21.1298 20.1517 21.1298 20.0037C21.1298 19.8558 21.1006 19.7092 21.044 19.5725C20.9873 19.4358 20.9043 19.3115 20.7997 19.2069L20.7959 19.2041ZM3.12499 9.5C3.12499 8.23915 3.49888 7.0066 4.19938 5.95824C4.89987 4.90988 5.89551 4.09278 7.06039 3.61027C8.22527 3.12776 9.50707 3.00151 10.7437 3.2475C11.9803 3.49348 13.1162 4.10064 14.0078 4.9922C14.8994 5.88376 15.5065 7.01967 15.7525 8.2563C15.9985 9.49293 15.8722 10.7747 15.3897 11.9396C14.9072 13.1045 14.0901 14.1001 13.0418 14.8006C11.9934 15.5011 10.7608 15.875 9.49999 15.875C7.80977 15.8733 6.18927 15.2011 4.99411 14.0059C3.79894 12.8107 3.12673 11.1902 3.12499 9.5Z"
                  fill="black"
                />
              </svg>
            </ActionIcon>
            <ActionIcon className="relative" onClick={()=>{navigate("/cart")}}>
              <Indicator
                color="#eee"
                top={-10}
                right={-20}
                label={<Text className="text-[12px]">{cartItems.length}</Text>}
                classNames={{ indicator: "p-[8px]  text-black " }}
              />
              
                {" "}
                <img src={cart} alt="" className="w-11" />
              
            </ActionIcon>
            <UnstyledButton onClick={() => setLoginModalOpen(!loginModalOpen)}>
              <img src={profile} alt="profile image" />
            </UnstyledButton>
          </Group>
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        title={<Link to={"/"}>CLOTHI</Link>}
        classNames={{
          title: "font-ntegral-CF text-lg ",
          header: "p-[20px]",
          body: "border-none",
        }}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Box h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Tabs defaultValue="Men">
            <Tabs.List className="justify-between">
              {links.map((link) => (
                <Tabs.Tab key={link} value={link} className="flex-1">
                  {link}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {links.map((link) => (
              <Tabs.Panel key={link} value={link}>
                <MobileShopComponent
                  catigory={categories?.filter((cat) => cat.name === link)[0]}
                  closeDrawer={closeDrawer}
                />
              </Tabs.Panel>
            ))}
          </Tabs>
        </Box>
      </Drawer>
      <Modal
        withCloseButton
        opened={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        classNames={{ header: "h-0 pt-0", close: "mt-16 mr-2", }}
        yOffset={80}
      >
        <LoginForm />
      </Modal>
    </Box>
  );
}
