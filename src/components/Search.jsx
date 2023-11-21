import { useState } from "react";
import {
  TextInput,
  ActionIcon,
  useMantineTheme,
  CloseButton,
  Modal,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

export function InputWithButton({ searchMode, setSearchMode }) {
  const theme = useMantineTheme();
  const [value, setValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const handleClose = () => {
    setSearchMode(false);
    setValue("");
  };
  return (
    <>
      <TextInput
        visibleFrom="sm"
        placeholder="Search for products..."
        onChange={(event) => setValue(event.target.value)}
        value={value}
        classNames={{
          root: "flex gap-3 item-center justify-start flex-[2] max-w-[600px] ",
          wrapper: "flex-1 ",
          input:
            "py-3 pl-11 border-none bg-gray-100 font-Satoshi-regular h-[48px]",
        }}
        leftSection={
          <ActionIcon
            size={32}
            ml={16}
            variant="subtle"
            onClick={() => {
              value && setValue("");
              navigate(
                location.search
                  ? {
                      pathname: "/shop",
                      search: location.search,
                      hash: value,
                    }
                  : { pathname: "/shop", hash: value }
              );
            }}
          >
            <IconSearch stroke={2} color={theme.colors.dark[0]} />
          </ActionIcon>
        }
        radius={50}
        rightSection={
          <CloseButton
            hidden={value === ""}
            size={20}
            stroke={2}
            className="text-red-600 mr-2   hover:shadow-2xl "
            onClick={handleClose}
          />
        }
      />
      <Modal
        transitionProps={{}}
        opened={searchMode}
        withOverlay={false}
        withCloseButton={false}
        className="h-fit mt-9 "
        classNames={{
          inner: "mt-6 absolute",
          body: "p-1 ",
          content: "shadow-sm ",
        }}
        lockScroll={false}
        yOffset={30}
      >
        <TextInput
          onChange={(event) => setValue(event.target.value)}
          value={value}
          hiddenFrom="sm"
          className={`${searchMode ? "block" : "hidden"} `}
          placeholder="Search for products.."
          classNames={{
            root: " lg:flex-1  ",

            input: "pl-9 font-Satoshi-regular border-none bg-gray-100 text-xs",
          }}
          leftSection={
            <ActionIcon
              size={22}
              ml={5}
              variant="subtle"
              onClick={() => {
                value && setValue("");
                navigate(
                  location.search
                    ? {
                        pathname: "/shop",
                        search: location.search,
                        hash: value,
                      }
                    : { pathname: "/shop", hash: value }
                );
              }}
            >
              <IconSearch stroke={2} color={theme.colors.dark[0]} />
            </ActionIcon>
          }
          radius={"lg"}
          rightSection={
            <CloseButton
              size={20}
              stroke={2}
              className="text-red-600 mr-2   hover:shadow-2xl "
              onClick={handleClose}
            />
          }
        />
      </Modal>
    </>
  );
}
