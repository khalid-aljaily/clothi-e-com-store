import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Group,
  Loader,
  Menu,
  Pagination,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import {
  IconArrowBarToLeft,
  IconArrowBarToRight,
  IconArrowRight,
  IconChevronDown,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import filtericon from "../assets/filterIcon.svg";
import FilterComponent from "../components/FilterComponent";
import axios from "axios";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

function ProductsPage() {
  const [offset, setOffset] = useState(1);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const smallScreen = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();

  const getUrlProperties = (url) => {
    const match = url.match(/CN=([^&]+)/);

    if (match) {
      const cnParam = match[1];
      const cnProperties = {};

      cnParam.split("+").forEach((param) => {
        const [key, value] = param.split(":");
        if (key !== "Department") {
          cnProperties[key] = {
            name: decodeURIComponent(value),
            currentDimensionId: `${key}:${value}`,
          };
        }
      });
      return cnProperties;
    }
    return {};
  };

  const [properties, setProperties] = useState(
    getUrlProperties(location.search)
  );

  const propertiesSetup = (prop) => {
    let filterString = "";
    for (let filt in prop) {
      if (prop[filt]) {
        filterString += "+" + prop[filt].currentDimensionId;
      }
    }
    return filterString;
  };

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const options = {
        method: "GET",
        url: "https://kohls.p.rapidapi.com/products/list",
        params: {
          limit: "9",
          offset,
          dimensionValueID: "Department:Clothing" + propertiesSetup(properties),
          keyword: location.hash,
          sortID: location.state,
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
          "X-RapidAPI-Host": "kohls.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        return response.data;
      } catch (err) {
        if (err.response.status == 429) {
          try {
            const newOptions = {
              ...options,
              headers: {
                "X-RapidAPI-Key": import.meta.env.VITE_API_KEY_2,
                "X-RapidAPI-Host": "kohls.p.rapidapi.com",
              },
            };
            const newResponse = await axios.request(newOptions);
            return newResponse.data;
          } catch (err) {
            if (err.response.status == 429) {
              const newOptions = {
                ...options,
                headers: {
                  "X-RapidAPI-Key": import.meta.env.VITE_API_KEY_3,
                  "X-RapidAPI-Host": "kohls.p.rapidapi.com",
                },
              };
              const newResponse = await axios.request(newOptions);
              return newResponse.data;
            }
          }
        }
      }
    },
    staleTime: "infinity",
    enabled: false,
  });

  useEffect(() => {
    setProperties(() => {
      return { ...getUrlProperties(location.search) };
    });
  }, [location]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClear = () => {
    navigate({ pathname: "/shop", search: location.search });
  };
  useEffect(() => {
    refetch();
  }, [properties, offset]);

  const pageChange = (page) => {
    setOffset(page * 9 - 8);
  };

  return (
    <>
      <div className=" overflow-hidden px-5  md:px-[70px] ">
        <Divider />
        <Group
          justify="space-between"
          align="stretch"
          wrap="nowrap"
          className="relative mt-4 md:mt-6"
        >
          <FilterComponent
            sorts={data?.payload?.sorts}
            filterOpen={isOpen}
            setFilterOpen={setIsOpen}
            initialActiveFilters={properties}
            data={data?.payload?.dimensions?.filter((dim) => {
              return dim.name !== "Department" && dim.name !== "InStoreOnline";
            })}
          />

          <div className=" flex-1">
            <Flex className="justify-between items-end mb-4 md:mb-6 ">
              <Stack gap={0}>
                <Group className="items-center gap-2">
                  <Title
                    order={3}
                    className="font-Satoshi-bold text-2xl lg:text-4xl "
                  >
                    Shop
                  </Title>
                  <Loader
                    size={"12px"}
                    className={`mt-2 ${!isFetching && "hidden"}`}
                    type="bars"
                  />
                </Group>
                {location.hash && (
                  <Text className="text-[10px] sm:text-base inline">
                    Results for: "{location.hash.slice(1)}"
                    <button
                      className="text-red-600 active:translate-y-[1px] ml-2 text-[10px] sm:text-[14px]  inline hover:underline"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                  </Text>
                )}
              </Stack>

              <Group gap={10} wrap="nowrap">
                <Text className="text-gray-700 text-[12px] sm:text-[14px] lg:text-base mt-2 sm:mt-0">
                  Showing {offset + "-" + (+offset + 8)} products of{" "}
                  {data?.count}
                </Text>
                <Group
                  className="gap-0 hidden md:flex mt-2 sm:mt-0"
                  wrap="nowrap"
                >
                  <Text className="text-gray-700 text-[12px] sm:text-[14px] lg:text-base ">
                    Sort By:
                  </Text>
                  <DropDown
                    sorts={data?.payload?.sorts}
                    label={
                      <Button
                        variant="subtle"
                        classNames={{
                          label:
                            "w-full text-left font-Satoshi-bold text-[12px] sm:text-[14px] lg:text-base",
                        }}
                        className=" h-12 rounded-3xl inline relative "
                        rightSection={<IconChevronDown className="w-5 -ml-2" />}
                      >
                        Sort By
                      </Button>
                    }
                  />
                </Group>
                <ActionIcon
                  className={`bg-gray-100   rounded-full w-5 h-5 md:hidden mt-1`}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <img src={filtericon} alt="" className="w-4" />
                </ActionIcon>
              </Group>
            </Flex>

            <div className="relative grid gap-10 grid-cols-2 md:grid-cols-mine  xl:grid-cols-3 flex-1 ">
              {!data ? (
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((prod) => (
                  <div
                    key={prod}
                    className="max-w-[280px] h-[280px] flex flex-col justify-between"
                  >
                    <Skeleton className="h-[75%] w-full " />
                    <Skeleton className="h-[8%] w-[70%] rounded-md" />
                    <Skeleton className="h-[8%] w-[90%] rounded-md" />
                  </div>
                ))
              ) : (
                <>
                  {data?.payload?.products?.length == 0 ? (
                    <Title order={3} className="text-center">
                      There are no products that matchs your criteria
                    </Title>
                  ) : (
                    data?.payload?.products?.map((prod) => (
                      <ProductCard key={prod.webId} prod={prod} />
                    ))
                  )}
                </>
              )}
            </div>

            <Pagination.Root
              total={Math.ceil(data?.count / 10)}
              radius={"5px"}
              classNames={{ control: "text-black" }}
              onChange={(value) => pageChange(value)}
              siblings={smallScreen ? 0 : 2}
            >
              <Group gap={2} my="xl">
                <Pagination.First
                  icon={IconArrowBarToLeft}
                  hidden={smallScreen}
                />
                <Pagination.Previous icon={IconArrowLeft} className="mr-auto" />
                <Pagination.Items />
                <Pagination.Next icon={IconArrowRight} className="ml-auto" />
                <Pagination.Last
                  icon={IconArrowBarToRight}
                  hidden={smallScreen}
                />
              </Group>
            </Pagination.Root>
          </div>
        </Group>
      </div>
    </>
  );
}

export const DropDown = ({ sorts, label }) => {
  const [active, setActive] = useState(1);
  const { search } = useLocation();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>{label}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Select a filter</Menu.Label>
        {sorts?.map((sort) => (
          <Link
            key={sort.ID}
            to={{ pathname: "/shop", search }}
            state={sort.ID}
          >
            <Menu.Item
              className={`hover:bg-gray-100 ${
                active == sort.ID && "bg-gray-100"
              }`}
              onClick={() => setActive(sort.ID)}
            >
              {sort.name}
            </Menu.Item>
          </Link>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProductsPage;
