import {
  Button,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import visa from "../assets/Badge.svg";
import mastercard from "../assets/Badge (1).svg";
import payPal from "../assets/Badge (2).svg";
import ApplePay from "../assets/Badge (3).svg";
import googlePay from "../assets/Badge (4).svg";
import { useState } from "react";

function Footer() {
  const [email, setEmial] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const vaidateEmail = () => {
    if (email.length === 0) {
      setError("Email is required");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email is invalid");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setEmial("");
        setError(null);
      }, 2000);
    }
  };

  return (
    <div>
      <Flex className=" md:py-9 py-7 px-6 mx-5 md:mx-[70px] md:px-[64px] justify-center lg:justify-between bg-black items-center  flex-wrap rounded-3xl -mb-[40%] xs:-mb-[25%] sm:-mb-[20%] lg:-mb-[7%] z-10 relative">
        <h2 className="text-left sm:text-center lg:text-left text-[32px] lg:text-[40px] mb-8 lg:mb-0 lg:max-w-[50%] text-white">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <Stack className=" lg:min-w-[350px] gap-[14px] min-w-full">
          <TextInput
            error={error}
            value={email}
            onChange={(e) => setEmial(e.target.value)}
            leftSection={<IconMail className="text-gray-500" />}
            type="email"
            placeholder="Enter your email address"
            ff={"Satoshi-medium"}
            classNames={{
              wrapper: "h-full",
              input:
                "h-full py-3 px-4 rounded-3xl pl-12 font-Satoshi-medium text-[14px] md:text-[16px] border-none",
              section: "left-2",
              error: "text-center",
            }}
          />
          <Button
            onClick={vaidateEmail}
            loading={loading}
            h={"fit-content"}
            className="bg-white text-black font-Satoshi-medium rounded-3xl "
            loaderProps={{ size: "sm", color: "dark" }}
            classNames={{ inner: "py-3 px-4 text-[14px] md:text-[16px]" }}
          >
            Subscribe to Newsletter
          </Button>
        </Stack>
      </Flex>
      <div className="p-5 pt-[150px] xs:pt:[50px] sm:pt-[40px] pb-[70px] md:p-[70px] bg-gray-200 z-0 relative">
        <Grid
          columns={14}
          className="mt-10 justify-between sm:mt-[155px] lg:mt-14"
        >
          <GridCol span={{ base: 14, md: 5 }}>
            <Title
              order={2}
              className="text-[29px] md:text-[34px]  mb-4 md:mb-[25px]"
            >
              clothi
            </Title>
            <Text className="text-gray-800">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </Text>
            <Group gap={10} className="my-2 lg:my-[35px] ">
              <button className="rounded-full bg-white p-[7px] border-2 border-gray-400 active:translate-y-[1px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button className="rounded-full bg-white p-[7px] border-2 border-gray-400 active:translate-y-[1px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </button>
              <button className="rounded-full bg-white p-[7px] border-2 border-gray-400 active:translate-y-[1px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </button>
            </Group>
          </GridCol>
          <GridCol
            span={{ base: 7, md: 3 }}
            className="flex flex-col mb-2 lg:mb-0"
          >
            <Title
              order={3}
              className="tracking-[4px] md:tracking-[12px] font-Satoshi-medium text-base sm:text-lg"
            >
              COMPANY
            </Title>
            <ul className="m-2 lg:mt-[35px] flex-1 flex flex-col">
              <li className=" text-gray-800 font-Satoshi-regular sm:text-lg text-[14px]  flex-1 hover:underline">
                <Link to={"#"}>About</Link>
              </li>
              <li className=" text-gray-800 font-Satoshi-regular sm:text-lg text-[14px]  flex-1 hover:underline">
                <Link to={"#"}>Features</Link>
              </li>
              <li className=" text-gray-800 font-Satoshi-regular sm:text-lg text-[14px]  flex-1 hover:underline">
                <Link to={"#"}>Works</Link>
              </li>
              <li className=" text-gray-800 font-Satoshi-regular sm:text-lg text-[14px]  flex-1 hover:underline">
                <Link to={"#"}>Career</Link>
              </li>
            </ul>
          </GridCol>
          <GridCol
            span={{ base: 7, md: 3 }}
            className="flex flex-col mb-2 lg:mb-0"
          >
            <Title
              order={3}
              className="tracking-[4px] md:tracking-[12px]font-Satoshi-medium text-base sm:text-lg"
            >
              HELP
            </Title>
            <ul className="mt-2 lg:mt-[35px] flex-1 flex flex-col">
              <li className=" text-gray-800 font-Satoshi-regular sm:text-lg text-[14px]  flex-1 hover:underline">
                <Link to={"#"}>Customer Support</Link>
              </li>
              <li className=" text-gray-800 font-Satoshi-regular sm:text-lg text-[14px]  flex-1 hover:underline">
                <Link to={"#"}>Delivery Details</Link>
              </li>
              <li className=" text-gray-800 font-Satoshi-regular sm:text-lg text-[14px]  flex-1 hover:underline">
                <Link to={"#"}>Terms & Conditions</Link>
              </li>
              <li className=" text-gray-800 font-Satoshi-regular sm:text-lg text-[14px]  flex-1 hover:underline">
                <Link to={"#"}>Privacy Policy</Link>
              </li>
            </ul>
          </GridCol>
          <GridCol
            span={{ base: 7, md: 3 }}
            className="flex flex-col  mb-2 lg:mb-0"
          >
            <Title
              order={3}
              className="tracking-[4px] md:tracking-[12px] font-Satoshi-medium text-base sm:text-lg"
            >
              FAQ
            </Title>
            <ul className="mt-2 lg:mt-[35px] flex-1 flex flex-col ">
              <li className=" text-gray-800 font-Satoshi-regular sm:text-lg text-[14px]  flex-1 hover:underline">
                <Link to={"#"}>Account</Link>
              </li>
              <li className=" text-gray-800 font-Satoshi-regular sm:text-lg text-[14px]  flex-1 hover:underline">
                <Link to={"#"}>Manage Deliveries</Link>
              </li>
              <li className=" text-gray-800 font-Satoshi-regular sm:text-lg text-[14px]  flex-1 hover:underline">
                <Link to={"#"}>Orders</Link>
              </li>
              <li className=" text-gray-800 font-Satoshi-regular sm:text-lg text-[14px]  flex-1 hover:underline">
                <Link to={"#"}>Payments</Link>
              </li>
            </ul>
          </GridCol>
        </Grid>
        <Divider p={5} />
        <div className="flex justify-center sm:justify-between  items-center  flex-col sm:flex-row gap-2">
          <Text className="text-gray-800 text-[14px] sm:text-base">
            clothi © 2000-2023, All Rights Reserved
          </Text>
          <Group gap={0}>
            <img src={visa} alt="visa" className="w-14 lg:w-20" />
            <img src={mastercard} alt="master" className="w-14 lg:w-20" />
            <img src={payPal} alt="paypal" className="w-14 lg:w-20" />
            <img src={ApplePay} alt="apple pay" className="w-14 lg:w-20" />
            <img src={googlePay} alt="google pay" className="w-14 lg:w-20" />
          </Group>
        </div>
      </div>
    </div>
  );
}

export default Footer;
