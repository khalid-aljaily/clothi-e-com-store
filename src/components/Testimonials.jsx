import { useRef } from "react";
import TesimonialCard from "./TesimonialCard";
import { dummyOpinions } from "../utils/opinions";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Box, Button } from "@mantine/core";

function Testimonials() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="py-16 px-5 md:px-[70px] relative"
      style={{ overflow: "hidden" }}
    >
      <h2 className="text-[32px] md:text-[48px] mb-8 lg:mb-14">
        Our Happy <br className="block sm:hidden" />
        customers
      </h2>
      <div
        className="flex justify-between gap-4 overflow-hidden snap-x snap-mandatory testimonial-container"
        ref={scrollRef}
      >
        {dummyOpinions.map((opinion, index) => {
          return (
            <Box key={index} className="snap-center shrink-0">
              <TesimonialCard opinion={opinion} />
            </Box>
          );
        })}
      </div>
      <div className="flex justify-center absolute top-[120px] sm:top-24 md:top-32 lg:top-36  right-3 md:right-20 ">
        <Button
          onClick={scrollLeft}
          className="mr-6 w-fit p-0"
          variant="subtle"
        >
          <IconArrowLeft size={35} />
        </Button>
        <Button onClick={scrollRight} variant="subtle" className="w-fit p-0">
          <IconArrowRight size={35} />
        </Button>
      </div>
    </div>
  );
}

export default Testimonials;
