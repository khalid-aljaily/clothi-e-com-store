import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import {
  IconArrowRight,
  IconMinus,
  IconPlus,
  IconTag,
  IconTrash,
} from "@tabler/icons-react";
import { cartContext } from "../App";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems } = useContext(cartContext);
  const [discount, setDiscount] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  let deliveryFee = 15;
  const promoCodes = [
    { promoCode: "wiz20", amount: 0.2 },
    { promoCode: "wiz10", amount: 0.1 },
  ];
  const validatePromoCode = () => {
    let promoCode = promoCodes.find((promo) => promo.promoCode === input);
    if (promoCode) {
      setDiscount(promoCode.amount);
      setError(null);
    } else {
      setError("Invalid Promo Code try a code like wiz20");
      setTimeout(() => setError(null), 3000);
      clearTimeout(() => setError(null), 3000);
    }
  };
  const calculateSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.count;
    });
    return subtotal.toFixed(2);
  };
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.count;
    });
    if (discount) {
      total = total - total * discount;
    }
    total = total + deliveryFee;
    return total.toFixed(2);
  };

  const [total, setTotal] = useState(calculateTotal());
  const [subtotal, setSubtotal] = useState(calculateSubtotal());
  useEffect(() => {
    setTotal(calculateTotal());
    setSubtotal(calculateSubtotal());
  }, [cartItems, cartContext]);

  return (
    <div className="px-5 md:px-[70px] ">
      <Divider />
      <Title order={2} className="md:text-[40px] md:my-8 my-5">
        Your Cart
      </Title>
      <Flex className="flex-col md:flex-row flex-wrap gap-5 mb-8">
        <div className="border flex-1 sm:min-w-[500px] p-5 space-y-5 rounded-xl relative min-h-[80px]">
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartCard item={item} key={item.id} />)
          ) : (
            <p className="text-center -ml-[20px] w-full  top-1/2 -translate-y-1/2 absolute text-sm sm:text-lg md:text-xl text-gray-500 ">
              your cart is currently empty
            </p>
          )}
        </div>
        <div className="flex-1  sm:min-w-[500px] border p-5 rounded-xl">
          <Title order={3}>Order Summary</Title>
          <Stack>
            <Group className="justify-between">
              <Text className="text-[16px] sm:text-[18px] text-gray-500">
                Subtotal
              </Text>
              <Text className="text-[16px] sm:text-[18px] font-Satoshi-bold">
                ${subtotal}
              </Text>
            </Group>
            {discount && (
              <Group className="justify-between">
                <Text className="text-[16px] sm:text-[18px] text-gray-500">
                  Discount(-{discount * 100 + "%"})
                </Text>
                <Text className="text-[16px] sm:text-[18px] text-red-600 font-Satoshi-bold">
                  -${(subtotal * discount).toFixed(2)}
                </Text>
              </Group>
            )}
            <Group className="justify-between">
              <Text className="text-[16px] sm:text-[18px] text-gray-500">
                Delivery Fee
              </Text>
              <Text className="text-[16px] sm:text-[18px] font-Satoshi-bold">
                $15
              </Text>
            </Group>
            <Divider />
            <Group className="justify-between">
              <Text className="text-[16px] sm:text-[18px]">Total</Text>
              <Text className="text-[16px] sm:text-[18px] font-Satoshi-bold">
                ${total}
              </Text>
            </Group>
            <Group>
              <TextInput
                placeholder="Add promo Code..."
                value={input}
                error={error}
                onChange={(e) => setInput(e.currentTarget.value)}
                classNames={{
                  root: " flex-1  ",
                  input:
                    "pl-12 font-Satoshi-regular border-none bg-gray-100 text-sm md:text-[16px] py-5 md:py-6",
                  error: "ml-7",
                }}
                leftSection={
                  <IconTag stroke={2} color={"gray"} className="ml-3 w-5" />
                }
                radius={"xl"}
              />
              <Button
                className="bg-black text-white w-32 h-[40px] md:h-[48px]  rounded-3xl"
                onClick={validatePromoCode}
              >
                {" "}
                Apply
              </Button>
            </Group>
            <Button className="bg-black text-white  h-[40px] md:h-[48px]  rounded-3xl">
              Go To Checkout
              <IconArrowRight color="white" />
            </Button>
          </Stack>
        </div>
      </Flex>
    </div>
  );
}

const CartCard = ({ item }) => {
  const { cartItems, setCartItems } = useContext(cartContext);
  const navigate = useNavigate();
  const increaseCount = () => {
    setCartItems([
      ...cartItems.map((cartItem) =>
        cartItem.id == item.id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      ),
    ]);
  };
  const decreaseCount = () => {
    setCartItems([
      ...cartItems.map((cartItem) =>
        cartItem.id == item.id
          ? { ...cartItem, count: cartItem.count - 1 }
          : cartItem
      ),
    ]);
  };
  const removeItem = () => {
    setCartItems([...cartItems.filter((cartItem) => cartItem.id != item.id)]);
  };

  return (
    <div className="h-[100px] sm:h-[150px] relative flex flex-nowrap gap-3">
      <img
        src={item.image}
        alt={item.name}
        className=" object-cover rounded-2xl h-full aspect-square "
      />

      <div className="flex flex-col h-full no-wrap">
        <Title
          order={3}
          className=" sm:mb-2 text-[12px]
                sm:text-base mt-1 w-[90%] hover:underline cursor-pointer"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          {item.name}
        </Title>
        <Text className="sm:mb-1 text-[10px] sm:text-[16px]">
          Size:
          <Text className="text-gray-700 inline text-[9px] sm:text-[14px]">
            {" "}
            {item.size}
          </Text>
        </Text>
        <Text className="text-[10px] sm:text-[16px]">
          Color:
          <Text className="text-gray-700 inline text-[9px] sm:text-[14px]">
            {" "}
            {item.color}
          </Text>
        </Text>
        <Text className="mt-auto text-sm xs:text-base  sm:text-2xl !font-Satoshi-bold">
          ${item.price}
        </Text>
      </div>
      <ActionIcon className="absolute top-0 right-0" onClick={removeItem}>
        <IconTrash color="red" className="w-4 sm:w-10" />
      </ActionIcon>
      <Group className="bg-gray-100 px-1 sm:px-3 py-[2px] sm:py-2  rounded-3xl absolute right-0 bottom-0">
        <ActionIcon unstyled onClick={() => item.count != 1 && decreaseCount()}>
          <IconMinus className="active:scale-90 w-3 sm:w-6" />
        </ActionIcon>
        <Text className="w-1 sm:w-3 text-center text-xs sm:text-base ">
          {item.count}
        </Text>
        <ActionIcon unstyled onClick={increaseCount}>
          <IconPlus className="active:scale-90 w-3 sm:w-6" />
        </ActionIcon>
      </Group>
    </div>
  );
};
export default Cart;
