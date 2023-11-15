import { useState } from "react";
import { Accordion } from "@mantine/core";

function FAQSection() {
  const [activeItem, setActiveItem] = useState(null);

  const handleAccordionToggle = (index) => {
    setActiveItem((prevItem) => (prevItem === index ? null : index));
  };

  return (
    <div className="px-5 md:px-[70px] ">
      <h2 className="mt-10 mb-5 !font-Satoshi-bold md:text-3xl text-2xl">Frequently Asked Questions</h2>
      <Accordion className="font-Satoshi-regular">
        <Accordion.Item value="1">
          <Accordion.Control onClick={() => handleAccordionToggle(1)} className="font-Satoshi-bold text-lg h-20">
            How long does shipping take?
          </Accordion.Control>
          <Accordion.Panel expanded={activeItem === 1} className="text-gray-700">
            Shipping times may vary depending on your location and the shipping method chosen. Typically, domestic orders are delivered within 3-7 business days, while international orders may take 7-14 business days. Please note that these are estimated delivery times and delays can occur due to unforeseen circumstances.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="2">
          <Accordion.Control onClick={() => handleAccordionToggle(2)} className="font-Satoshi-bold text-lg h-20">
            Do you offer free shipping?
          </Accordion.Control>
          <Accordion.Panel expanded={activeItem === 2} className="text-gray-700">
            Yes, we offer free shipping on orders above a certain amount. The free shipping threshold may vary depending on your location. During the checkout process, you will be able to see if your order qualifies for free shipping.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="3">
          <Accordion.Control onClick={() => handleAccordionToggle(3)} className="font-Satoshi-bold text-lg h-20">
            Can I modify or cancel my order after it has been placed?
          </Accordion.Control>
          <Accordion.Panel expanded={activeItem === 3} className="text-gray-700">
            Once an order is placed, it enters our processing system to ensure prompt delivery. Unfortunately, we cannot guarantee modifications or cancellations once an order is submitted. If you need to make changes or cancel your order, please contact our customer support team as soon as possible, and we will do our best to assist you.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="4">
          <Accordion.Control onClick={() => handleAccordionToggle(4)} className="font-Satoshi-bold text-lg h-20">
            What payment methods do you accept?
          </Accordion.Control>
          <Accordion.Panel expanded={activeItem === 4} className="text-gray-700">
            We accept various payment methods, including major credit cards (Visa, Mastercard, American Express) and PayPal. During the checkout process, you will be able to select your preferred payment method.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="5">
          <Accordion.Control onClick={() => handleAccordionToggle(5)} className="font-Satoshi-bold text-lg h-20">
            How can I contact your customer support team?
          </Accordion.Control>
          <Accordion.Panel expanded={activeItem === 5}>
            You can reach our customer support team by email at support@example.com or by phone at +1-123-456-7890. Our team is available to assist you during our business hours from Monday to Friday, 9 AM to 5 PM (EST).
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default FAQSection;