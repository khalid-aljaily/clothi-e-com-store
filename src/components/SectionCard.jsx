import { Badge, Card, Group, Image, Text } from "@mantine/core";
import StarRating from "./Stars";
import { useNavigate } from "react-router-dom";
function SectionCard({ product }) {
  const navigate = useNavigate();
  return (
    <Card p={0} radius={0} className="shrink-0 flex flex-col h-full">
      <div className="aspect-square w-[280px] overflow-hidden rounded-2xl">
        <Image src={product.image.url.replaceAll("180", "300")} className=" " />
      </div>
      <Text
        ff={"Satoshi-bold"}
        className="text-[20px] mt-5 hover:underline cursor-pointer"
        onClick={() => navigate(`/product/${product.webID}`)}
      >
        {product.productTitle}
      </Text>
      {product.rating.avgRating && (
        <Group className="mt-auto">
          <StarRating rating={product.rating.avgRating} />
          <Text>
            4.5/<span className="text-gray-500">5</span>{" "}
          </Text>
        </Group>
      )}

      <Group className={!product.rating.avgRating && "mt-auto"}>
        {product.prices[0].salePriceStatus ? (
          <>
            <Text className="text-[16px] lg:text-[24px]">
              ${product.prices[0].salePrice.minPrice}
            </Text>
            <Text className="text-[16px] lg:text-[24px] text-gray-400 line-through">
              ${product.prices[0].regularPrice.minPrice}
            </Text>
            <Badge
              variant="light"
              color={"red"}
              ff={"Satoshi"}
              className="h-5 lg:h-8 w-12 lg:w-16 p-0 text-[12px] md:text-[16px]"
            >
              {(
                (product.prices[0].salePrice.minPrice /
                  product.prices[0].regularPrice.minPrice) *
                  100 -
                100
              ).toFixed(0)}
              %
            </Badge>
          </>
        ) : (
          <Text className="text-[16px] lg:text-[24px]">
            ${product.prices[0].regularPrice.minPrice}
          </Text>
        )}
      </Group>
    </Card>
  );
}

export default SectionCard;
