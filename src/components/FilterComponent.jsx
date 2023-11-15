
import { Accordion, ActionIcon, Anchor, Badge, Button, Group, Pill, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import filterIcon from '../assets/filterGray.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';




function FilterComponent({ filter, setFilter, data, refetchData,initialActiveFilters,filterOpen,setFilterOpen }) {
const [pills, setPills] = useState();
const location = useLocation()
const navigate = useNavigate()
const matches = useMediaQuery('(max-width:767px)')

  const pillsSet = () =>{
    let pillsArr = []
    for (let filt in initialActiveFilters){
      let newObj = {}
      newObj.method = filt ;
      newObj.prop = initialActiveFilters[filt].currentDimensionId
      newObj.propName = initialActiveFilters[filt].name
      pillsArr.push(newObj)
    }
    return pillsArr
  }
useEffect(()=>{setPills([...pillsSet()])},[initialActiveFilters])
  

  
  const handlePillRemove = (method,PropName) => {
    
    setFilter({ ...filter, [method]: null });
    setPills(pills.filter((pill) => pill.propName !== PropName));
  };

  const handleFilterChange = (method, prop, propName) => {
    if (filter[method] === prop) {
      setFilter({ ...filter, [method]: null });
      handlePillRemove(method,propName)
    }
    else if (filter[method]) {
      
      setFilter({ ...filter, [method]: prop });
      setPills([...pills.filter((pill) => pill.method !== method),{method,prop,propName}]);
    }
    
    else {
      setFilter({ ...filter, [method]: prop });
      setPills([...pills, { propName, method, prop }]);
    }
    console.log(filter)
  };
  
  return (
    <div className={!filterOpen?'hidden':'block'+ ' ' +" w-full md:w-[300px] absolute md:relative top-0 z-50 bg-white md:block border rounded-3xl "}>
      <Group wrap="nowrap" className="mx-5  border-b justify-between py-5">
        <Title order={3} className="text-center  md:py-2">
          Filters
        </Title>
        <ActionIcon disabled = {!matches} onClick={()=>{setFilterOpen(!filterOpen)}}>
          <img src={filterIcon} alt="gray filter icon" width={20} />
        </ActionIcon>
      </Group>
      <div className="mx-5">
        <Group gap={5} my={10}>
        {pills?.map((pill) => (
          <Pill
            key={pill.propName}
            withRemoveButton
            onRemove={() => handlePillRemove(pill.method,pill.propName)}
          >
            {pill.propName}
          </Pill>
        ))}
        </Group>
        
        <Accordion>
          {data?.map((methode) => {
            return (
              <Accordion.Item
                value={methode.index.toString()}
                key={methode.index}
                className="overflow-auto max-h-screen custom-scrollbar"
              >
                <Accordion.Control className="md:h-14 ">
                  {methode.label}
                </Accordion.Control>
                <Accordion.Panel>
                  {methode.name === 'Brand'
                    ? methode.dimensionValues
                        .filter((value) => value.productCount > 500)
                        .map((value) => {
                          return (
                            <div
                              key={value.index}
                              className="flex flex-row flex-nowrap justify-between items-center cursor-pointer hover:bg-gray-50"
                              onClick={() =>
                                handleFilterChange(
                                  methode.name,
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
                                hidden={
                                  filter[methode.name] !==
                                  value.currentDimensionId
                                }
                                variant="light"
                                className="bg-gray-200  rounded-full  text-[9px]"
                              >
                                Active
                              </Badge>
                            </div>
                          );
                        })
                    : methode.name === 'Size'
                    ? methode.dimensionValues.slice(0, 23).map((value) => {
                        return (
                          <div
                            key={value.index}
                            className="flex flex-row flex-nowrap justify-between items-center cursor-pointer hover:bg-gray-50"
                            onClick={() =>
                              handleFilterChange(
                                methode.name,
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
                              hidden={
                                filter[methode.name] !==
                                value.currentDimensionId
                              }
                              variant="light"
                              className="bg-gray-200  rounded-full  text-[9px]"
                            >
                              Active
                            </Badge>
                          </div>
                        );
                      })
                    : methode.dimensionValues.map((value) => {
                        return (
                          <div
                            key={value.index}
                            className="flex flex-row flex-nowrap justify-between items-center cursor-pointer hover:bg-gray-50"
                            onClick={() =>
                              handleFilterChange(
                                methode.name,
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
                              hidden={
                                filter[methode.name] !==
                                value.currentDimensionId
                              }
                              variant="light"
                              className="bg-gray-200  rounded-full  text-[9px]"
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
      {/* <Button
        mt={10}
        display={'block'}
        mx={'auto'}
        onClick={() => refetchData()}
        bg={'dark.8'}
      >
        Apply Filters
      </Button> */}
    </div>
  );
}

export default FilterComponent;
