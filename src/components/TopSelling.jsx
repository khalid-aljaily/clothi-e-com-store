import NewArrivalsCard from "./NewArrivalsCard";
import { Button } from "@mantine/core";

function TopSelling() {
  return (
    <div className="py-16 px-5 md:px-[70px]">
      <h2 className="text-center text-[32px] md:text-[48px] mb-8 md:mb-14">
        New Arrivals
      </h2>
      <div className="flex justify-between gap-4 overflow-auto snap-x snap-mandatory">
        {[1, 2, 3, 4].map((arrival) => (
          <div key={arrival} className="snap-center">
            <NewArrivalsCard title={arrival.title} image={arrival.image} />
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        classNames={{ inner: "font-Satoshi-medium text-base" }}
        className="border-gray-300 mx-auto block mt-10"
        w={218}
        h={52}
        radius={50}
      >
        View All
      </Button>
    </div>
  );
}

export default TopSelling;
