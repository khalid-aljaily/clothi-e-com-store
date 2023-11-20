import formal from "../assets/formal.png";
import casual from "../assets/casual.png";
import gem from "../assets/gem.png";
import dress from "../assets/dress.png";
import { Grid } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

function ShopByStyle() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="mt-16 md:my-16 mx-5 md:mx-[70px] bg-[#F0F0F0] rounded-3xl p-5 md:p-20">
      <h2 className="text-center text-[32px] md:text-[48px] mb-5 md:mb-14">
        SHOP BY DRESS STYLE
      </h2>
      <Grid gutter={20}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <div
            onClick={() =>
              navigate(
                `/shop?CN=Department:Clothing+Occasion:Casual${location.hash}`,
                { state: location.state }
              )
            }
            className="bg-white max-h-52 md:max-h-60 overflow-hidden relative rounded-3xl cursor-pointer"
          >
            <p className="absolute font-bold text-2xl md:text-4xl left-8 top-5 z-10">
              Casual
            </p>
            <img
              src={casual}
              alt=""
              className="h-[500px] md:h-[700px] object-cover object-[-180px_-110px] sm:object-[-250px_-130px] hover:scale-105 duration-300"
            />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <div
            onClick={() =>
              navigate(
                `/shop?CN=Department:Clothing+Occasion:Career${location.hash}`,
                { state: location.state }
              )
            }
            className="max-h-52 md:max-h-60 overflow-hidden rounded-3xl bg-[#fbfafa] relative cursor-pointer"
          >
            <p className="absolute font-bold text-2xl md:text-4xl left-8 top-5 z-10">
              Formal
            </p>
            <img
              src={formal}
              alt=""
              className="h-[500px] md:h-[700px] object-cover object-[-10px_-90px] md:object-[100px_-120px] hover:scale-105 duration-300"
            />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <div
            onClick={() =>
              navigate(
                `/shop?CN=Department:Clothing+Occasion:Dress${location.hash}`,
                { state: location.state }
              )
            }
            className="max-h-52 md:max-h-60 overflow-hidden bg-white rounded-3xl relative cursor-pointer"
          >
            <p className="absolute font-bold text-2xl md:text-4xl left-8 top-5 z-10">
              Dress
            </p>
            <img src={dress} alt="" className="hover:scale-105 duration-300" />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <div
            onClick={() =>
              navigate(
                `/shop?CN=Department:Clothing+Occasion:Active${location.hash}`,
                { state: location.state }
              )
            }
            className="bg-white max-h-52 md:max-h-60 overflow-hidden rounded-3xl relative cursor-pointer"
          >
            <p className="absolute font-bold text-2xl md:text-4xl left-8 top-5 z-10">
              Active
            </p>
            <img
              src={gem}
              alt=""
              className="h-[670px] sm:h-[700px] object-cover object-[0px_-180px] sm:object-[0px_-180px] md:object-[0px_-180px] hover:scale-105 duration-300"
            />
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default ShopByStyle;
