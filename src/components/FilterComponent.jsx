import {
  Accordion,
  ActionIcon,
  Badge,
  CloseButton,
  Group,
  Pill,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import filterIcon from "../assets/filterGray.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { DropDown } from "../pages/ProductsPage";

function FilterComponent({
  data,
  initialActiveFilters,
  filterOpen,
  setFilterOpen,
  sorts,
}) {
  const [pills, setPills] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width:767px)");

  const pillsSet = () => {
    let pillsArr = [];
    for (let filt in initialActiveFilters) {
      let newObj = {};
      newObj.method = filt;
      newObj.prop = initialActiveFilters[filt].currentDimensionId;
      newObj.propName = initialActiveFilters[filt].name;
      pillsArr.push(newObj);
    }
    return pillsArr;
  };
  useEffect(() => {
    setPills([...pillsSet()]);
  }, [initialActiveFilters]);

  const handlePillRemove = (PropName, prop) => {
    navigate(
      `/shop?CN=Department:Clothing${propertiesSetup(
        getUrlProperties(location.search)
      ).replace("+" + prop, "")}${location.hash}`,
      { state: location.state }
    );
    setPills(pills.filter((pill) => pill.propName !== PropName));
  };

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

  const propertiesSetup = (prop) => {
    let filterString = "";
    for (let filt in prop) {
      if (prop[filt]) {
        filterString += "+" + prop[filt].currentDimensionId;
      }
    }
    return filterString;
  };

  const isActive = (value) => {
    for (let i = 0; i < pills?.length; i++) {
      if (pills[i].prop === value.currentDimensionId) {
        return false;
      }
    }
    return true;
  };

  const handleFilterChange = (method, prop, propName) => {
    if (
      getUrlProperties(location.search)[method]?.currentDimensionId === prop
    ) {
      setPills(pills.filter((pill) => pill.propName !== propName));
      navigate(
        `/shop?CN=Department:Clothing${propertiesSetup(
          getUrlProperties(location.search)
        ).replace("+" + prop, "")}${location.hash}`,
        { state: location.state }
      );
      setPills(pills.filter((pill) => pill.propName !== propName));
    } else if (getUrlProperties(location.search)[method]) {
      navigate(
        `/shop?CN=Department:Clothing${propertiesSetup(
          getUrlProperties(location.search)
        ).replace(
          "+" + getUrlProperties(location.search)[method].currentDimensionId,
          ""
        )}+${prop}${location.hash}`,
        { state: location.state }
      );
      setPills([
        ...pills.filter((pill) => pill.method !== method),
        { method, prop, propName },
      ]);
    } else {
      navigate(
        `/shop?CN=Department:Clothing${propertiesSetup(
          getUrlProperties(location.search)
        )}+${prop}${location.hash}`,
        { state: location.state }
      );
      setPills([...pills, { propName, method, prop }]);
    }
  };

  return (
    <div
      className={
        !filterOpen
          ? "hidden"
          : "block" +
            " " +
            " w-full md:w-[300px] absolute md:relative top-0 z-50 bg-white md:block border rounded-3xl "
      }
    >
      <Group wrap="nowrap" className="mx-5  border-b justify-between py-5">
        <Title order={3} className="text-center  md:py-2">
          Filters
        </Title>
        <Group gap={0}>
          <DropDown
            sorts={sorts}
            label={
              <ActionIcon disabled={!matches}>
                <img src={filterIcon} alt="gray filter icon" width={20} />
              </ActionIcon>
            }
          />
          <CloseButton
            hiddenFrom="sm"
            c={"red"}
            variant="subtle"
            onClick={() => {
              setFilterOpen(!filterOpen);
            }}
          />
        </Group>
      </Group>
      <div className="mx-5">
        <Group gap={5} my={10}>
          {pills?.map((pill) => (
            <Pill
              key={pill.propName}
              withRemoveButton
              onRemove={() => handlePillRemove(pill.propName, pill.prop)}
            >
              {pill.propName}
            </Pill>
          ))}
        </Group>

        <Accordion>
          {data?.map((method) => {
            return (
              <Accordion.Item
                value={method.index.toString()}
                key={method.index}
                className="overflow-auto max-h-screen custom-scrollbar"
              >
                <Accordion.Control className="md:h-14 ">
                  {method.label}
                </Accordion.Control>
                <Accordion.Panel>
                  {method.name === "Brand"
                    ? method.dimensionValues
                        .filter((value) => value.productCount > 500)
                        .map((value) => {
                          return (
                            <div
                              key={value.index}
                              className="flex flex-row flex-nowrap justify-between items-center cursor-pointer hover:bg-gray-50"
                              onClick={() =>
                                handleFilterChange(
                                  method.name,
                                  value.currentDimensionId,
                                  value.name
                                )
                              }
                            >
                              <Text
                                className={`py-1 text-sm text-gray-800 hover:underline `}
                                href="#"
                                underline="hover"
                              >
                                {value.name}
                              </Text>
                              <Badge
                                variant="light"
                                className={`bg-gray-200  rounded-full  text-[9px] ${
                                  isActive(value) ? "hidden" : "inline"
                                }`}
                              >
                                Active
                              </Badge>
                            </div>
                          );
                        })
                    : method.name === "Size"
                    ? method.dimensionValues.slice(0, 23).map((value) => {
                        return (
                          <div
                            key={value.index}
                            className="flex flex-row flex-nowrap justify-between items-center cursor-pointer hover:bg-gray-50"
                            onClick={() =>
                              handleFilterChange(
                                method.name,
                                value.currentDimensionId,
                                value.name
                              )
                            }
                          >
                            <Text
                              className={`py-1 text-sm text-gray-800 hover:underline `}
                              href="#"
                              underline="hover"
                            >
                              {value.name}
                            </Text>
                            <Badge
                              variant="light"
                              className={`bg-gray-200  rounded-full  text-[9px] ${
                                isActive(value) ? "hidden" : "inline"
                              }`}
                            >
                              Active
                            </Badge>
                          </div>
                        );
                      })
                    : method.dimensionValues.map((value) => {
                        return (
                          <div
                            key={value.index}
                            className="flex flex-row flex-nowrap justify-between items-center cursor-pointer hover:bg-gray-50"
                            onClick={() =>
                              handleFilterChange(
                                method.name,
                                value.currentDimensionId,
                                value.name
                              )
                            }
                          >
                            <Text
                              className={`py-1 text-sm text-gray-800 hover:underline `}
                              href="#"
                              underline="hover"
                            >
                              {value.name}
                            </Text>
                            <Badge
                              variant="light"
                              className={`bg-gray-200  rounded-full  text-[9px] ${
                                isActive(value) ? "hidden" : "inline"
                              }`}
                            >
                              Active
                            </Badge>
                          </div>
                        );
                      })}
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

export default FilterComponent;
