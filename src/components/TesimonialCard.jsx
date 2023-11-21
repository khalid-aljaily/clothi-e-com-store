import { Box, Text, Title } from "@mantine/core";
import StarRating from "./Stars";

function TesimonialCard({ opinion }) {
  return (
    <Box className="border rounded-2xl max-w-[calc(100vw-40px)]   md:max-w-[400px] h-[200px] md:h-[215px] p-6 sm:p-0 sm:px-8 sm:py-7">
      <StarRating rating={opinion.rating} />
      <Title
        py={10}
        order={3}
        className="font-Satoshi-bold text-base sm:text-[20px]"
      >
        {opinion.name}
      </Title>
      <Text className="text-[14px] sm:text-[16px]">{`"${opinion.opinion}"`}</Text>
    </Box>
  );
}

export default TesimonialCard;
