import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Button,
  Divider,
  Flex,
  Group,
  LoadingOverlay,
  Menu,
  Pagination,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import arrow from "../assets/Frame.svg";
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

const items = [
  { title: "Home", href: "#" },
  { title: "Shop", href: "#" },
  { title: "Men", href: "#" },
  { title: "T-Shirts", href: "#" },
].map((item, index) => (
  <Anchor
    href={item.href}
    key={index}
    className="font-Satoshi-regular text-gray-400"
  >
    {item.title}
  </Anchor>
));

function ProductsPage() {
  const [offset, setOffset] = useState(1);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  
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

  const { data, isLoading, isFetching, refetch } = useQuery({
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
          "X-RapidAPI-Key":
          '5665e12a68msh7b295ffc2b73c57p1998b6jsnb8d6f83c7938',
          "X-RapidAPI-Host": "kohls.p.rapidapi.com",
        },
      };
      // const response = await axios.request(options);
      // return response.data;
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
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    refetch();
  }, [properties,offset]);

  const pageChange = (page) => {
    setOffset(page * 9 - 8);
  };

  return (
    <>
      <div className=" overflow-hidden px-5  md:px-[70px] ">
        <Divider />
        {/* <Breadcrumbs className="my-4 md:my-6" separator={<img src={arrow} />}>
          {items}
        </Breadcrumbs> */}
        <Group
          justify="space-between"
          align="stretch"
          wrap="nowrap"
          className="relative mt-4 md:mt-6"
        >
          <FilterComponent
            filterOpen={isOpen}
            setFilterOpen={setIsOpen}
            initialActiveFilters={properties}
            data={data?.payload?.dimensions?.filter((dim) => {
              return dim.name !== "Department" && dim.name !== "InStoreOnline";
            })}
          />

          {!isLoading ? (
            <div className=" flex-1">
              
              <Flex className="justify-between items-center mb-4 md:mb-6 ">
                <Title
                  order={3}
                  className="font-Satoshi-bold text-2xl lg:text-4xl "
                >
                  Shop
                </Title>
                <Group gap={10} wrap="nowrap">
                  <Text className="text-gray-700 text-[12px] sm:text-[14px] lg:text-base ">
                    Showing {offset + "-" + (+offset + 8)} products of{" "}
                    {data?.count}
                  </Text>
                  <Group className="gap-0 hidden md:flex " wrap="nowrap">
                    <Text className="text-gray-700 text-[12px] sm:text-[14px] lg:text-base ">
                      Sort By:
                    </Text>
                    <DropDown sorts={data?.payload?.sorts} />
                  </Group>
                  <ActionIcon
                    className={`bg-gray-100 p-2  rounded-full w-8 h-8 md:hidden`}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <img src={filtericon} alt="" />
                  </ActionIcon>
                </Group>
              </Flex>

              <div className="relative grid gap-10 grid-cols-2 md:grid-cols-mine  xl:grid-cols-3 flex-1 ">
              <LoadingOverlay visible={isFetching} />
                {data?.payload?.products?.map((prod) => (
                  <ProductCard key={prod.webId} prod={prod} />
                ))}
              </div>

              <Pagination.Root
                total={Math.ceil(data?.count / 10)}
                radius={"5px"}
                classNames={{ control: "text-black" }}
                onChange={(value) => pageChange(value)}
              >
                <Group gap={7} my="xl">
                  <Pagination.First icon={IconArrowBarToLeft} />
                  <Pagination.Previous
                    icon={IconArrowLeft}
                    className="mr-auto"
                  />
                  <Pagination.Items />
                  <Pagination.Next icon={IconArrowRight} className="ml-auto" />
                  <Pagination.Last icon={IconArrowBarToRight} />
                </Group>
              </Pagination.Root>
            </div>
          ) : (
            <>
              <Skeleton height={500} className="flex-1 w-full" />
            </>
          )}
        </Group>
      </div>
    </>
  );
}

const DropDown = ({ sorts }) => {
  const [active,setActive] = useState(1)
  const { search } = useLocation();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          variant="subtle"
          classNames={{
            label:
              "w-full text-left font-Satoshi-bold text-[12px] sm:text-[14px] lg:text-base",
          }}
          className=" h-12 rounded-3xl inline relative "
          rightSection={<IconChevronDown className="w-5 -ml-2" />}
        >
          Sort by
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Select Filter</Menu.Label>
        {sorts?.map((sort) => (
          <Link
            key={sort.ID}
            to={{ pathname: "/shop", search }}
            state={sort.ID}
          >
            <Menu.Item className={`hover:bg-gray-100 ${active==sort.ID&&"bg-gray-100"}`} onClick={()=>setActive(sort.ID)}>{sort.name}</Menu.Item>
          </Link>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProductsPage;
