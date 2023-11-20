import { useState, useEffect } from "react";
import axios from "axios";
import { ActionIcon, Box, Button, Divider, Menu, Modal, Skeleton, Text, Title } from "@mantine/core";
import StarRating from "./Stars";
import check from "../assets/check.svg";
import filter from "../assets/filterIcon.svg";
import {
  IconChevronDown,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { LoginForm } from "./header/LoginForm";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

("SubmissionTime:asc|SubmissionTime:desc|Rating:asc|Rating:desc|Helpfulness:asc|Helpfulness:desc|HasPhotos:asc|HasPhotos:desc|HasVideos:asc|HasVideos:desc");
function ReviewsTab({ id }) {
  const [filterType, setFilterType] = useState("SubmissionTime");
  const [sort, setSort] = useState("desc");
  const [reviews, setReviews] = useState([]);
  const [offset, setOffset] = useState(1);
  const [loginModalOpen,setLoginModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchData = async () => {
    const options = {
      params: {
        ProductId: id,
        Limit: "500",
        Offset: offset,
        Sort: `${filterType}:${sort}`,
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "kohls.p.rapidapi.com",
      },
    }
   try{ const response = await axios.get(
        "https://kohls.p.rapidapi.com/reviews/list",
        options
      );
      const filteredReviews = response.data.payload.Results.filter(
        (rev) =>
          typeof rev.ReviewText === "string" &&
          typeof rev.UserNickname === "string" &&
          rev.ReviewText.length < 400
      );
      setReviews((prevReviews) => [...prevReviews, ...filteredReviews]);}
     catch (error) {
      console.error("Error fetching reviews:", error);
      if(error.response.status ===429){
      try{ const response = await axios.get(
        "https://kohls.p.rapidapi.com/reviews/list",
        {...options,headers:{"X-RapidAPI-Key":import.meta.env.VITE_API_KEY_2,"X-RapidAPI-Host": "kohls.p.rapidapi.com",}}
      );
      const filteredReviews = response.data.payload.Results.filter(
        (rev) =>
          typeof rev.ReviewText === "string" &&
          typeof rev.UserNickname === "string" &&
          rev.ReviewText.length < 400
      );
      setReviews((prevReviews) => [...prevReviews, ...filteredReviews]);}
      catch(err){
        const response = await axios.get(
          "https://kohls.p.rapidapi.com/reviews/list",
          {...options,headers:{"X-RapidAPI-Key":import.meta.env.VITE_API_KEY_2,"X-RapidAPI-Host": "kohls.p.rapidapi.com",}}
        );
        const filteredReviews = response.data.payload.Results.filter(
          (rev) =>
            typeof rev.ReviewText === "string" &&
            typeof rev.UserNickname === "string" &&
            rev.ReviewText.length < 400
        );
        setReviews((prevReviews) => [...prevReviews, ...filteredReviews]);
      }}
    }
  };

  const fetchLess = () => {
    if (offset === 1) return;
    setReviews([])
    setOffset(1);
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  const fetchMore = () => {
    setOffset(offset + 24);
  };

  useEffect(() => {
    fetchData();
  }, [offset, filterType, sort]);

  const handleFilterChange = (type) => {
    setFilterType(type);
    setReviews([]);
    setOffset(0);
  };

  return (
    <div >
      <div className="my-7 flex justify-between items-center">
        <Title order={3}>All Reviews</Title>
        <div className="flex items-center">
          <Settings sort={sort} setSort={setSort} setReviews={setReviews} setFilterType={setFilterType} filterType={filterType}/>
          <DropDown
            filterType={filterType}
            setFilterType={handleFilterChange}
          />
          <Button className="bg-black text-white rounded-3xl h-12 w-40" onClick={()=>{!isLoggedIn&&setLoginModalOpen(!loginModalOpen)}}>
            Write a review
          </Button>
          <Modal withCloseButton opened ={loginModalOpen} onClose={()=>setLoginModalOpen(false)} size={600} classNames={{header:'h-0 pt-0',close:'mt-16 mr-2'}} >
        <LoginForm/>
      </Modal> 
        </div>
      </div>
      <div className="flex flex-wrap justify-between mx-auto gap-4">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <Box
              key={rev.ReviewId}
              className="border rounded-2xl w-full  lg:w-[595px] min-h-[200px]  p-6 sm:p-0 sm:px-8 sm:py-7 flex flex-col"
            >
              <StarRating rating={rev.Rating} />
              <div className="flex gap-2">
                <Title
                  py={10}
                  order={3}
                  className="font-Satoshi-bold text-base sm:text-[20px]"
                >
                  {rev.UserNickname}
                </Title>
                <img src={check} alt="" />
              </div>
              <Text className="text-[14px] sm:text-[16px]">
                {rev.ReviewText}
              </Text>
              <Text className="text-[16px] sm:text-[18px] text-gray-600 mt-auto">
                Posted on {formatDate(rev.SubmissionTime)}
              </Text>
            </Box>
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map((skel) => (
            <div
              key={skel}
              className="border rounded-2xl w-full  md:w-[595px] min-h-[200px]  p-6 sm:p-0 sm:px-8 sm:py-7 flex flex-col"
            >
              <Skeleton height={24} width={80} radius="xs" />
              <Skeleton height={24} width={240} radius="xs" />
              
              <Skeleton height={120} width="100%" radius="md" mt={4} mb={10} />
              <Skeleton height={16} width={100} radius="xs" />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center mx-auto gap-5 mt-5">
        <Button
          variant="default"
          onClick={() => fetchMore()}
          w={240}
          h={60}
          radius={"xl"}
          className="text-base font-Satoshi-medium"
        >
          Load More Reviews
        </Button>
        {reviews.length > 6 &&
          <Button
          variant="default"
          hidden={reviews.length == 6}
          onClick={() => fetchLess()}
          w={240}
          h={60}
          className="text-base font-Satoshi-medium"
          radius={"xl"}
        >
          Show Less
        </Button>}
      </div> 
    </div>
  );
}


const DropDown = ({ filterType, setFilterType ,setReviews }) => (
  <Menu shadow="md" width={200}  >
    <Menu.Target>
      <Button
        classNames={{label:'w-full text-left'}}
        className="bg-gray-100 text-gray-800 mx-5 hidden sm:inline h-12 rounded-3xl w-44 relative "
        rightSection={<IconChevronDown className="text-gray-800 absolute right-4" />}
      >
        {filterType.replace(/([a-z])([A-Z])/g, "$1 $2")}
      </Button>
    </Menu.Target>

    <Menu.Dropdown >
      <Menu.Label>Select Filter</Menu.Label>
      <Menu.Item  className={filterType =="SubmissionTime"&&'bg-gray-200'} onClick={() => {setFilterType("SubmissionTime");setReviews([]);}}>
        Submition Time
      </Menu.Item>
      <Menu.Item className={filterType =="Rating"&&'bg-gray-200'} onClick={() => {setFilterType("Rating");setReviews([])}}>Rating</Menu.Item>
      <Menu.Item className={filterType =="Helpfulness"&&'bg-gray-200'} onClick={() => {setFilterType("Helpfulness");setReviews([]);}}>
        Helpfulness
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);

const Settings = ({ sort, setSort ,setReviews , setFilterType,filterType}) => 
{
  const matches = useMediaQuery('(max-width: 639px)');
  return (
  <Menu shadow="md" width={200}>
    <Menu.Target>
      <ActionIcon className={`bg-gray-100 p-3 rounded-full h-auto w-auto ${ matches&&'mr-3'}`}>
        <img src={filter} alt="" />
      </ActionIcon>
    </Menu.Target>

    <Menu.Dropdown>
      {matches&&(
      <>
        <Menu.Label>Select Filter</Menu.Label>
      <Menu.Item className={filterType =="SubmissionTime"&&'bg-gray-200'} onClick={() => {setFilterType("SubmissionTime");setReviews([]);}}>
        Submition Time
      </Menu.Item>
      <Menu.Item className={filterType =="Rating"&&'bg-gray-200'} onClick={() => {setFilterType("Rating");setReviews([])}}>Rating</Menu.Item>
      <Menu.Item className={filterType =="Helpfulness"&&'bg-gray-200'} onClick={() => {setFilterType("Helpfulness");setReviews([]);}}>
        Helpfulness
      </Menu.Item>
      </>
      )}
      <Divider/>
      <Menu.Label>Select Sort Method</Menu.Label>
      <Menu.Item className={sort=='desc'&&'bg-gray-200'} onClick={() => {sort!='desc'&&setReviews([]);setSort("desc")}}>Descending</Menu.Item>
      <Menu.Item className={sort=='asc'&&'bg-gray-200'} onClick={() => {sort!='asc'&&setReviews([]);setSort("asc")}}>Ascending</Menu.Item>
    </Menu.Dropdown>
  </Menu>
)};

export default ReviewsTab;
