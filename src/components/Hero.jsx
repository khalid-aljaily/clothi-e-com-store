import { Button, Flex, Group, Stack, Text } from "@mantine/core";
import { brands } from "../utils/brands&media";
import { useNavigate } from "react-router-dom";
import hero from "../assets/ccfd8aa5825862cdb9604a4fb4930464 (1).jpg";
import victor from "../assets/Vector.svg";
function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        bg={"#F2F0F1"}
        className="flex-1 lg:h-[calc(100vh-96px)] 2xl:h-[calc(75vh-96px)] overflow-hidden items-center px-5 md:px-[70px]"
      >
        <Stack className="gap-5">
          <Text
            className="text-4xl lg:text-[64px] lg:leading-[70px] mt-10 "
            component="h2"
          >
            FIND CLOTHES
            <br />
            THAT MATCHES
            <br />
            YOUR STYLE
          </Text>
          <Text ff={"Satoshi-medium"} lh={"22px"} c="dark.3">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </Text>
          <Button
            bg={"dark.9"}
            w={{ md: 210 }}
            h={52}
            radius={"50"}
            ff={"Satoshi-medium"}
            fs={16}
            onClick={() => navigate("/shop")}
          >
            Shop Now
          </Button>
          <Group className="justify-between">
            <Stack gap={0}>
              <Text
                ff={"Satoshi-bold"}
                className="text-[24px] md:text-[33px] lg:text-[40px]"
              >
                200+
              </Text>
              <Text c={"dark.3"} className="text-xs md:text-base">
                International Brands
              </Text>
            </Stack>
            <Stack gap={0}>
              <Text
                ff={"Satoshi-bold"}
                className="text-[24px] md:text-[33px] lg:text-[40px]"
              >
                2,000+
              </Text>
              <Text c={"dark.3"} className="text-xs md:text-base">
                High-Quality Products
              </Text>
            </Stack>
            <Stack className="mx-auto sm:mx-0" gap={0}>
              <Text
                ff={"Satoshi-bold"}
                className="text-[24px] md:text-[33px] lg:text-[40px] "
              >
                30,000+
              </Text>
              <Text c={"dark.3"} className="text-xs md:text-base">
                Happy Customers
              </Text>
            </Stack>
          </Group>
        </Stack>
        <div className="relative  self-end ">
          <img
            src={victor}
            alt="victor"
            className="absolute top-11 w-20 right-4 z-10"
          />
          <div className="max-w-[700px]  -mb-40 h-full overflow-hidden">
            <img loading="eager" src={hero} alt="hero image" />
          </div>

          <img
            src={victor}
            alt="victor"
            className="absolute top-36 md:top-56 left-4 w-11 z-10"
          />
        </div>
      </Flex>

      <Group
        className="justify-between flex-wrap min-h-[122px] items-center px-5 md:px-[70px] py-3 gap-[30px]"
        bg={"black"}
      >
        {brands.map((brand) => brand)}
      </Group>
    </>
  );
}

export default Hero;
