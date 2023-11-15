import React, { useEffect, useState } from "react";
import { Accordion, Skeleton } from "@mantine/core";
import axios from "axios";

function Quas({ id }) {
  const [activeItem, setActiveItem] = useState(null);
  const [faq, setFaq] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const options = {
    method: "GET",
    url: "https://kohls.p.rapidapi.com/qnas/list",
    params: {
      ProductId: id,
      Limit: "500",
      Offset: "0",
      Sort: "SubmissionTime:desc",
    },
    headers: {
      "X-RapidAPI-Key": "71b967bd13mshbc4acad8ad7d6dbp1ece9fjsnc65d97d6dea7",
      "X-RapidAPI-Host": "kohls.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await axios.request(options);
        setFaq(response.data.payload);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFaq();
  }, []);

  const handleAccordionToggle = (index) => {
    setActiveItem((prevItem) => (prevItem === index ? null : index));
  };

  return (
    <div>
      <h2 className="mt-10 mb-5 !font-Satoshi-bold md:text-3xl text-2xl">
        Questions And Answers
      </h2>
      {isLoading ? (
        <SkeletonWrapper />
      ) : (
        <Accordion className="font-Satoshi-regular">
          {faq?.Results &&
            faq.Results.map((result, index) => {
              if (result.AnswerIds[0])
                return (
                  <Accordion.Item key={index} value={index.toString()}>
                    <Accordion.Control
                      onClick={() => handleAccordionToggle(index.toString())}
                      className="font-Satoshi-bold text-lg h-20"
                    >
                      {result.QuestionSummary}
                    </Accordion.Control>
                    <Accordion.Panel
                      expanded={activeItem === index.toString()}
                      className="text-gray-700"
                    >
                      {faq?.Includes &&
                        faq.Includes.Answers[parseInt(result.AnswerIds[0])]
                          .AnswerText}
                    </Accordion.Panel>
                  </Accordion.Item>
                );
            })}
        </Accordion>
      )}
    </div>
  );
}

export default Quas;

const SkeletonWrapper = () => {
  return (
    <>
      <Skeleton height={60} style={{ marginBottom: "16px" }} />
      <Accordion>
        <Accordion.Item value="1">
          <Accordion.Control>
            <Skeleton height={40} style={{ marginBottom: "8px" }} />
          </Accordion.Control>
          <Accordion.Panel>
            <Skeleton height={120} style={{ marginBottom: "16px" }} />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="2">
          <Accordion.Control>
            <Skeleton height={40} style={{ marginBottom: "8px" }} />
          </Accordion.Control>
          <Accordion.Panel>
            <Skeleton height={120} style={{ marginBottom: "16px" }} />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="3">
          <Accordion.Control>
            <Skeleton height={40} style={{ marginBottom: "8px" }} />
          </Accordion.Control>
          <Accordion.Panel>
            <Skeleton height={120} style={{ marginBottom: "16px" }} />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="4">
          <Accordion.Control>
            <Skeleton height={40} style={{ marginBottom: "8px" }} />
          </Accordion.Control>
          <Accordion.Panel>
            <Skeleton height={120} style={{ marginBottom: "16px" }} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
